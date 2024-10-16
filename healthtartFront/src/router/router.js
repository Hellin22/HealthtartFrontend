import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';

import HistoryRoutes from './history';  

const routes = [
  { path: "/", component: MainPage },
  ...HistoryRoutes,  

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;