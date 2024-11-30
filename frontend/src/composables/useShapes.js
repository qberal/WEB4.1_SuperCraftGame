// useShapes.js
import { reactive } from 'vue';

export default function useShapes(containerRef) {
    const shapes = reactive([]);

    // Vérifie si deux formes se chevauchent
    const isOverlapping = (shape1, shape2, margin = 25) => {
        return !(
            shape1.x + shape1.width - margin <= shape2.x + margin ||
            shape1.x + margin >= shape2.x + shape2.width - margin ||
            shape1.y + shape1.height - margin <= shape2.y + margin ||
            shape1.y + margin >= shape2.y + shape2.height - margin
        );
    };

    // Vérifie si une forme donnée est superposée avec une autre
    const isSuperposed = (shape) => {
        for (const otherShape of shapes) {
            if (shape !== otherShape && isOverlapping(shape, otherShape)) {
                return otherShape;
            }
        }
        return null;
    };

    const saveCanvas = () => {
        let canvasSize = {
            width: containerRef.value.clientWidth,
            height: containerRef.value.clientHeight,
        };
        console.log(JSON.stringify({ canvasSize, shapes }));
    };

    const loadCanvas = (canvasData) => {
        shapes.splice(0);

        if (
            canvasData.canvasSize.width !== containerRef.value.clientWidth ||
            canvasData.canvasSize.height !== containerRef.value.clientHeight
        ) {
            const ratioX = containerRef.value.clientWidth / canvasData.canvasSize.width;
            const ratioY = containerRef.value.clientHeight / canvasData.canvasSize.height;
            for (const shape of canvasData.shapes) {
                shape.x *= ratioX;
                shape.y *= ratioY;
                shapes.push(shape);
            }
        } else {
            for (const shape of canvasData.shapes) {
                shapes.push(shape);
            }
        }
    };

    const addShape = (x, y, icon = null, name = null) => {
        const size = 75; // Taille par défaut
        const newShape = reactive({
            id: shapes.length + 1,
            x: x - size / 2, // Centre la forme
            y: y - size / 2,
            width: size,
            height: size,
            icon: icon,
            isDragging: false,
            name: name,
        });
        shapes.push(newShape);
        return newShape;
    };

    return {
        shapes,
        saveCanvas,
        loadCanvas,
        addShape,
        isOverlapping,
        isSuperposed,
    };
}