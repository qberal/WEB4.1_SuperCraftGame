export default function useCreateFusion(shapes, shape1, shape2, addShape, fusionResult, emit) {

    const createFusion = (shapes, shape1, shape2, addShape, fusionResult, emit) => {
        shapes.splice(shapes.indexOf(shape1), 1);
        shapes.splice(shapes.indexOf(shape2), 1);

        // Calculer la position du nouvel élément
        const x = (shape1.x + shape2.x) / 2 + 25;
        const y = Math.min(shape1.y, shape2.y) + 25;

        // Ajouter la nouvelle forme résultant de la fusion
        addShape(x, y, fusionResult.icon, fusionResult.name, false, fusionResult.id);

        // Émettre l'événement de fusion complétée
        emit('fusion-completed', {
            id: fusionResult.id || null,
            icon: fusionResult.icon || './favicon.svg',
            name: fusionResult.name || 'Error',
        });
    }

    return {
        createFusion,
    };
}