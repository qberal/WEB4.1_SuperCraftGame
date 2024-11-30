// useFusionInfiniteMode.js
import axios from 'axios';

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

        //TODO: Call the API to check if the two items are mergeable

        //TODO: Créer une méthode pour supprimer les formes fusionnées et ajouter la nouvelle forme résultant de la fusion
        // Supprimer les formes fusionnées
        shapes.splice(shapes.indexOf(shape1), 1);
        shapes.splice(shapes.indexOf(shape2), 1);

        // Calculer la position du nouvel élément
        const x = (shape1.x + shape2.x) / 2 + 25;
        const y = Math.min(shape1.y, shape2.y) + 25;

        // Ajouter la nouvelle forme résultant de la fusion
        addShape(x, y, fusionResult.icon, fusionResult.name);

        // Émettre l'événement de fusion complétée
        emit('fusion-completed', {
            icon: fusionResult.icon || './favicon.svg',
            name: fusionResult.name || 'Error',
        });
    };

    return {
        handleFusion,
    };
}