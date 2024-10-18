<template>
    <div class="outer-container">
      <div class="form-container">
        <div class="inner-container">
          <form @submit.prevent="loginUser">

            <div class="email">
                <div class="login-message-container">
                <label for="email">이메일</label>
                <div v-if="emailTouched && emailError" class="error-message">{{ errorMessage }}</div>
                </div>
                <input type="email" id="email" required v-model="formData.userEmail" @blur="checkEmail" placeholder="이메일 입력" />
            </div>
  
        <div class="password">
          <label for="password">비밀번호</label>
          <input type="password" id="password" required @keyup.enter ="loginUser" v-model="formData.userPassword" placeholder="비밀번호 입력" />
        </div>

        <div class="login-buttons">
          <button type="button" @click="loginUser" class="login">로그인</button>
          <button type="button" @click="kakaoLogin" class="kakao">카카오 로그인</button>
          <button type="button" @click="googleLogin" class="google">구글 로그인</button>
        </div>

        <div class="finds">
          <div class="find-email">이메일 찾기</div>
          <div>|</div>
          <div class="find-password" @click="goToPasswordReset">비밀번호 재설정</div>
          <div>|</div>
          <div class="signup" @click="goToSignup">회원가입</div>
        </div>
      </form>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const formData = ref({
  userEmail: '',
  userPassword: ''
});

const router = useRouter();

// emit 인자로 받음
const emit = defineEmits(['loginSuccess'])


const errorMessage = ref('');
const emailError = ref(false); // 이메일 형식 오류 상태
const emailTouched = ref(false); // 이메일 입력 폼이 처음 선택되었는지 확인

 // loginState를 inject
 const loginState = inject('loginState');

// 이메일 유효성 검사 함수
const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// 이메일 입력 필드를 벗어났을 때 유효성 검사
const checkEmail = () => {
  emailTouched.value = true; // 입력 필드를 벗어났음을 표시
  if (!validateEmail(formData.value.userEmail)) {
    emailError.value = true; // 이메일이 유효하지 않으면 오류 상태를 true로 설정
    errorMessage.value = "올바른 이메일 형식을 입력해주세요.";  
} else {
    emailError.value = false; // 유효한 이메일이면 오류 상태를 false로 설정
  }
};

// 로그인 함수
const loginUser = async () => {

    try {
    const response = await axios.post('http://localhost:8080/users/login', {
      userEmail: formData.value.userEmail,
      userPassword: formData.value.userPassword
    }, {
        headers: {
          'Content-Type': 'application/json',
        }
    });

    console.log('HTTP 응답 상태 코드:', response.status);
    console.log('전체 응답 데이터:', response);

    const token = response.headers['authorization'];
    if (token) {
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);

      console.log('Decoded JWT Token:', decodedToken);
      
      // loginState 업데이트
      loginState.state.isLoggedIn = true;
      loginState.state.userNickname = decodedToken.nickname;
      
      console.log('Login successful:', decodedToken.nickname);
      
      // 로그인 성공 이벤트 발생
      emit('loginSuccess', decodedToken.nickname);  // 부모 컴포넌트로 로그인 상태 전달
    } else {
      errorMessage.value = '인증 토큰이 없습니다. 로그인 실패';
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    errorMessage.value = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
  }
};

const goToSignup = () => {
  router.push('/users/signup'); // /users/signup 경로로 이동
}

const goToPasswordReset = () => {
  router.push('/users/password'); // /users/password 경로로 이동
};


const kakaoLogin = () => {
  window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
};


const googleLogin = () => {
  window.location.href = 'http://localhost:8080/oauth2/authorization/google';
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.outer-container {
  width: 100%;
  height: calc(100vh - 65px);;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
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

.email, .password {
  display: flex;
  flex-direction: column;
}

.login-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin-bottom: 15px;
}

.login, .kakao, .google {
  font-size: 14px;
  width: 280px;
  height: 40px;
  border-radius: 12px;
  border-style: none;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
}

.login {
  background-color: #01FDFE;
}

.kakao {
  background-color: #FEE500;
}

.google {
  background-color: #FFFFFF;
}

.login:hover {
  background-color: #1DEBEC;
  box-shadow: none;
  cursor: pointer;
}

.kakao:hover {
  background-color: #EAD515;
  box-shadow: none;
  cursor: pointer;
}

.google:hover {
  background-color: #EAEAEA;
  box-shadow: none;
  cursor: pointer;
}

.find-email, .find-password, .signup:hover {
  cursor: pointer;
}

label {
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: bold;
}

#email, #password {
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  width: 320px;
}

#password {
    margin-bottom: 25px;
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

.finds {
  display: flex;
  justify-content: space-evenly;
  font-size: 12px;
  color: #767676;
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

.login-message-container {
    display: flex;
}
</style>