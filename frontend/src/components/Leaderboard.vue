<script setup>

import {computed} from "vue";

const props = defineProps({
  players: Array,
});

const sortedPlayers = computed(() => {
  return [...props.players].sort((a, b) => b.score - a.score);
});

</script>

<template>
  <div class="leaderboard">

  <div class="leaderboard-header">
    <h2>Rank</h2>
    <h2>Name</h2>
    <h2>Score</h2>
  </div>
    <div class="leaderboard-body">
  <div v-for="(player, index) in sortedPlayers" :key="player.id" class="leaderboard-items">
    <p>{{ index + 1 }}</p>
    <p>{{ player.name }}</p>
    <p>{{ player.score }}</p>
  </div>
    </div>

  </div>

</template>

<style scoped>

.leaderboard {
  padding: 20px;
}

.leaderboard-items, .leaderboard-header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.leaderboard-items {
  padding: 10px;
  border-bottom: 1px solid #BBB;
  max-height: 80vh;
  overflow: scroll;
}

.leaderboard-header {
  font-weight: bold;
  border-bottom: 1px solid#BBBBBB;
}

.leaderboard-items:nth-child(odd) {
  background: #ECECEC;
}

.leaderboard-body {
  max-height: 60vh; /* Limite la hauteur de la partie items */
  overflow-y: auto; /* Permet le défilement vertical */
}

</style>