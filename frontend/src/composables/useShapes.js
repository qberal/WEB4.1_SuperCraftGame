// useShapes.js
import {reactive} from 'vue';
import axios from "axios";

/**
 * Handle the shapes on the canvas
 * @param containerRef
 * @param gameMode
 * @returns {{bringToFront: bringToFront, shapes: Reactive<*[]>, loadCanvas: ((function(): Promise<void>)|*), addShape: (function(*, *, null=, null=, boolean=, null=): UnwrapNestedRefs<{x: number, width: number, icon: null, name: null, y: number, id: number, isDragging: boolean, height: number}> & {}), isOverlapping: (function(*, *, number=): boolean), isSuperposed: ((function(*): (*|null))|*), saveCanvas: ((function(): Promise<void>)|*)}}
 */
export default function useShapes(containerRef, gameMode) {
    const shapes = reactive([]);

    const isOverlapping = (shape1, shape2, margin = 25) => {
        return !(
            shape1.x + shape1.width - margin <= shape2.x + margin ||
            shape1.x + margin >= shape2.x + shape2.width - margin ||
            shape1.y + shape1.height - margin <= shape2.y + margin ||
            shape1.y + margin >= shape2.y + shape2.height - margin
        );
    };

    const isSuperposed = (shape) => {
        for (const otherShape of shapes) {
            if (shape !== otherShape && isOverlapping(shape, otherShape)) {
                return otherShape;
            }
        }
        return null;
    };

    const saveCanvas = async () => {

        if (gameMode === 'guest') return;

        const username = await axios.get('/api/getSession').then((response) => {
            return response.data.authenticated.username;
        });

        const canvasSize = {
            width: containerRef.value.clientWidth,
            height: containerRef.value.clientHeight,
        };

        //save in local storage
        const canvasData = {
            canvasSize,
            shapes: shapes.map((shape) => ({
                    id: shape.id,
                    x: shape.x,
                    y: shape.y,
                    icon: shape.icon,
                    name: shape.name,
            })),
        };

        if (gameMode === 'infinity') {
            canvasData.expiration = new Date().setHours(24, 0, 0, 0);// Expire à minuit
        }

        const storageKey = `${username}_${gameMode}`;
        localStorage.setItem(storageKey, JSON.stringify(canvasData));
    };

    const loadCanvas = async () => {
        console.log('canvas loaded: ', gameMode);

        const username = await axios.get('/api/getSession').then((response) => {
            return response.data.authenticated.username;
        });

        const storageKey = `${username}_${gameMode}`;
        const canvasData = JSON.parse(localStorage.getItem(storageKey));

        if (!canvasData) return;

        if (gameMode === 'infinity') {
            const now = Date.now();
            if (canvasData.expiration && now > canvasData.expiration) {
                console.log('Les données du localStorage ont expiré pour le mode infini.');
                localStorage.removeItem(storageKey);
                return;
            }
        }

        let userInventory = await axios.get(`/api/${gameMode}/getInventory`).then((response) => {
            return response.data;
        });

        if(gameMode === 'infinity') {
            canvasData.shapes = canvasData.shapes.filter(shape => userInventory.find(item => item.name === shape.name));
        } else if(gameMode === 'normal') {
            canvasData.shapes = canvasData.shapes.filter(shape => userInventory.find(item => item.id === shape.id));
        }


        shapes.splice(0);

        for (const shape of canvasData.shapes) {
            addShape(shape.x + 37.5, shape.y + 37.5, shape.icon, shape.name, true, shape.id);
        }
    };

    const addShape = (x, y, icon = null, name = null, load = false, id = null) => {
        const size = 100; // Taille par défaut
        const newShape = reactive({
            id: id || shapes.length + 1,
            x: x - size / 2, // Centre la forme
            y: y - size / 2,
            width: size,
            height: size,
            icon: icon,
            isDragging: false,
            name: name,
            ongoingFusions: 0,
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