<script setup>

import PlayerStatusBar from "@/components/PlayerStatusBar.vue";
import InventoryPanel from "@/components/inventory/InventoryPanel.vue";
import SimpleButton from "@/components/buttons/SimpleButton.vue";
import {reactive, ref, onMounted} from "vue";
import PopUpMenu from "@/components/PopUpMenu.vue";
import Leaderboard from "@/components/Leaderboard.vue";
import GameCanvas from "@/components/canvas/GameCanvas.vue";
import GameModeSelection from "@/components/GameModeSelection.vue";
import useGuestMode from "@/composables/useGuestMode";
import axios from "axios";

// Props
const props = defineProps({
  gameMode: String,
});

// Références et variables réactives
const todaysWord = ref("");
const player = ref({
  name: "Guest",
  profilePicture: "/assets/person.svg",
  score: 0,
  maxScore: null,
});
const inventory = reactive([]);
const openDemoFinished = ref(false);

// Pop-ups et état
let cleanUpToggle = ref(false);
let openLeaderboard = ref(false);
let openSettings = ref(false);

// Fonction pour ajouter un objet à l'inventaire
const addToInventory = (item) => {
  if (inventory.find((i) => i.name === item.name)) {
    return;
  }

  inventory.push({
    id: item.id || inventory.length + 1,
    icon: item.icon,
    name: item.name,
  });

  if (props.gameMode === "infinity" && item.name === todaysWord.value) {
    setTimeout(() => {
      alert("You found the word! You win. Your score is: " + player.value.score);
    }, 1000);
    return;
  }

  if(props.gameMode === "guest" && inventory.length >= 7) {
    openDemoFinished.value = true;
  }

  player.value.score += 1;
};

// Initialisation avec onMounted
onMounted(() => {
  if (props.gameMode !== "guest") {

    axios.get(`/api/${props.gameMode}/getInventory`)
        .then((response) => {
          response.data.forEach((item) => {
            inventory.push({
              id: item.id || inventory.length + 1,
              icon: item.icon,
              name: item.name,
            });
          });
        })
        .catch((error) => console.error("Failed to fetch inventory:", error));


    axios.get(`/api/${props.gameMode}/getScore`)
        .then((response) => {
          player.value.score = response.data.score || 0;
          player.value.maxScore = response.data.maxScore || null;
        })
        .catch((error) => console.error("Failed to fetch score:", error));


    axios.get("/api/getUsername")
        .then((response) => {
          player.value.name = response.data.username || "Guest";
        })
        .catch((error) => console.error("Failed to fetch username:", error));

  } else {
    const {setDefaultInventory} = useGuestMode(inventory);
    setDefaultInventory();
    player.value.score = inventory.length;
  }


  if (props.gameMode === "infinity") {
    axios.get("/api/infinity/getWordOfTheDay")
        .then((response) => {
          todaysWord.value = response.data.word || "";
        })
        .catch((error) => console.error("Failed to fetch word of the day:", error));
  }
});
</script>

<template>
  <div class="layout">
    <!-- Barre de statut en bas à gauche -->
    <div class="status-bar">
      <PlayerStatusBar
          :name=player.name
          :profilePicture=player.profilePicture
          :score=player.score
          :maxScore=player.maxScore
          :gameMode=props.gameMode
          @open-leaderboard="openLeaderboard = !openLeaderboard"
          @open-settings="openSettings = !openSettings"
      />
    </div>

    <div v-if="gameMode !== 'guest'" class="game-mode-status-bar">
      <GameModeSelection
          :game-mode=gameMode
      />
    </div>

    <div v-if="props.gameMode === 'infinity'" class="todays-word">
      <h3>Today's word: {{ todaysWord }}</h3>
    </div>
    <!-- Inventaire à droite -->
    <div class="inventory">
      <InventoryPanel :inventory="inventory" :game-mode="props.gameMode"/>
    </div>

    <!-- Canvas de jeu -->
    <div class="game-canvas">
      <GameCanvas :clean-up-action="cleanUpToggle" :game-mode="props.gameMode" @fusion-completed="addToInventory"/>
    </div>


    <!-- Bouton en bas avant l'inventaire -->
    <div class="button-container">
      <SimpleButton icon="/assets/clean.svg" @cleanUp="cleanUpToggle = !cleanUpToggle"/>
    </div>

    <!-- PopUps -->
    <PopUpMenu title="Leaderboard" :show="openLeaderboard" @close="openLeaderboard = false">
      <Leaderboard :game-mode="props.gameMode"/>
    </PopUpMenu>

    <PopUpMenu title="Settings" :show="openSettings" @close="openSettings = false">
      <p>Settings (WIP)</p>
    </PopUpMenu>

    <PopUpMenu title="Demo finished" :show="openDemoFinished">
      <p>You reached the end of the demo. You can continue playing by creating an account.</p>
      <p>With an account, you can save your progress and compete with other players on the leaderboard.</p>
      <p>You can also explore the other game modes.</p>
      <p>Register here to continue playing: <a href="/register">join us !</a></p>
    </PopUpMenu>
  </div>
</template>

<style scoped>
body {
  overflow: hidden;
}

.status-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  width: 20vw;
  z-index: 90;
}

.inventory {
  position: absolute;
  top: 0;
  right: 0;
  width: 20%; /* Prend 20% de la largeur de l'écran */
  padding: 20px;
  height: 98%;
  border-radius: 10px;
  border: 1px solid #BBB;
  background: #ECECEC;
  box-shadow: 0px 4px 16.3px 0px rgba(49, 49, 49, 0.25);
  margin: 10px 10px 10px 0;
  z-index: 90;
}

.button-container {
  position: absolute;
  right: 20%;
  bottom: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 90;
}

.game-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
}

.layout {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.game-mode-status-bar {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  width: 20vw;
  z-index: 90;
}

.todays-word {
  position: absolute;
  top: 0;
  left: 20vw;
  padding: 20px;
  width: 60vw;
  z-index: 90;
  text-align: center;
  text-shadow: 0px 4px 16.3px rgba(49, 49, 49, 0.25);
}

p {
  text-align: center;
}
</style>