<script setup>
import { ref, reactive, watch } from 'vue';

const props = defineProps({
  cleanUpAction: Boolean,
  currentSelectedItem: Object,
});

watch(
    () => props.cleanUpAction,
    () => {
      shapes.splice(0); // Efface les formes
    }
);

const shapes = reactive([]);
const containerRef = ref(null);

const addShape = (x, y, imgSrc = null, color = null) => {
  const size = 50; // Taille par défaut
  shapes.push(
      reactive({
        id: shapes.length + 1,
        x: x - size / 2, // Centre la forme
        y: y - size / 2,
        width: size,
        height: size,
        imgSrc,
        color,
        isDragging: false,
      })
  );
};

const handleClick = (event) => {
  if (props.currentSelectedItem?.icon) {
    const rect = containerRef.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    addShape(x, y, props.currentSelectedItem.icon);
  }
};

// Variables pour le drag and drop externe
const isDragOver = ref(false);

const handleDrop = (event) => {
  event.preventDefault();
  isDragOver.value = false;

  const rect = containerRef.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Récupère les données de l'élément glissé
  const data = event.dataTransfer.getData('application/json');
  const item = JSON.parse(data);

  if (item?.icon) {
    addShape(x, y, item.icon);
  }
};

const handleDragOver = (event) => {
  if (!isDraggingInternal) {
    event.preventDefault();
  }
};

const handleDragEnter = () => {
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

// Variables pour le déplacement des formes internes
let currentDraggingShape = null;
let isDraggingInternal = false;

const onMouseMove = (event) => {
  if (!currentDraggingShape) return;

  const rect = containerRef.value.getBoundingClientRect();
  currentDraggingShape.x = event.clientX - rect.left - currentDraggingShape.offsetX;
  currentDraggingShape.y = event.clientY - rect.top - currentDraggingShape.offsetY;
};

const onMouseUp = () => {
  if (currentDraggingShape) {
    currentDraggingShape.isDragging = false;
    currentDraggingShape = null;
    isDraggingInternal = false;
  }

  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};

const startDrag = (shape, event) => {
  event.stopPropagation();
  // event.preventDefault(); // Retirez ceci si nécessaire

  isDraggingInternal = true;

  currentDraggingShape = shape;
  shape.isDragging = true;

  const rect = containerRef.value.getBoundingClientRect();
  shape.offsetX = event.clientX - rect.left - shape.x;
  shape.offsetY = event.clientY - rect.top - shape.y;

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};
</script>

<template>
  <div
      ref="containerRef"
      class="container"
      @click="handleClick"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragenter="handleDragEnter"
      @dragleave="handleDragLeave"
      draggable="false"
  ></div>
  <div
      v-for="shape in shapes"
      :key="shape.id"
      :class="['shape', shape.imgSrc ? 'image-shape' : 'circle-shape']"
      :style="{
        top: shape.y + 'px',
        left: shape.x + 'px',
        width: shape.width + 'px',
        height: shape.height + 'px',
        backgroundImage: shape.imgSrc ? `url(${shape.imgSrc})` : 'none',
        backgroundColor: shape.color || 'transparent',
      }"
      @mousedown="(e) => startDrag(shape, e)"
      draggable="false"
  ></div>
</template>

<style>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #f0f0f0;
  overflow: hidden;
}

.container.drag-over {
  border: 2px dashed #aaa;
}

.shape {
  position: absolute;
  cursor: grab;
  border-radius: 50%; /* Cercle par défaut */
  transition: transform 0.1s;
}

.shape:active {
  cursor: grabbing;
}

.image-shape {
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 0; /* Images rectangulaires */
}

.circle-shape {
  background-color: lightblue; /* Couleur de secours */
}
</style>