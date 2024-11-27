<script setup>
import {ref, reactive, onMounted, watch} from 'vue';

const props = defineProps({
  cleanUpAction: Boolean,
  currentSelectedItem: Object,
})

// Quand la prop cleanUpAction passe à true, vider le canvas
watch(() => props.cleanUpAction, (newValue) => {
  shapes.splice(0);
  drawCanvas();
})

const canvasRef = ref(null);

let shapes = reactive([
  {id: 1, x: 100, y: 100, radius: 30, color: "red", isDragging: false},
  {id: 2, x: 200, y: 200, radius: 40, color: "blue", isDragging: false},
]);

let selectedShape = null;

const drawCanvas = () => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shapes.forEach((shape) => {
    if (shape.image && shape.image.complete) {
      ctx.drawImage(
          shape.image,
          shape.x - shape.width / 2,
          shape.y - shape.height / 2,
          shape.width,
          shape.height
      );
    } else if (shape.color) {
      ctx.fillStyle = shape.color;
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  });
};

const getClickedShape = (x, y) => {
  return shapes.find((shape) => {
    if (shape.radius) {
      // Pour les cercles
      return Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2) <= shape.radius;
    } else if (shape.width && shape.height) {
      // Pour les images (rectangles)
      return (
          x >= shape.x - shape.width / 2 &&
          x <= shape.x + shape.width / 2 &&
          y >= shape.y - shape.height / 2 &&
          y <= shape.y + shape.height / 2
      );
    }
    return false;
  });
};




// Début du drag and drop
const handleMouseDown = (event) => {
  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  selectedShape = getClickedShape(x, y);

  if (selectedShape) {
    selectedShape.isDragging = true;
    selectedShape.offsetX = x - selectedShape.x;
    selectedShape.offsetY = y - selectedShape.y;
  }

  isDragging = true;
  clickPrevented = false; // Initialisation
};

// Déplacement de l'objet
const handleMouseMove = (event) => {
  if (!selectedShape || !selectedShape.isDragging) return;

  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  selectedShape.x = x - selectedShape.offsetX;
  selectedShape.y = y - selectedShape.offsetY;

  drawCanvas();
  clickPrevented = true; // Empêche le déclenchement du clic
};

let isDragging = false;
let clickPrevented = false;

// Fin du drag and drop
const handleMouseUp = () => {
  if (selectedShape) {
    selectedShape.isDragging = false;
    selectedShape = null;
  }

  isDragging = false;
};

const handleClick = (event) => {
  // Si un drag a eu lieu, on ignore le clic
  if (clickPrevented) {
    clickPrevented = false; // Réinitialisation pour le prochain cycle
    return;
  }

  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (props.currentSelectedItem?.icon) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = props.currentSelectedItem.icon;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const newShape = reactive({
        id: shapes.length + 1,
        x: x,
        y: y,
        width: 50,
        height: 50 / aspectRatio,
        image: img,
        isDragging: false,
        offsetX: 0,
        offsetY: 0,
      });

      shapes.push(newShape);
      drawCanvas();
    };

    img.onerror = () => {
      console.error('Erreur lors du chargement de l\'image :', props.currentSelectedItem.icon);
    };
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
  canvas.addEventListener("click", handleClick);
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