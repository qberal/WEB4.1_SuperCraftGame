// useFusionInfiniteMode.js
import axios from 'axios';
import useCreateFusion from "@/composables/fusion/useCreateFusion.js";

export default function useFusionInfiniteMode(shapes, addShape, emit) {
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