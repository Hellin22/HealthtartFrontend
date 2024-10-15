<template>
  <div id="app">
    <MainPage />
  </div>
  <main>
    <RouterView/>
  </main>
</template>

<script setup>
  import './assets/css/style.css';
  import { RouterView, useRoute } from 'vue-router';

  import MainPage from './views/MainPage.vue';
</script>

<style setup>
</style>
