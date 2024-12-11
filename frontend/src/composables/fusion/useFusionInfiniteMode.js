import axios from 'axios';
import useCreateFusion from "@/composables/fusion/useCreateFusion.js";

/**
 * Handle the fusion between two shapes for the infinite mode
 * @param shapes
 * @param addShape
 * @param emit
 * @returns {{handleFusion: ((function(*, *): Promise<void>)|*)}}
 */
export default function useFusionInfiniteMode(shapes, addShape, emit) {
    const handleFusion = async (shape1, shape2) => {

        let fusionResult = {
            icon: './favicon.svg',
            name: 'WIP',
        };

        try {
            const response = await axios.get('api/infinity/generate', {
                params: {
                    item1: shape1.name,
                    item2: shape2.name,
                },
            });

            fusionResult.name = response.data.name;
            fusionResult.icon = response.data.icon;
        } catch (error) {
            window.alert('Erreur lors de la génération de la fusion');
            return;
        }

        if(fusionResult.name === 'Error') {
            window.alert('Erreur lors de la génération de la fusion');
            return;
        }


        const {createFusion} = useCreateFusion(shapes, shape1, shape2, addShape, fusionResult, emit);

        createFusion(shapes, shape1, shape2, addShape, fusionResult, emit);
    };

    return {
        handleFusion,
    };
}