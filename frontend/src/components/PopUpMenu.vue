<script setup>
const props = defineProps({
  show: Boolean,
  title: String,
});

defineEmits(['close']);
</script>

<template>
  <Transition
      name="custom-classes"
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__bounceOut"
  >
    <div v-if="props.show" class="popup-container">
      <div class="popup-menu">
        <img src="/assets/xmark.svg" alt="close button" @click="$emit('close')"/>
        <div class="popup-content">
          <h2 class="popup-title">{{ title }}</h2>
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
  <Transition name="custom-classes"
              enter-active-class="animate__animated animate__faceIn"
              leave-active-class="animate__animated animate__fadeOut">
    <div v-if="show" class="blur-background"></div>
  </Transition>
</template>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.popup-menu {
  position: absolute;
  top: 10vh;
  left: 25vw;
  width: 50vw;
  height: 75vh;
  background: #F7F7F7;
  border-radius: 10px;
  border: 1px solid #BBB;
  box-shadow: 0px 0px 4.2px 0px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

img {
  width: 20px;
  height: 20px;
  margin: 10px;
  float: left;
  cursor: pointer;
}

.blur-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 95;
}

.popup-title {
  flex: 1;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>