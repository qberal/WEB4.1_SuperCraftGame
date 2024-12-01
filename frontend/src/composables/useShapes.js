// useShapes.js
import {reactive} from 'vue';

export default function useShapes(containerRef, gameMode) {
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

        if(gameMode === 'guest') return;

        let canvasSize = {
            width: containerRef.value.clientWidth,
            height: containerRef.value.clientHeight,
        };

        //save in local storage
        const canvasData = {
            canvasSize,
            shapes: shapes.map((shape) => {
                return {
                    id: shape.id,
                    x: shape.x,
                    y: shape.y,
                    icon: shape.icon,
                    name: shape.name,
                };
            }),
        };

        //save in local storage

        console.log('canvas saved: ', canvasData);

        localStorage.setItem(gameMode, JSON.stringify(canvasData));
    };

    const loadCanvas = () => {
        console.log('canvas loaded: ', gameMode);

        let canvasData = JSON.parse(localStorage.getItem(gameMode));
        if (!canvasData) return;

        //TODO: Remove all shapes that are not in the user's inventory to prevent cheating, and avoid errors




        shapes.splice(0);

        for (const shape of canvasData.shapes) {
            addShape(shape.x+37.5, shape.y+37.5, shape.icon, shape.name, true, shape.id);
        }
    };

    const addShape = (x, y, icon = null, name = null, load = false, id = null) => {
        const size = 75; // Taille par défaut
        const newShape = reactive({
            id: id || shapes.length + 1,
            x: x - size / 2, // Centre la forme
            y: y - size / 2,
            width: size,
            height: size,
            icon: icon,
            isDragging: false,
            name: name,
        });
        shapes.push(newShape);
        if(!load) saveCanvas();
        return newShape;
    };

    const bringToFront = (shape) => {
        // Retire la forme du tableau
        const index = shapes.indexOf(shape);
        if (index !== -1) {
            shapes.splice(index, 1);
            // Ajoute la forme à la fin du tableau
            shapes.push(shape);
        }
    };

    return {
        shapes,
        saveCanvas,
        loadCanvas,
        addShape,
        isOverlapping,
        isSuperposed,
        bringToFront,
    };
}