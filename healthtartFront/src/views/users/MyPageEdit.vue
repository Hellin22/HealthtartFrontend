<template>
  <div class="mypageedit-layout">
    <MyPageSideMenu />
    <main class="mypageedit-content" v-if="formData">
      <BackGround class="background-component" />
      <h2 class="last-updated">마지막으로 수정한 날짜: {{ formData.updatedAt }}</h2>
      <form class="mypageedit-form" @submit.prevent="updatePassword">
        <div class="mypageedit-form-group">
          <label for="currentPassword">현재 비밀번호</label>
          <input class="mypageedit-input" type="password" id="currentPassword" v-model="currentPassword" required />
        </div>
        <div class="mypageedit-form-group">
          <label></label>
        </div>
        <div class="mypageedit-form-group">
          <label for="newPassword">새 비밀번호</label>
          <input class="mypageedit-input" type="password" id="newPassword" v-model="newPassword" required />
        </div>
        <div class="mypageedit-form-group">
          <label for="confirmPassword">비밀번호 확인</label>
          <input class="mypageedit-input" type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <button class="update-btn" type="submit">완료</button>
      </form>
      <div class="mypageedit-separator"></div>
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
                <h3 class="new-design-title">{{ selectedGym.gymName }}</h3>
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
    </main>
    <RightSide />
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import RightSide from '@/components/RightSide.vue';
import BackGround from '@/components/BackGround.vue';
import RegisterGymModal from '@/components/modal/gym/RegisterGymModal.vue';
import RegisterRivalModal from '@/components/modal/rival/RegisterRivalModal.vue';
import DeleteModal from '@/components/modal/DeleteModal.vue';
import '@/assets/css/user/MyPageEdit.css';
import MyPageSideMenu from '../../components/MyPageSideMenu.vue';
import { jwtDecode } from 'jwt-decode';

const router = useRouter();
const formData = ref(null);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const deleteType = ref(null);
const isGymModalOpen = ref(false);
const isRivalModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedGym = inject('selectedGym', ref(null));
const registeredRivals = inject('registeredRivals', ref([]));

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/users/mypage', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    formData.value = response.data;

    if (response.data.gymCode && response.data.gymName) {
      selectedGym.value = {
        gymCode: response.data.gymCode,
        gymName: response.data.gymName,
      };
    } else {
      selectedGym.value = null;
    }

  } catch (error) {
    console.error('Error fetching User data:', error);
  }
};

onMounted(() => {
  fetchUserData();
});

const confirmDelete = (type) => {
  deleteType.value = type;
  isDeleteModalOpen.value = true;
};

const deleteItem = (type) => {
  if (type === 'gym') {
    selectedGym.value = null;
  } else if (type === 'rival') {
    registeredRivals.value.pop();
  }
  isDeleteModalOpen.value = false;
};

const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('새 비밀번호가 일치하지 않습니다.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch('http://localhost:8080/users/mypage/edit/password', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      alert(response.data.message);
      router.push({ name: 'MyPage' });
    }
  } catch (error) {
    console.error('Error updating password:', error);
    if (error.response && error.response.status === 400) {
      alert('현재 비밀번호가 올바르지 않습니다.');
    } else {
      alert('비밀번호 변경에 실패했습니다.');
    }
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
  registerGym();
  closeGymModal();
};

const registerGym = async () => {
  try {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userCode = decodedToken.sub;

    const response = await axios.post('http://localhost:8080/users/register-gym', {
      userCode: userCode,
      businessNumber: selectedGym.value.businessNumber,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      alert('헬스장이 성공적으로 등록되었습니다.');

      router.push({
        name: 'MyPage',
        params: {
          updatedData: formData.value,
          selectedGym: selectedGym.value
        }
      });
    }
  } catch (error) {
    console.error('헬스장 등록 중 오류가 발생했습니다:', error);
    alert('헬스장 등록에 실패했습니다.');
  }
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

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
};
</script>
