<script setup>

</script>

<template>
  <div class="form">
    <h1>Super Craft Game</h1>
    <slot></slot>
    <router-view />
  </div>
  <div class="background">
  </div>
</template>

<style scoped>

h1 {
  display: flex;
  justify-content: center;
}

.form {
  margin: 10vh auto;
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 750px;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f6d365, #fda085);
  z-index: -1;
}

@media (max-width: 768px) {
  .form {
    max-width: 100vw;
  }
}

</style>