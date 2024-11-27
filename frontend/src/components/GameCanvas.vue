<script setup>
import {ref, reactive, onMounted, watch} from 'vue';

const props = defineProps({
  cleanUpAction: Boolean
})

//when cleanUpAction prop changes to true, empty canvas
watch(() => props.cleanUpAction, (newValue) => {
  shapes.splice(0, shapes.length);
  drawCanvas();
})

const canvasRef = ref(null);

const shapes = reactive([
  {id: 1, x: 100, y: 100, radius: 30, color: "red", isDragging: false},
  {id: 2, x: 200, y: 200, radius: 40, color: "blue", isDragging: false},
]);

let selectedShape = null;

const drawCanvas = () => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  shapes.forEach((shape) => {
    ctx.fillStyle = shape.color;
    ctx.beginPath();
    ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
    ctx.fill();
  });
};

const getClickedShape = (x, y) => {
  return shapes.find(
      (shape) =>
          Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2) <= shape.radius
  );
};

//début du drag and drop
const handleMouseDown = (event) => {
  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  selectedShape = getClickedShape(x, y);

  if (selectedShape) {
    selectedShape.isDragging = true;
  }
};

//déplacement de l'objet
const handleMouseMove = (event) => {
  if (!selectedShape || !selectedShape.isDragging) return;

  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  selectedShape.x = x;
  selectedShape.y = y;

  drawCanvas();
};

//fin du drag and drop
const handleMouseUp = () => {
  if (selectedShape) {
    selectedShape.isDragging = false;
    selectedShape = null;
  }
};


onMounted(() => {
  const canvas = canvasRef.value;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  drawCanvas();

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseup", handleMouseUp);
});
</script>

<template>
  <canvas ref="canvasRef"></canvas>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

canvas {
  display: block;
}
</style>