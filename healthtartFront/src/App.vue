<template>
  <div id="app">
    <AppHeader />
  </div>
  <main>
    <RouterView/>
  </main>
</template>

<script setup>
  import './assets/css/style.css';
  import { RouterView, useRoute } from 'vue-router';
  import { ref, watch } from 'vue';

  import AppHeader from '@/components/AppHeader.vue';

  const route = useRoute();
  const isMainPage = ref(false);
  const isLoginPage = ref(false);

  watch(() => route?.path, (newPath) => {
    console.log("Route Path: ", newPath);
    isMainPage.value = newPath === '/';
    isLoginPage.value = newPath === '/login';
  },
  {
    immediate: true
  });
</script>

<style setup>
</style>