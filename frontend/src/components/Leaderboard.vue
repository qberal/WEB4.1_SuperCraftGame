<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  gameMode: String,
});

const players = ref([]);

const fetchPlayers = async () => {
  try {
    const response = await axios.get(`/api/${props.gameMode}/getLeaderboard`);
    players.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des joueurs :", error);
  }
};

onMounted(() => {
  fetchPlayers();
});
</script>

<template>
  <el-table :data="players" style="width: 98%" stripe>
    <el-table-column prop="username" label="Name"></el-table-column>
    <el-table-column prop="count" label="Score" sortable></el-table-column>
  </el-table>
</template>

<style scoped>
.el-table {
  padding: 10px;
  background-color: #F7F7F7;
  border-radius: 20px;
}

</style>