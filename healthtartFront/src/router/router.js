import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/views/MainPage.vue';
import MyPage from '@/views/user/MyPage.vue';
// import LoginRoutes from './login';
import SigninRoutes from './signin';

// function isLoggedIn() {
//   // localStorage는 vue.js에서 전역으로 사용할 수 있는 storage
//   return !!localStorage.getItem('token'); 
// }

// meta: {requireAuth: true} 로그인이 필요한 페이지에 추가하기
const routes = [
  { path: "/", component: MainPage },
  { path: "/mypage", component: MyPage },
  // ...LoginRoutes,
  ...SigninRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const loggedIn  = isLoggedIn();

// if (to.matched.some(record => record.meta.requiresAuth)) {
//   if (!loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// } else {
//   next();
// }
// });

export default router;