import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/views/MainPage.vue';

// import LoginRoutes from './login';
import UserRoutes from './user';
import SignupRoutes from './signup';
import HistoryRoutes from './history';  

const routes = [
  { path: "/", component: MainPage },
  // ...LoginRoutes,
  ...UserRoutes,
  ...SignupRoutes,
  ...HistoryRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;