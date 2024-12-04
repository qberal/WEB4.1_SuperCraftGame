<script setup>
defineProps({
  data: Object,
  gameMode: String,
});

</script>

<template>
  <Transition name="custom-classes" enter-active-class="animate__animated animate__bounceIn">
  <div
      class="shape"
      :style="{
      top: data.y + 'px',
      left: data.x + 'px',
      pointerEvents: data.pointerEvents || 'auto',
    }"
  >
    <img class="icon" v-if="gameMode !== 'infinity'" :src="'api/images/'+data.icon" :alt="'icon of ' + data.name" draggable="false"
         :style="{width: data.width + 'px',
                  height: data.height + 'px',}"/>
    <div class="infinity" v-else>
      <div>{{ data.icon }} - {{ data.name }}</div>
    </div>
  </div>
  </Transition>


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
  border-radius: 11px;
  border: 1px solid #BBB;
  padding: 10px;
  box-shadow: 0px -1px 4.2px 0px rgba(0, 0, 0, 0.10) inset;
  background: #F9F9F9;
}

.icon {
  width: 100%;
  height: 100%;
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

.infinity:hover {
  border: 1px solid #00cdb2;
  box-shadow: 0px -1px 4.2px 0px rgba(0, 0, 0, 0.40) inset;
}

.icon:hover {
  filter: drop-shadow(1px 2px 1px rgba(0, 0, 0, 0.20));
  transition: all 0.1s ease-in-out;
}

</style>