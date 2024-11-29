<script setup>
import { defineEmits } from "vue";

const props = defineProps({
  id: Number,
  name: String,
  icon: String,
  gameMode: String,
});

const emit = defineEmits(['click', 'drag-start']);

const handleClick = () => {
  emit('click', props.id);
};

const handleDragStart = (event) => {
  event.dataTransfer.setData('application/json', JSON.stringify(props));
  emit('drag-start', props.id);
};
</script>

<template>
  <div
      class="inventory-item"
      @click="handleClick"
      draggable="true"
      @dragstart="handleDragStart"
  >
    <img v-if="gameMode !== 'infinity'" class="icon" :src="icon" :alt="`icon for ${name}`" />
    <div v-else class="icon">{{icon}}</div>
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
  cursor: grab;
}

.inventory-item:active {
  cursor: grabbing;
}

.inventory-item:hover {
  border: 1px solid #00cdb2;
}


.icon {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border-radius: 11px;
  border: 1px solid #BBB;
  font-size: 20pt;
}
</style>