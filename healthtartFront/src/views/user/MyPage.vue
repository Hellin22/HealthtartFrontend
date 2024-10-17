<template>
  <div class="mypage-layout">
    <SideMenu />
    <main class="mypage-content" v-if="formData">
      <BackGround class="background-component"/>
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
          <input type="text" id="height" v-model="formData.height" />
        </div>
        <div class="form-group">
          <label for="weight">몸무게</label>
          <input type="text" id="weight" v-model="formData.weight" />
        </div>
        <div class="button-group">
          <button class="inbody-btn" @click="openInbodyModal">내 인바디 등록</button>
          <button class="edit-btn" @click="goToEditPage">수정</button>
        </div>
      </form>
      <div class="mypage-separator"></div>
      <RegisterInbodyModal :isOpen="isInbodyModalOpen" :closeModal="closeInbodyModal" />
      <div class="extra-content">
        <div class="extra-section">
          <div class="extra-button-group">
            <span class="label-text">등록 헬스장</span>
          </div>
          <div v-if="selectedGym" class="selected-gym">
            <div class="gym-info new-design">
              <div class="new-design-header">
                <img src="@/assets/icons/gym.svg" alt="헬스장" class="gymicon new-design-icon" />
                <h3 class="new-design-title">{{ selectedGym.name }}</h3>
              </div>
              <div class="new-design-actions">
                <button class="new-design-action-btn" @click="showGymEquipment">운동기구 보기</button>
                <button class="new-design-action-btn" @click="showGymAddress">주소 보기</button>
              </div>
            </div>
          </div>
        </div>
        <div class="extra-section">
          <div class="extra-button-group">
            <span class="label-text">등록 라이벌</span>
          </div>
          <div v-if="registeredRivals.length > 0" class="selected-rival">
            <div class="rival-info new-design">
              <div class="new-design-header-rival">
                <img src="@/assets/icons/usericon.svg" alt="유저" class="usericon new-design-icon" />
                <h3 class="new-design-title">{{ registeredRivals[registeredRivals.length - 1] }}</h3>
              </div>
              <div class="new-design-actions">
                <button class="new-design-action-btn">운동기록 보기</button>
                <button class="new-design-action-btn">인바디 보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <RightSide />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import { useRouter } from 'vue-router';
import BackGround from '@/components/BackGround.vue';
import '@/assets/css/user/MyPage.css';
import RegisterInbodyModal from '@/components/modal/inbody/RegisterInbodyModal.vue';
import SideMenu from '@/components/SideMenu.vue';
import RightSide from '@/components/RightSide.vue';

const router = useRouter();
const formData = ref(null);
const selectedGym = ref(null);
const registeredRivals = ref([]);
const isInbodyModalOpen = ref(false);

provide('selectedGym', selectedGym);
provide('registeredRivals', registeredRivals);

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

const goToEditPage = () => {
  router.push('/mypage/edit');
};

const openInbodyModal = () => {
  isInbodyModalOpen.value = true;
};

const closeInbodyModal = () => {
  isInbodyModalOpen.value = false;
};
</script>
