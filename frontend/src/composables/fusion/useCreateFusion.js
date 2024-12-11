export default function useCreateFusion(shapes, shape1, shape2, addShape, fusionResult, emit) {

    /**
     * Create a fusion between two shapes
     * @param shapes
     * @param shape1
     * @param shape2
     * @param addShape
     * @param fusionResult
     * @param emit
     */
    const createFusion = (shapes, shape1, shape2, addShape, fusionResult, emit) => {
        let idx1 = shapes.indexOf(shape1);
        let idx2 = shapes.indexOf(shape2);

        if (idx1 === -1 || idx2 === -1) {
            console.error("Seems like shapes were already removed from the canvas");
            return;
        }

        if (idx1 < idx2) {
            shapes.splice(idx2, 1);
            shapes.splice(idx1, 1);
        } else {
            shapes.splice(idx1, 1);
            shapes.splice(idx2, 1);
        }

        // Calculer la position du nouvel élément
        const x = (shape1.x + shape2.x) / 2 + 50;
        const y = (shape1.y + shape2.y) / 2 + 50;

        addShape(x, y, fusionResult.icon, fusionResult.name, false, fusionResult.id);

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