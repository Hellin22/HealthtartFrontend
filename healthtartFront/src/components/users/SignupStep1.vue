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
              <div class="email-input-group">
                <input type="text" id="email" required v-model="formData.userEmail" @blur="checkEmail" placeholder="이메일 입력" />
                <button type="button" @click="sendVerificationEmail" class="auth" :disabled="emailError || !formData.userEmail || isEmailSent">
                  인증
                </button>
              </div>
              
              <div class="verification-form">
                <label for="verificationCode">인증번호 *</label>
                <div class="verification-input-group">
                  <input type="text" id="verificationCode" placeholder="   5분내로 인증번호를 입력해주세요" v-model="verificationCode"
                    :disabled="!isEmailSent" />
                  <button type="button" @click="verifyCode" class="auth" :disabled="!isEmailSent || isVerified">
                    확인
                  </button>
                </div>
              </div>
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

        <!-- "다음" 버튼은 인증 완료 시에만 활성화 -->
        <button type="submit" class="next-btn" :disabled="!isVerified">다음</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// 폼 데이터 상태
const formData = ref({
  userEmail: '',
  userPassword: '',
  userName: '',
  userPhone: '',
  userNickname: ''
});

const verificationCode = ref('');
const isEmailSent = ref(false);
const isVerified = ref(false);
const emailError = ref(false);
const emailTouched = ref(false);

// 이메일 유효성 검사 함수
const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// 이메일 입력 필드를 벗어났을 때 유효성 검사
const checkEmail = () => {
  emailTouched.value = true;
  if (!validateEmail(formData.value.userEmail)) {
    emailError.value = true;
  } else {
    emailError.value = false;
  }
};

// 인증 메일 전송
const sendVerificationEmail = async () => {
  if (!emailError.value && formData.value.userEmail) {
    try {
      // 인증 메일 전송 요청
      const response = await axios.post('http://localhost:8080/users/verification-email', {
        email: formData.value.userEmail
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      // HTTP 상태 코드가 200일 때
      if (response.status === 200) {
        alert('인증번호를 전송하였습니다.');
        isEmailSent.value = true;
      }
    } catch (error) {
      // 상태 코드가 200이 아닌 경우 또는 오류가 발생했을 때
      alert('인증번호 전송에 실패했습니다.');
      console.error('Error:', error);
    }
  }
};




// 인증번호 확인
const verifyCode = async () => {
  if (verificationCode.value) {
    try {
      // 인증 메일 전송 요청
      const response = await axios.post('http://localhost:8080/users/verification-email/confirmation', {
        email: formData.value.userEmail,
        code: verificationCode.value
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('인증번호 확인이 완료되었습니다.');
        isVerified.value = true;
      }
    } catch (error) {
      alert('인증번호 확인에 실패했습니다.');
      console.error('Error:', error);
    }
  }
};

// 폼 제출 함수
const emit = defineEmits(['nextStep']);
const next = () => {
  if (emailError.value || !isVerified.value) {
    alert('이메일 인증이 필요합니다.');
    return;
  }
  emit('nextStep', formData.value);
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

  .left-email, .password-form, .name-form, .phonenumber-form, .nickname-form {
    display: flex;
    flex-direction: column;
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

  .email-input-group, .verification-input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.email-input-group input, .verification-input-group input {
  flex: 1;
  width: auto;
}

.auth {
  width: 60px;
  height: 40px; /* 높이를 input과 맞춤 */
  flex-shrink: 0;
}

#email, #verificationCode {
  flex: 1;
}

  
  </style>
  