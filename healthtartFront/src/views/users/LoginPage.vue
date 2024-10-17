<template>
    <LoginBackground/>
    <LoginForm @loginSuccess="handleLoginSuccess"/>
</template>

<script setup>
import { useRouter } from 'vue-router';
import LoginBackground from '@/components/users/LoginBackground.vue';
import LoginForm from '@/components/users/LoginForm.vue';

// Vue Router 사용
const router = useRouter();

// 로그인 성공 처리 함수
const handleLoginSuccess = (userNickname) => {
  console.log('로그인 성공, 닉네임:', userNickname);
  // 로그인 성공 시 메인 페이지로 이동
  router.push({ path: '/' });
  // 필요 시, 추가적인 처리 (로그인 성공 메시지 등)
};
</script>

<style scoped>

</style>