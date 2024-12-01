<script setup>
import {ref} from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';

defineProps({
  name: String,
  profilePicture: String,
  score: Number,
  maxScore: Number,
});

defineEmits(['open-leaderboard', 'open-settings']);

let extraSettingOpened = ref(false);

const router = useRouter();

const logoutUser = async () => {
  try {
    const response = await axios.post('/api/logout');
    if (response.status === 200) {
      router.push('/login');
    } else {
      console.error("Erreur lors de la déconnexion : ", response.data.message);
    }
  } catch (error) {
    console.error("Déconnexion échouée : ", error);
  }
}

</script>

<template>

  <div class="player-status-bar" @click="extraSettingOpened = !extraSettingOpened">
    <div class="profile">
      <img :src="profilePicture" alt="profile picture">
      <p>{{ name }}</p>
    </div>
    <div class="score">
      <p>{{ score }}</p>
      <div >
        <p v-if="maxScore !== null">/ {{ maxScore }}</p>
      </div>
    </div>
  </div>

  <div class="extra-settings" v-if="extraSettingOpened">
    <a @click="$emit('open-leaderboard')">Leaderboard</a>
    <a @click="$emit('open-settings')">Settings</a>
    <a @click="logoutUser">Logout</a>
  </div>



</template>

<style scoped>

.player-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #BBB;
  background: #ECECEC;
  box-shadow: 0px 4px 16.3px 0px rgba(49, 49, 49, 0.25);
}

.profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

img {
  width: 30px;
  height: 30px;
  border-radius: 22px;
  border: 1px solid rgba(187, 187, 187, 0.73);
  object-fit: contain;
}

.extra-settings {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px;
  margin-top: 5px;
  gap: 5px;
  border-radius: 10px;
  border: 1px solid #BBB;
  background: #ECECEC;
  box-shadow: 0px 4px 16.3px 0px rgba(49, 49, 49, 0.25);
}

a {
  text-decoration: underline;
  color: black;
}

a:hover {
  cursor: pointer;
  font-size: 1.1em;
}

.score {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

</style>