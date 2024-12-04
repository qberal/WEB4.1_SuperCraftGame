<script setup>
import BaseForm from './BaseForm.vue'
import {useRouter} from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

// Fonction qui gère la redirection après la soumission du formulaire
const handleFormSubmit = (response) => {
  if (response && response.status === 200) {
    router.push('/normal');
  } else {
    console.error("Erreur lors de l'enregistrement ou réponse inattendue.");
  }
};

onMounted(() => {
  let casLoginLink = document.getElementById('cas-login-link');
  let selfDomain = window.location.origin;
  let next = `${selfDomain}/api/cas-callback`;
  let encodedNext = encodeURIComponent(next);
  let target = `https://auth.insa.lol/login?next=${encodedNext}`;
  casLoginLink.href = target;
});
</script>

<template>
  <BaseForm endpoint="/api/login" title="Login" submitLabel="Login" @submit="handleFormSubmit">
    <template #fields="{ formData }">
      <label for="username">Username
        <input type="text" v-model="formData.username" id="username" name="username" required />
      </label>
      <label for="password">Password
        <input type="password" v-model="formData.password" id="password" name="password" required />
      </label>
    </template>

    <template #links>
      <p><a id="cas-login-link" href="">Login via CAS</a></p>
      <p>Don't have an account? <a href="/register">Sign up</a></p>
      <p>Forgot your password? <a href="/forgot-password">Reset password</a></p>
      <p>or <a href="/guest">continue as guest</a></p>
    </template>
  </BaseForm>
</template>