<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  id: Number,
  name: String,
  icon: String,
  isClicked: Boolean,
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.id);
};
</script>

<template>
  <div class="inventory-item" :class="{ selected: isClicked }" @click="handleClick">
    <img :src="icon" alt="icon for {{name}}"/>
    <h3>{{ name }}</h3>
  </div>
</template>

<style scoped>
.inventory-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #BBB;
  background: #F7F7F7;
  box-shadow: 0px -1px 4.2px 0px rgba(0, 0, 0, 0.10) inset;
  margin: 5px;
}

.inventory-item:hover {
  border: 1px solid #00cdb2;
}

.selected {
  background: #e8e8e8;
  box-shadow: 0px -3px 4.2px 0px rgba(0, 0, 0, 0.10) inset;
}

img {
  width: 50px;
  height: 50px;
  padding: 10px;
  margin: 10px;
  border-radius: 11px;
  border: 1px solid #BBB;
}
</style>