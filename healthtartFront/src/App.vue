<template>
  <div id="app">

    <AppHeader :is-logged-in="loginState.isLoggedIn" :user-nickname="loginState.userNickname" @logout="logout" />
  </div>
  <main>
    <RouterView @login-success="handleLoginSuccess"/>
  </main>
</template>

<script setup>
import './assets/css/style.css';
import { ref, onMounted, provide, watch, reactive } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';
import { jwtDecode } from 'jwt-decode';


const route = useRoute();
const router = useRouter();

// 로그인 상태를 reactive 객체로 만듭니다.
const loginState = reactive({
  isLoggedIn: false,
  userNickname: ''
});

// 로그인 상태 확인 함수
const checkLoginStatus = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime) {
        loginState.isLoggedIn = true;
        loginState.userNickname = decodedToken.nickname;
        console.log(decodedToken.nickname);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      logout();
    }
  } else {
    loginState.isLoggedIn = false;
    loginState.userNickname = '';
  }
};

// 로그아웃 함수
const logout = () => {
  localStorage.removeItem('token');
  loginState.isLoggedIn = false;
  loginState.userNickname = '';
  router.push('/');
};

// 로그인 성공 처리 함수
const handleLoginSuccess = () => {
  checkLoginStatus();
};

onMounted(() => {
  checkLoginStatus();
  // 주기적으로 로그인 상태 확인 (예: 1분마다)
  setInterval(checkLoginStatus, 60000);
});

// 로그인 상태와 관련 함수들을 provide
provide('loginState', {
  state: loginState,
  logout,
  checkLoginStatus
});
</script>

<style scoped>
</style>
