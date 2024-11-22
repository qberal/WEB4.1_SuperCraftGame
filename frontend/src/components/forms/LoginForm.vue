<script setup>
import BaseForm from './BaseForm.vue'
</script>

<template>
  <BaseForm title="Login" submitLabel="Login">
    <template #fields>
      <label for="username">Username
        <input type="text" id="username" name="username" required />
      </label>
      <label for="password">Password
        <input type="password" id="password" name="password" required />
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