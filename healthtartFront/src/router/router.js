import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/views/MainPage.vue';

// import LoginRoutes from './login';
import SigninRoutes from './signin';
import HistoryRoutes from './history';  

const routes = [
  { path: "/", component: MainPage },
  // ...LoginRoutes,
  ...SigninRoutes,
  ...HistoryRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;