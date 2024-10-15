<template>
  <div id="app">
    <AppHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import './assets/css/style.css';
import { ref, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';

const route = useRoute();

const isMainPage = ref(false);
const isHistoryPage = ref(false);

watch(() => route.path, (newPath) => {
  isMainPage.value = newPath === '/';
  isHistoryPage.value = newPath === '/history';
}, {
  immediate: true  
});
</script>

<style scoped>
</style>
