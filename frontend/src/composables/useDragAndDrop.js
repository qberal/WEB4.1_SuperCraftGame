// useDragAndDrop.js
import { ref } from 'vue';

export default function useDragAndDrop(shapes, containerRef, addShape, isSuperposed, handleFusion, bringToFront) {
    const isDragOver = ref(false);
    const isDraggingInternal = ref(false);
    let currentDraggingShape = null;

    const handleDrop = (event) => {
        event.preventDefault();
        isDragOver.value = false;

        const rect = containerRef.value.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const data = event.dataTransfer.getData('application/json');
        const item = JSON.parse(data);

        if (item?.icon) {
            const newShape = addShape(x, y, item.icon, item.name);
            let other = isSuperposed(newShape);
            if (other !== null) {
                handleFusion(newShape, other);
            }
        }

        shapes.forEach((shape) => (shape.pointerEvents = 'auto'));
    };

    const handleDragOver = (event) => {
        if (!isDraggingInternal.value) {
            event.preventDefault();
        }
        shapes.forEach((shape) => (shape.pointerEvents = 'none'));
    };

    const handleDragEnter = () => {
        isDragOver.value = true;
    };

    const handleDragLeave = () => {
        isDragOver.value = false;
        shapes.forEach((shape) => (shape.pointerEvents = 'auto'));
    };

    const onMouseMove = (event) => {
        if (!currentDraggingShape) return;

        const rect = containerRef.value.getBoundingClientRect();
        currentDraggingShape.x = event.clientX - rect.left - currentDraggingShape.offsetX;
        currentDraggingShape.y = event.clientY - rect.top - currentDraggingShape.offsetY;
    };

    const onMouseUp = () => {
        if (currentDraggingShape) {
            currentDraggingShape.isDragging = false;

            let other = isSuperposed(currentDraggingShape);
            if (other !== null) {
                handleFusion(currentDraggingShape, other);
            }

            currentDraggingShape = null;
            isDraggingInternal.value = false;
        }

        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };

    const startDrag = (shape, event) => {
        event.stopPropagation();

        isDraggingInternal.value = true;

        currentDraggingShape = shape;
        shape.isDragging = true;

        bringToFront(shape);

        const rect = containerRef.value.getBoundingClientRect();
        shape.offsetX = event.clientX - rect.left - shape.x;
        shape.offsetY = event.clientY - rect.top - shape.y;

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return {
        isDragOver,
        handleDrop,
        handleDragOver,
        handleDragEnter,
        handleDragLeave,
        startDrag,
        isDraggingInternal,
    };
}