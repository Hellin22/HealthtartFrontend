<template>
    <div class="mypage-layout">
      <SideMenu />
      <main class="mypage-content" v-if="formData">
        <img src="@/assets/icons/blueLabelFirst.svg" alt="블루라벨1" class="blue-label blue-label-left" />
        <img src="@/assets/icons/blueLabelSecond.svg" alt="블루라벨2" class="blue-label blue-label-right" />
        <h2 class="last-updated">마지막으로 수정한 날짜: {{ formData.lastUpdated }}</h2>
        <form class="mypage-form" @submit.prevent="updateProfile">
          <div class="form-group">
            <label for="name">이름</label>
            <input type="text" id="name" v-model="formData.name" />
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <input type="text" id="email" v-model="formData.email" />
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="formData.password" />
          </div>
          <div class="form-group">
            <label for="phone">전화번호</label>
            <input type="text" id="phone" v-model="formData.phone" />
          </div>
          <div class="form-group">
            <label for="nickname">닉네임</label>
            <input type="text" id="nickname" v-model="formData.nickname" />
          </div>
          <div class="form-group">
            <label for="gender">성별</label>
            <input type="text" id="gender" v-model="formData.gender" />
          </div>
          <div class="form-group">
            <label for="height">키</label>
            <input type="text" id="height" v-model="formData.height" placeholder="?" />
          </div>
          <div class="form-group">
            <label for="weight">몸무게</label>
            <input type="text" id="weight" v-model="formData.weight" placeholder="?" />
          </div>
          <button class="update-btn">수정</button>
        </form>
        <div class="separator"></div>
        <div class="extra-content">
          <div class="extra-section">
            <div class="extra-button-group">
              <button class="add-gym-btn">등록 헬스장</button>
              <button class="add-btn">추가</button>
            </div>
          </div>
          <div class="extra-section">
            <div class="extra-button-group">
              <button class="add-rival-btn">등록 라이벌</button>
              <button class="add-btn">추가</button>
            </div>
          </div>
        </div>
      </main>
      <RightSide />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import SideMenu from '@/components/SideMenu.vue';
  import RightSide from '@/components/RightSide.vue';
  import '@/assets/css/user/MyPage.css';
  
  const formData = ref(null);
  
  onMounted(() => {
    formData.value = {
      name: '이나현',
      email: 'nazzang02@gmail.com',
      password: '***********************',
      phone: '010-1234-5678',
      nickname: '이나짱',
      gender: '여',
      height: '?',
      weight: '?',
      lastUpdated: '2024-09-20 19:24:40'
    };
  });
  
  const updateProfile = () => {
    if (formData.value) {
      console.log('프로필 수정 요청: ', formData.value);
      alert('프로필이 업데이트되었습니다!');
    }
  };
  </script>