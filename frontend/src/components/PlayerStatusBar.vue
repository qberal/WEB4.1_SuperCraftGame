<script setup>
import {ref, computed} from "vue";
import axios from 'axios';
import { useRouter } from 'vue-router';

defineProps({
  name: String,
  profilePicture: String,
  score: Number,
  maxScore: Number,
  gameMode: String,
});

defineEmits(['open-leaderboard', 'open-credits']);

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
  <div
      class="player-status-container"
      :class="{ 'expanded': extraSettingOpened }"
  >
    <div
        class="player-status-bar"
        @click="extraSettingOpened = !extraSettingOpened"
    >
      <div class="profile">
        <img :src="profilePicture" alt="profile picture">
        <p>{{ name }}</p>
      </div>
      <div class="score">
        <p>{{ score }}</p>
        <div>
          <p v-if="maxScore !== null">/ {{ maxScore }}</p>
        </div>
      </div>
    </div>

    <Transition
        name="custom-classes"
        enter-active-class="animate__animated animate__flipInX "
        leave-active-class="animate__animated animate__fadeOut "
    >
    <div
        v-if="extraSettingOpened"
        class="extra-settings"
    >
      <a v-if="gameMode !== 'guest'" @click="$emit('open-leaderboard')">Leaderboard</a>
      <a @click="$emit('open-credits')">Credits</a>
      <a v-if="gameMode !== 'guest'" @click="logoutUser">Logout</a>
      <a v-if="gameMode === 'guest'" @click="router.push('/login')">Login</a>
      <a v-if="gameMode === 'guest'" @click="router.push('/login')">Exit</a> <!-- toujour faire croire que l'utilisateur à le choix... -->
    </div>
    </Transition>
  </div>
</template>

<style scoped>
.player-status-container {
  position: relative;
  transition: all 0.3s ease-in-out;
}

.player-status-container.expanded {
  transform: translateY(-100px);
}

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
  position: absolute;
  width: 100%;
  top: 100%;
}

a {
  text-decoration: underline;
  color: black;
}

a:hover {
  cursor: pointer;
  font-size: 1.1em;
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

.score {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}


.custom-classes-enter-active {
  animation: fadeInDown 0.3s ease-in-out 0.2s; /* 0.2s de délai */
}

.custom-classes-leave-active {
  animation: fadeOutUp 0.3s ease-in-out 0.2s; /* 0.2s de délai */
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>