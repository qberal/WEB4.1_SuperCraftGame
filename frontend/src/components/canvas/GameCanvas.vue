<script setup>
import {ref, watch, defineEmits} from 'vue';
import CanvasItem from "@/components/canvas/CanvasItem.vue";
import useShapes from "@/composables/useShapes";
import useFusionInfiniteMode from "@/composables/useFusionInfiniteMode";
import useFusionNormalMode from "@/composables/useFusionNormalMode";
import useDragAndDrop from "@/composables/useDragAndDrop";

const props = defineProps({
  cleanUpAction: Boolean,
  gameMode: String,
  currentSelectedItem: Object, // Assurez-vous que cette prop existe
});

const emit = defineEmits(['fusion-completed']);

const containerRef = ref(null);

// Utilisation du composable useShapes
const {shapes, addShape, saveCanvas, loadCanvas, isSuperposed} = useShapes(containerRef);

watch(
    () => props.cleanUpAction,
    () => {
      shapes.splice(0);
    }
);


let handleFusion;

if (props.gameMode !== 'normal') {
  ({ handleFusion } = useFusionInfiniteMode(shapes, addShape, emit));
} else {
  ({ handleFusion } = useFusionNormalMode(shapes, addShape, emit));
}

// Gestion du clic pour ajouter des formes
const handleClick = (event) => {
  if (props.currentSelectedItem?.icon) {
    const rect = containerRef.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newShape = addShape(x, y, props.currentSelectedItem.icon, props.currentSelectedItem.name);

    let other = isSuperposed(newShape);
    if (other !== null) {
      handleFusion(newShape, other);
    }
  }
};

// Utilisation du composable useDragAndDrop
const {
  isDragOver,
  handleDrop,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  startDrag,
  isDraggingInternal,
} = useDragAndDrop(shapes, containerRef, addShape, isSuperposed, handleFusion);

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
    <div v-for="shape in shapes" :key="shape.id">
      <CanvasItem
          :data="shape"
          @mousedown="(e) => startDrag(shape, e)"
          @dblclick="addShape(shape.x + shape.width, shape.y + shape.height, shape.icon, shape.name)"
          draggable="false"
          :game-mode="gameMode"
      />
    </div>
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
  border-radius: 50%;
  transition: transform 0.1s;
}

.shape:active {
  cursor: grabbing;
}

.image-shape {
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 0;
}

.circle-shape {
  background-color: lightblue;
}
</style>