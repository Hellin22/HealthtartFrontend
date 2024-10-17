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
          <button class="update-btn" type="submit">완료</button>
        </form>
        <div class="mypage-edit-separator"></div>
        <div class="extra-content">
          <div class="extra-section">
            <div class="extra-button-group">
              <span class="label-text">등록 헬스장</span>
              <button class="add-btn" @click="openGymModal">추가</button>
              <button v-if="selectedGym" @click="confirmDelete('gym')" class="remove-btn">삭제</button>
            </div>
            <div v-if="selectedGym" class="selected-gym">
              <div class="gym-info new-design">
                <div class="new-design-header">
                  <img src="@/assets/icons/gym.svg" alt="헬스장" class="gymicon new-design-icon" />
                  <h3 class="new-design-title">{{ selectedGym.name }}</h3>
                </div>
                <div class="new-design-actions">
                  <button class="new-design-action-btn">운동기구 보기</button>
                  <button class="new-design-action-btn">주소 보기</button>
                </div>
              </div>
            </div>
          </div>
          <div class="extra-section">
            <div class="extra-button-group">
              <span class="label-text">등록 라이벌</span>
              <button class="add-btn" @click="openRivalModal">추가</button>
              <button v-if="registeredRivals.length > 0" @click="confirmDelete('rival')" class="remove-btn">삭제</button>
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
      <RegisterGymModal 
        :isOpen="isGymModalOpen" 
        @close="closeGymModal"
        @selectGym="handleGymSelection"
      />
      <RegisterRivalModal 
        :isOpen="isRivalModalOpen" 
        @close="closeRivalModal"
        @register="handleRivalRegistration"
      />
      <DeleteModal 
        :isOpen="isDeleteModalOpen"
        @close="closeDeleteModal"
        @confirm="deleteItem"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import SideMenu from '@/components/SideMenu.vue';
  import RightSide from '@/components/RightSide.vue';
  import BackGround from '@/components/BackGround.vue';
  import RegisterGymModal from '@/components/modal/gym/RegisterGymModal.vue';
  import RegisterRivalModal from '@/components/modal/rival/RegisterRivalModal.vue';
  import DeleteModal from '@/components/modal/DeleteModal.vue';
  import '@/assets/css/user/MyPageEdit.css';
  
  const router = useRouter();
  const formData = ref(null);
  const isGymModalOpen = ref(false);
  const isRivalModalOpen = ref(false);
  const isDeleteModalOpen = ref(false);
  const selectedGym = inject('selectedGym', ref(null));
  const registeredRivals = inject('registeredRivals', ref([]));
  let itemToDelete = ref('');
  
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
      selectedGym.value = selectedGym.value; // Maintain gym data
      alert('프로필이 업데이트되었습니다!');
      
      // Update registered rivals if they were added in the edit page
      // Example: if a new rival is added, you might want to do that here
      router.push('/mypage');
    }
  };
  
  const openGymModal = () => {
    isGymModalOpen.value = true;
    document.body.style.overflow = 'hidden';
  };
  
  const closeGymModal = () => {
    isGymModalOpen.value = false;
    document.body.style.overflow = '';
  };
  
  const handleGymSelection = (gym) => {
    selectedGym.value = gym;
    closeGymModal();
  };
  
  const openRivalModal = () => {
    isRivalModalOpen.value = true;
    document.body.style.overflow = 'hidden';
  };
  
  const closeRivalModal = () => {
    isRivalModalOpen.value = false;
    document.body.style.overflow = '';
  };
  
  const handleRivalRegistration = (rivalName) => {
    registeredRivals.value.push(rivalName);
  };
  
  const confirmDelete = (itemType) => {
    itemToDelete.value = itemType;
    isDeleteModalOpen.value = true;
  };
  
  const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
  };
  
  const deleteItem = () => {
    if (itemToDelete.value === 'gym' && selectedGym.value) {
      selectedGym.value = null;
    } else if (itemToDelete.value === 'rival' && registeredRivals.value.length > 0) {
      registeredRivals.value.pop();
    }
    closeDeleteModal();
  };
  </script>
  