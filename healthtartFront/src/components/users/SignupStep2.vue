<template>
    <div class="outer-container">
    <div class="form-container">
        <div class="inner-container">
      <form @submit.prevent="submitForm">
        <div class="postalcode-form">
            <div class="left-postalcode">
                <label for="postalCode"> 주소 (우편번호) *</label>
                <input type="number" id="postalCode" required v-model="formData.postalCode" placeholder="우편번호 입력" />
            </div>
            <div class="right-postalcode">
                <div class="blank">
                </div>
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
            <input type="number" id="age" required v-model="formData.userAge" placeholder="나이 입력" />
          </div>

          <div class="gym-form">
            <label for="gym">헬스장</label>
            <input type="text" id="gym" v-model="formData.gymCode" placeholder="헬스장 검색" />
          </div>
        </div>

          <button type="submit" class="submit-btn">가입</button>
      </form>
    </div>
    </div>
</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  // 폼 데이터 상태
const formData = ref({
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
const submitForm = () => {
  formData.value.userAddress = `${formData.value.postalCode} ${formData.value.detailAddress}`;
  emit('submit', formData.value); // 부모 컴포넌트로 데이터 전달
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

  .postalcode-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-postalcode, .right-postalcode, .address-form, .height-form, .weight-form, .gender-form, .age-form, .gym-form {
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

  #postalCode, #detailAddress, #gender, #age, #weight, #height, #gym {
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

  .submit-btn {
    background-color: #01FDFE;
    width: 320px;
    height: 45px;
    border-radius: 20px;
    border-style: none;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); 
    font-weight: bold;
    margin-top: 10px;
  }

  .submit-btn:hover {
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
  