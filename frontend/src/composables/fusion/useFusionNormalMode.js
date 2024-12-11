// useFusionInfiniteMode.js
import axios from 'axios';
import useCreateFusion from "@/composables/fusion/useCreateFusion.js";

/**
 * Handle the fusion between two shapes for the normal mode
 * @param shapes
 * @param addShape
 * @param emit
 * @returns {{handleFusion: ((function(*, *): Promise<void>)|*)}}
 */
export default function useFusionNormalMode(shapes, addShape, emit) {
    const handleFusion = async (shape1, shape2) => {
        shape1.ongoingFusions++;
        shape2.ongoingFusions++;

        let fusionResult = {
            icon: './favicon.svg',
            name: 'WIP',
        };

        //TODO: Call the API to check if the two items are mergeable
        try {
            const response = await axios.get('api/normal/getFusion', {
                params: {
                    item1: shape1.id,
                    item2: shape2.id,
                },
            });

            //if 400 error, return
            if(response.status === 400) {
                console.error('Error while fusing:', response.data.message);
                return;
            }

            fusionResult.id = response.data.id;
            fusionResult.name = response.data.name;
            fusionResult.icon = response.data.icon;


        } catch (error) {
            shape1.ongoingFusions--;
            shape2.ongoingFusions--;
            return;
        }


        const {createFusion} = useCreateFusion(shapes, shape1, shape2, addShape, fusionResult, emit);

        createFusion(shapes, shape1, shape2, addShape, fusionResult, emit);
    };

    return {
        handleFusion,
    };
}