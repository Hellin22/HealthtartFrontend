<template>
  <div class="addinfo-outer-container">
    <div class="addinfo-form-container">
      <div class="addinfo-inner-container">
        <form @submit.prevent="submitAddinfo">
          <div class="addinfo-phone-form">
            <label for="phone"> 전화번호 *</label>
            <input type="string" id="phone" required v-model="formData.userPhone" placeholder="전화번호 입력" />
          </div>
          <div class="addinfo-nickname-form">
            <label for="nickname"> 닉네임 *</label>
            <input type="string" id="nickname" required v-model="formData.userNickname" placeholder="닉네임 입력" />
            <!-- 닉네임은 중복되지 않도록 유효성 검사 실행 -->
          </div>
          <div class="addinfo-postalCode-form">
            <div class="left-postalcode">
              <label for="postalCode"> 주소 (우편번호) *</label>
              <input type="number" id="postalCode" required v-model="formData.postalCode" placeholder="우편번호 입력" />
            </div>
            <div class="right-postalcode">
              <div class="blank"></div>
              <button type="button" @click="" required class="search">검색</button>
            </div>
          </div>
  
        <div class="address-form">
          <label for="detailAddress">주소 (상세주소) *</label>
          <input type="text" id="detailAddress" required v-model="formData.detailAddress" placeholder="상세주소 입력" />
        </div>

        <div class="physical-info">
          <div class="height-form">
            <label for="height">키 (cm) *</label>
            <input type="number" id="height" required min="0" step="0.1" v-model="formData.userHeight" placeholder="키 입력" />
          </div>

          <div class="weight-form">
            <label for="weight">몸무게 (kg) *</label>
            <input type="number" id="weight" required min="0" step="0.1" v-model="formData.userWeight" placeholder="몸무게 입력" />
          </div>

          <div class="gender-form">
            <label for="gender">성별 *</label>
            <select v-model="formData.userGender" required id="gender" placeholder="성별 선택">
              <option value="M">남자</option>
              <option value="F">여자</option>
            </select>
          </div>
        </div>
        <div class="personal-info">
          
  
          <div class="age-form">
            <label for="age">나이 *</label>
            <input type="number" id="age" min="0" required v-model="formData.userAge" placeholder="나이 입력" />
          </div>

          <div class="gym-form">
            <label for="gym">헬스장</label>
            <input type="text" id="gym" v-model="formData.gymCode" placeholder="헬스장 검색" />
          </div>
        </div>

          <button type="submit" class="addinfo-done">입력 완료</button>
      </form>
    </div>
    </div>
</div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();

  // 폼 데이터 상태
const formData = ref({
  userPhone: '',
  userNickname: '',
  userAddress: '',
  userGender: '',
  userAge: '',
  userHeight: '',
  userWeight: '',
  gymCode: ''
});

console.log(formData.value);

// setup에서 emit을 인자로 받아옵니다
const emit = defineEmits(['submit']); // 이벤트 정의

// 최종 제출 함수
const submitAddinfo = () => {
  formData.value.userAddress = `${formData.value.postalCode} ${formData.value.detailAddress}`;

    // LocalStorage에서 추가 정보를 가져옵니다
  const token = localStorage.getItem('token'); 
  // 토큰은 안줘도 됩니다.
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const provider = localStorage.getItem('provider');
  const providerId = localStorage.getItem('providerId');

  // 추가 정보를 formData에 추가
  const finalData = {
    ...formData.value,
    token,
    userName,
    userEmail,
    provider,
    providerId
  };

  emit('submit', finalData); // 부모 컴포넌트로 데이터 전달
};
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

  * {
    font-family: 'Inter', sans-serif;
  }
  .addinfo-outer-container {
    width: 100vw;
    height: calc(100vh - 65px);;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .inner-container {

  }

  .addinfo-form-container {
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

  .addinfo-postalCode-form {
    display: flex;
    justify-content: space-between;
  }

  .left-postalcode, .right-postalcode, .addinfo-nickname-form, .addinfo-phone-form, .address-form, .height-form, .weight-form, .gender-form, .age-form, .gym-form {
    display: flex;
    flex-direction: column;
  }

  .blank {
    margin-top: 26.4px;
  }

  label {
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  #phone, #nickname, #postalCode, #detailAddress, #gender, #age, #weight, #height, #gym {
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 15px;
    width: 320px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  input, select {
    font-size: 14px;
    width: 300px;
    height: 40px;
    border-radius: 12px;
    border-style: none;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  }

  #postalCode {
    width: 250px;
  }

  .search {
    background-color: #01FDFE;
    width: 60px;
    height: 35px;
    border-style: none;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    font-weight: bold;
  }

  .search:hover {
    background-color: #1DEBEC;
    box-shadow: none;
    cursor: pointer;
  }

  .addinfo-done {
    background-color: #01FDFE;
    width: 320px;
    height: 45px;
    border-radius: 20px;
    border-style: none;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); 
    font-weight: bold;
    margin-top: 10px;
  }

  .addinfo-done:hover {
    background-color: #1DEBEC;
    box-shadow: none;
    cursor: pointer;
  }

  .physical-info {
    display: flex;
    justify-content: space-between;
  }

  .height-form, .weight-form, .gender-form {
    display: flex;
    flex-direction: column;
  }

  #height, #weight, #gender {
    width: 100px;
  }

  .personal-info {
    display: flex;
    justify-content: space-between;
  }

  #age, #gym {
    width: 150px;
  }
  </style>
  