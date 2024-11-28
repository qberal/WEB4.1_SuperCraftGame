<script setup>
import { useRouter } from 'vue-router'; // Importer useRouter
import BaseForm from './BaseForm.vue'

const router = useRouter(); // Initialiser useRouter

// Fonction pour gérer la redirection après la soumission du formulaire
const handleFormSubmit = (response) => {
  console.log("Réponse reçue du backend dans RegisterForm : ", response);
  if (response && response.status === 201) {
    console.log("Redirection vers /login après l'enregistrement réussi.");
    router.push('/login');
  } else {
    console.error("Erreur lors de l'enregistrement ou réponse inattendue.");
  } //TODO : Généraliser dans BaseForm si possible
};
</script>

<template>
  <BaseForm endpoint="http://localhost:3000/register" title="Register" submitLabel="Register" @submit="handleFormSubmit">
    <template #fields="{ formData }">
      <label for="username">Username
        <input type="text" v-model="formData.username" id="username" name="username" required />
      </label>
      <label for="email">Email
        <input type="email" v-model="formData.email" id="email" name="email" required />
      </label>
      <label for="password">Password
        <input type="password" v-model="formData.password" id="password" name="password" required />
      </label>
      <label for="password-confirm">Confirm Password
        <input type="password" id="password-confirm" name="password-confirm" required />
      </label>
    </template>

    <template #links>
      <p>Already have an account? <a href="/login">Login</a></p>
    </template>
  </BaseForm>
</template>