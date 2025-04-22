<template>
    <div>로그인 처리 중입니다...</div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  onMounted(async () => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
  
    if (code) {
      try {
        const response = await axios.post('http://localhost:8080/api/oauth/kakao', { code },{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log(response)
        const jwt = response.data.token;
  
        // localStorage에 저장
        localStorage.setItem('token', jwt);
  
        router.push('/'); // 메인 페이지로 이동

      } catch (error) {
        console.error('로그인 실패', error);
        router.push('/login');
      }
    }
  });
  </script>
  