<template>
    <div class="outer-container">
    <div class="form-container">
      <form @submit.prevent="next">
        <div class="email-container">
          <div class="email-form">
            <div class="left-email">
              <div class="message-container">
              <label for="email">이메일 *</label>
              <div v-if="emailTouched && emailError" class="error-message">올바른 이메일 형식을 입력해주세요.</div>
              </div>
              <input type="text" id="email" required v-model="formData.userEmail" @blur="checkEmail" placeholder="이메일 입력" />
            </div>
          <div class="right-email">
          <div class="blank"></div>
            <button type="button" @click="" class="auth">인증</button>
          </div>
        </div>
      </div>
  
        <div class="password-form">
          <label for="password">비밀번호 *</label>
          <input type="password" id="password" required v-model="formData.userPassword" placeholder="비밀번호 입력" />
        </div>
  
          <div class="name-form">
            <label for="name">이름 *</label>
            <input type="text" required v-model="formData.userName" id="name" placeholder="이름 입력" />
          </div>
  
          <div class="phonenumber-form">
            <label for="phonenumber">전화번호 *</label>
            <input type="text" id="phonenumber" required v-model="formData.userPhone" placeholder="전화번호 입력" />
          </div>
  
          <div class="nickname-form">
            <label for="nickname">닉네임 *</label>
            <input type="text" id="nickname" required v-model="formData.userNickname" placeholder="닉네임 입력" />
          </div>

          <button type="submit" class="next-btn">다음</button>
      </form>
    </div>
</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  // 폼 데이터 상태
const formData = ref({
  userEmail: '',
  userPassword: '',
  userName: '',
  userPhone: '',
  userNickname: ''
});

const emailError = ref(false); // 이메일 형식 오류 상태
const emailTouched = ref(false); // 이메일 입력 폼이 처음 선택되었는지 확인

// 이메일 유효성 검사 함수
const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 검사용 정규 표현식
  return emailPattern.test(email);
};

// 이메일 입력 필드를 벗어났을 때 유효성 검사
const checkEmail = () => {
  emailTouched.value = true; // 입력 필드를 벗어났음을 표시
  if (!validateEmail(formData.value.userEmail)) {
    emailError.value = true; // 이메일이 유효하지 않으면 오류 상태를 true로 설정
  } else {
    emailError.value = false; // 유효한 이메일이면 오류 상태를 false로 설정
  }
};

// setup에서 emit을 인자로 받아옵니다
const emit = defineEmits(['nextStep']); // 이벤트 정의

// 폼 제출 함수
const next = () => {
  if (emailError.value) {
    return;
  }
  emit('nextStep', formData.value); // 부모 컴포넌트로 데이터 전달
};
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

  * {
    font-family: 'Inter', sans-serif;
  }
  .outer-container {
    width: 100vw;
    height: calc(100vh - 65px);;
    display: flex;
    justify-content: center;
    align-items: center;
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

  #email, #password, #name, #phonenumber, #nickname {
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 15px;
    width: 320px;
  }

  #email {
    margin-bottom: 5px;
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

  #email {
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

  .error-message {
  color: red;
  font-size: 12px;
  margin-left: 10px;
}

  .email-message {
    display: flex;
    flex-direction: column;
  }

  .email-container {
    margin-bottom: 15px;
  }

  .message-container {
    display: flex;
  }
  </style>
  