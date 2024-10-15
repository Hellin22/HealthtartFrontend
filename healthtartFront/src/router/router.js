import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import HistoryRoutes from '@/router/history/history.js';  // HistoryRoutes로부터 라우트 배열을 가져옴

// function isLoggedIn() {
//   // localStorage는 vue.js에서 전역으로 사용할 수 있는 storage
//   return !!localStorage.getItem('token'); 
// }

// meta: {requireAuth: true} 로그인이 필요한 페이지에 추가하기
const routes = [
  { path: "/", component: MainPage },
  ...HistoryRoutes,  // HistoryRoutes 배열을 펼쳐서 추가
  // ...LoginRoutes, // 필요한 경우 Login 관련 라우트도 추가
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
