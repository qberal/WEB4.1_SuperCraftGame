<script setup>
import {ref, reactive, watch} from 'vue';

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
  const newShape = reactive({
    id: shapes.length + 1,
    x: x - size / 2, // Centre la forme
    y: y - size / 2,
    width: size,
    height: size,
    imgSrc,
    color,
    isDragging: false,
  });
  shapes.push(newShape);

  let other = isSuperposed(newShape);
  if (other !== null) {
    handleFusion(newShape, other);
  }
};

const handleClick = (event) => {
  if (props.currentSelectedItem?.icon) {
    const rect = containerRef.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    addShape(x, y, props.currentSelectedItem.icon);
  }
};

// Vérifie si deux formes se chevauchent
const isOverlapping = (shape1, shape2, margin = 15) => {
  return !(
      shape1.x + shape1.width - margin <= shape2.x + margin || // shape1 est à gauche de shape2
      shape1.x + margin >= shape2.x + shape2.width - margin || // shape1 est à droite de shape2
      shape1.y + shape1.height - margin <= shape2.y + margin || // shape1 est au-dessus de shape2
      shape1.y + margin >= shape2.y + shape2.height - margin    // shape1 est en dessous de shape2
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

const handleFusion = (shape1, shape2) => {
  /**
   * C'est ici qu'on va tester si 2 items sont fusionnables ou pas. si oui, on va les fusionner et créer un nouvel item.
   * On enverra cet item dans l'inventaire pour qu'il soit affiché.
   * (On peut aussi faire une animation de fusion si on veut)
   */
  const newShape = reactive({
    id: shapes.length + 1,
    x: Math.min(shape1.x, shape2.x),
    y: Math.min(shape1.y, shape2.y),
    width: Math.max(shape1.x + shape1.width, shape2.x + shape2.width) - Math.min(shape1.x, shape2.x),
    height: Math.max(shape1.y + shape1.height, shape2.y + shape2.height) - Math.min(shape1.y, shape2.y),
    imgSrc: null,
    color: 'red',
    isDragging: false,
  });

  //delete shape 1 and shape 2
  shapes.splice(shapes.indexOf(shape1), 1);
  shapes.splice(shapes.indexOf(shape2), 1);

  shapes.push(newShape);
};

// Variables pour le drag and drop externe
const isDragOver = ref(false);

const handleDrop = (event) => {
  event.preventDefault();
  isDragOver.value = false;

  const rect = containerRef.value.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const data = event.dataTransfer.getData('application/json');
  const item = JSON.parse(data);

  if (item?.icon) {
    addShape(x, y, item.icon);
  }

  shapes.forEach((shape) => (shape.pointerEvents = 'auto'));
};

const handleDragOver = (event) => {
  if (!isDraggingInternal) {
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

    let other = isSuperposed(currentDraggingShape);
    if (other !== null) {
      handleFusion(currentDraggingShape, other);
    }

    currentDraggingShape = null;
    isDraggingInternal = false;
  }

  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
};

const startDrag = (shape, event) => {
  event.stopPropagation();

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
  >
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
    pointerEvents: shape.pointerEvents || 'auto',
  }"
        @mousedown="(e) => startDrag(shape, e)"
        @dblclick="addShape(shape.x + shape.width , shape.y + shape.height, shape.imgSrc)"
        draggable="false"
    />
  </div>
</template>
<style>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: white;
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
