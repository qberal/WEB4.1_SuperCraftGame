<script setup>

defineProps({
  icon: String,
  name: String,
  onClick: Function
});


</script>

<template>
  <div>
    <button @click="onClick">
      <img :src="icon" alt="icon for {{name}}">
    </button>
  </div>
</template>

<style scoped>

button {
  border-radius: 10px;
  border: 1px solid #BBB;
  background: #ECECEC;
  box-shadow: 0 4px 16.3px 0px rgba(49, 49, 49, 0.15);
  width: 50px;
  height: 50px;
}

button:hover {
  cursor: pointer;
  border: 1px solid #00cdb2;
}

button:active {
  background: #BBBBBB;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 5px;
}


</style>