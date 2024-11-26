<script setup>
import { ref, reactive, onMounted } from 'vue';

const canvasRef = ref(null);

const shapes = reactive([
  { id: 1, x: 100, y: 100, radius: 30, color: "red", isDragging: false },
  { id: 2, x: 200, y: 200, radius: 40, color: "blue", isDragging: false },
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

const handleMouseDown = (event) => {
  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  selectedShape = getClickedShape(x, y);

  if (selectedShape) {
    selectedShape.isDragging = true;
    console.log(`Début du drag de la forme ${selectedShape.id}`);
  }
};

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

const handleMouseUp = () => {
  if (selectedShape) {
    console.log(`Fin du drag de la forme ${selectedShape.id}`);
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

  onUnmounted(() => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mousemove", handleMouseMove);
    canvas.removeEventListener("mouseup", handleMouseUp);
  });
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