// useFusionInfiniteMode.js
import axios from 'axios';
import useCreateFusion from "@/composables/fusion/useCreateFusion.js";

export default function useFusionNormalMode(shapes, addShape, emit) {
    const handleFusion = async (shape1, shape2) => {
        /**
         * C'est ici qu'on va tester si 2 items sont fusionnables ou pas. si oui, on va les fusionner et créer un nouvel item.
         * On enverra cet item dans l'inventaire pour qu'il soit affiché.
         * (On peut aussi faire une animation de fusion si on veut)
         */

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

            console.log('Fusion result:', fusionResult);

        } catch (error) {
            return;
        }


        const {createFusion} = useCreateFusion(shapes, shape1, shape2, addShape, fusionResult, emit);

        createFusion(shapes, shape1, shape2, addShape, fusionResult, emit);
    };

    return {
        handleFusion,
    };
}