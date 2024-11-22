<script setup>
import InventoryItem from "@/components/InventoryItem.vue";
import {reactive, ref} from 'vue';

// inventory data
const inventory = reactive([
  {id: 1, icon: "/favicon.svg", name: "Item 1"},
  {id: 2, icon: "/favicon.svg", name: "Item 2"},
  {id: 3, icon: "/favicon.svg", name: "Item 3"},
  {id: 4, icon: "/favicon.svg", name: "Item 4"},
  {id: 5, icon: "/favicon.svg", name: "Item 5"},

]);

const clickedItemId = ref(null);

const updateClickedItem = (id) => {
  clickedItemId.value = id;
};

let isSearchVisible = ref(false);

</script>

<template>
  <div>
    <div class="inventory-header">
      <h3 v-if="!isSearchVisible">Inventory</h3>

      <input type="text" v-if="isSearchVisible" placeholder="Search inventory">

      <img class="search-button" src="../assets/img/magnifyingglass.svg" alt="magngifying glass icon"
           @click="isSearchVisible = !isSearchVisible">
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
