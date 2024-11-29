<script setup>
import BaseForm from './BaseForm.vue'
import {useRouter} from "vue-router";

const router = useRouter(); // Initialiser useRouter

// Fonction pour gérer la redirection après la soumission du formulaire
const handleFormSubmit = (response) => {
  console.log("Réponse reçue du backend dans LoginForm : ", response);
  if (response && response.status === 200) {
    console.log("Redirection vers /guest après l'enregistrement réussi.");
    router.push('/play');
  } else {
    console.error("Erreur lors de l'enregistrement ou réponse inattendue.");
  }
};

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
      <p><a href="/cas/login">Login via CAS</a></p>
      <p>Don't have an account? <a href="/register">Sign up</a></p>
      <p>Forgot your password? <a href="/forgot-password">Reset password</a></p>
      <p>or <a href="/guest">continue as guest</a></p>
    </template>
  </BaseForm>
</template>