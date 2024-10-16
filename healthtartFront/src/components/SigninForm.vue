<template>
    <div class="outer-container">
    <div class="form-container">
        <div class="inner-container">
      <form @submit.prevent="submitForm">
        <div class="email-form">
            <div class="left-email">
                <label for="email">이메일</label>
                <input type="text" class="email" v-model="formData.email" placeholder="이메일 입력" />
            </div>
            <div class="right-email">
                <div class="blank">
                </div>
                <button type="button" @click="" class="auth">인증</button>
            </div>
        </div>
  
        <div class="password-form">
          <label for="password">비밀번호</label>
          <input type="text" class="password" v-model="formData.password" placeholder="비밀번호 입력" />
        </div>
  
          <div class="name-form">
            <label for="name">이름</label>
            <input type="text" v-model="formData.name" class="name" placeholder="이름 입력" />
          </div>
  
          <div class="phonenumber-form">
            <label for="phonenumber">전화번호</label>
            <input type="text" class="phonenumber" v-model="formData.phonenumber" placeholder="전화번호 입력" />
          </div>
  
          <div class="nickname-form">
            <label for="nickname">닉네임</label>
            <input type="text" class="nickname" v-model="formData.nickname" placeholder="닉네임 입력" />
          </div>

          <button type="submit" class="next-btn">다음</button>
      </form>
    </div>
    </div>
</div>
  </template>
  
  <script setup>
//   import { ref } from 'vue';
//   import axios from 'axios';
  
//   // 폼 데이터 상태
//   const formData = ref({
//     email: '',
//     password: '',
//     name: '',
//     text: '',
//     phonenumber: '',
//     nickname: ''
//   });
  
//   // 폼 제출 함수
//   async function submitForm() {
//     try {
//       // 서버로 데이터 전송
//       const response = await axios.post('https://example.com/api/register', formData.value);
//       console.log('서버 응답:', response);
//       alert('가입 완료!');
//     } catch (error) {
//       console.error('가입 실패:', error);
//       alert('가입 실패! 다시 시도하세요.');
//     }
//   }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

  * {
    font-family: 'Inter', sans-serif;
  }
  .outer-container {
    width: 100vw;
    height: calc(100vh - 60px);;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner-container {

  }

  .form-container {
    background-color: #f0f4f8;
    padding: 20px;
    max-width: 380px;
    margin-left: 880px;
    margin-top: auto;
    margin-bottom: auto;
    border-radius: 20px;
    box-shadow: -20px 20px 20px rgba(0, 255, 255, 0.5);
    position: relative;
  }

  .email-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-email, .right-email, .password-form, .name-form, .phonenumber-form, .nickname-form {
    display: flex;
    flex-direction: column;
  }

  .blank {
    margin-top: 15px;
  }

  label {
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  .email, .password, .name, .phonenumber, .nickname {
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 15px;
    width: 320px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  input {
    font-size: 14px;
    width: 300px;
    height: 40px;
    border-radius: 12px;
    border-style: none;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  }

  input.email {
    width: 250px;
  }

  .auth {
    background-color: #01FDFE;
    width: 60px;
    height: 35px;
    border-style: none;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }

  .auth:hover {
    background-color: #1DEBEC;
    box-shadow: none;
    cursor: pointer;
  }

  .next-btn {
    background-color: #01FDFE;
    width: 320px;
    height: 45px;
    border-radius: 20px;
    border-style: none;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); 
    font-weight: bold;
    margin-top: 10px;
  }

  .next-btn:hover {
    background-color: #1DEBEC;
    box-shadow: none;
    cursor: pointer;
  }

  </style>
  