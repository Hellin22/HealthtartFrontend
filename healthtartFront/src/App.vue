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
import {ref, watch} from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';

  const route = useRoute();

  const isMainPage = ref(false);


  watch(() => route.path, (newPath) => {
    isMainPage.value = newPath === '/';
  } ,
  {
    immedate: true
  });

</script>

<style setup>
</style>