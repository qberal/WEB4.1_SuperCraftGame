<script setup>
import InventoryItem from "@/components/InventoryItem.vue";
import {reactive, ref} from 'vue';

// inventory data
const inventory = reactive([
  {id: 1, icon: "./public/favicon.svg", name: "Item 1"},
  {id: 2, icon: "./public/favicon.svg", name: "Item 2"},
  {id: 3, icon: "./public/favicon.svg", name: "Item 3"},
  {id: 4, icon: "./public/favicon.svg", name: "Item 4"},
  {id: 5, icon: "./public/favicon.svg", name: "Item 5"},
  {id: 6, icon: "./public/favicon.svg", name: "Item 6"},
  {id: 7, icon: "./public/favicon.svg", name: "Item 7"},
  {id: 8, icon: "./public/favicon.svg", name: "Item 8"},
  {id: 9, icon: "./public/favicon.svg", name: "Item 9"},
  {id: 10, icon: "./public/favicon.svg", name: "Item 10"},
  {id: 11, icon: "./public/favicon.svg", name: "Item 11"},
  {id: 12, icon: "./public/favicon.svg", name: "Item 12"},
  {id: 13, icon: "./public/favicon.svg", name: "Item 13"},
  {id: 14, icon: "./public/favicon.svg", name: "Item 14"},
  {id: 15, icon: "./public/favicon.svg", name: "Item 15"},

]);

const clickedItemId = ref(null);

const updateClickedItem = (id) => {
  clickedItemId.value = id;
};

const handleSearchButton = () => {
  document.querySelector('input').classList.toggle('hidden');
  document.querySelector('input').focus();
  document.querySelector('h3').classList.toggle('hidden');
};

</script>

<template>
  <div>
    <div class="inventory-header">
      <h3>Inventory</h3>

      <input type="text" class="hidden" placeholder="Search inventory">

      <img class="search-button" src="../assets/img/magnifyingglass.svg" alt="magngifying glass icon"
           v-on:click="handleSearchButton">
    </div>

    <div class="inventory">
      <InventoryItem
          v-for="item in inventory"
          :key="item.id"
          :icon="item.icon"
          :name="item.name"
          :isClicked="item.id === clickedItemId"
          @click="updateClickedItem(item.id)"
      />
    </div>
  </div>
</template>

<style scoped>

.inventory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.inventory {
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;
}

.search-button {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

.hidden {
  display: none;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #BBB;
}

h3 {
  font-size: 18px;
  transition: opacity 0.3s ease;
}

</style>
