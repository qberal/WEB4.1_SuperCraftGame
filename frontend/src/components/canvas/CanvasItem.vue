<script setup>
defineProps({
  data: Object,
});

</script>

<template>
  <div
      :class="['shape', data.imgSrc ? 'image-shape' : 'circle-shape']"
      :style="{
      top: data.y + 'px',
      left: data.x + 'px',
      width: data.width + 'px',
      height: data.height + 'px',
      backgroundImage: data.imgSrc ? `url(${data.imgSrc})` : 'none',
      backgroundColor: data.color || 'transparent',
      pointerEvents: data.pointerEvents || 'auto',
    }"
  >
  </div>
</template>

<style scoped>
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