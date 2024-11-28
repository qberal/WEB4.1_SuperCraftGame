<script setup>
defineProps({
  data: Object,
});

</script>

<template>
    <div
        class="shape"
        :style="{
      top: data.y + 'px',
      left: data.x + 'px',
      width: data.width + 'px',
      height: data.height + 'px',
      pointerEvents: data.pointerEvents || 'auto',
    }"
    >
      <img v-if="data.imgSrc" :src="data.imgSrc" alt="shape" draggable="false"/>
      <div v-else class="infinity" draggable="false">
        <p>{{data.emoji}}</p>
        <p>{{data.name}}</p>
      </div>

    </div>

</template>

<style scoped>

.shape {
  position: absolute;
  cursor: grab;
  border-radius: 50%;
  transition: transform 0.1s;
}

.infinity {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 1px solid black;
  width: 100px;
}

img {
  /*
    * On veut que l'image prenne toute la place dans le conteneur
    * et qu'elle ne soit pas déformée
    */
  width: 100%;
  height: 100%;
  object-fit: contain;
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