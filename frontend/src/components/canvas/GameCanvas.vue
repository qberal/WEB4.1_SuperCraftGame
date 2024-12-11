<script setup>
import {ref, watch, defineEmits} from 'vue';
import CanvasItem from "@/components/canvas/CanvasItem.vue";
import useShapes from "@/composables/useShapes";
import useFusionInfiniteMode from "@/composables/fusion/useFusionInfiniteMode.js";
import useFusionNormalMode from "@/composables/fusion/useFusionNormalMode.js";
import useDragAndDrop from "@/composables/useDragAndDrop";
import useFusionGuestMode from "@/composables/fusion/useFusionGuestMode.js";

const props = defineProps({
  cleanUpAction: Boolean,
  gameMode: String,
});

const emit = defineEmits(['fusion-completed']);

const containerRef = ref(null);

const {shapes, addShape, saveCanvas, loadCanvas, isSuperposed, bringToFront} = useShapes(containerRef, props.gameMode);

watch(
    () => props.cleanUpAction,
    () => {
      shapes.splice(0);
      saveCanvas();
    }
);


let handleFusion;

if (props.gameMode === 'infinity') {
  ({ handleFusion } = useFusionInfiniteMode(shapes, addShape, emit));
} else if(props.gameMode === 'normal') {
  ({ handleFusion } = useFusionNormalMode(shapes, addShape, emit));
} else {
  ({ handleFusion } = useFusionGuestMode(shapes, addShape, emit));
}

if (props.gameMode !== 'guest') {
  loadCanvas();
}

const {
  isDragOver,
  handleDrop,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  startDrag,
  isDraggingInternal,
} = useDragAndDrop(shapes, containerRef, addShape, isSuperposed, handleFusion, bringToFront, saveCanvas);


const handleClick = (event) => {
  bringToFront()
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
    <div v-for="shape in shapes" :key="shape.id">
      <CanvasItem
          :data="shape"
          @mousedown="(e) => startDrag(shape, e)"
          @dblclick="addShape(shape.x + shape.width, shape.y + shape.height, shape.icon, shape.name,false, shape.id)"
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