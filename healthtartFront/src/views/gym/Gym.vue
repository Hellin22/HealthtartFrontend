<template>
    <BackGround />
    <div class="gym-container">
      <div class="gym-header">
        <h1 class="gym-title">{{ gymName }}</h1>
        <h2 class="equipment-title">보유 운동기구</h2>
      </div>
      <div class="equipment-table">
        <div class="table-header">
          <div v-for="category in categories" :key="category" class="header-item">{{ category }}</div>
        </div>
        <div class="table-body">
          <div v-for="i in maxEquipmentCount" :key="i" class="table-row">
            <div v-for="category in categories" :key="category" class="table-cell">
              <button
                v-if="gymEquipment[category][i - 1]"
                class="equipment-button"
                @click="showEquipmentInfo(gymEquipment[category][i - 1])"
              >
                {{ gymEquipment[category][i - 1] }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        v-if="selectedEquipment"
        :equipment="selectedEquipment"
        :equipmentImage="getEquipmentImage(selectedEquipment)"
        @close="closeEquipmentModal"
        @confirm="closeEquipmentModal"
      />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import '@/assets/css/gym/Gym.css';
import BackGround from '@/components/BackGround.vue';
import Modal from '@/components/modal/exerciseequipment/EquipmentInfoModal.vue';

const emit = defineEmits(['loginSuccess']);

const gymName = ref('유씨네 헬스장');
const gymEquipment = ref({
  등: ['등기구1', '등기구2', '등기구3'],
  가슴: ['가슴기구1', '가슴기구2', '가슴기구3'],
  어깨: ['어깨기구1', '어깨기구2', '어깨기구3'],
  코어: ['코어기구1', '코어기구2', '코어기구3'],
  삼두: ['삼두기구1', '삼두기구2', '삼두기구3'],
  하체: ['하체기구1', '하체기구2', '하체기구3'],
  유산소: ['유산소기구1', '유산소기구2', '유산소기구3'],
  전완근: ['전완근기구1', '전완근기구2', '전완근기구3'],
  이두: ['이두기구1', '이두기구2', '이두기구3'],
});

const categories = computed(() => Object.keys(gymEquipment.value));
const maxEquipmentCount = computed(() => {
  return Math.max(...Object.values(gymEquipment.value).map(arr => arr.length));
});

const selectedEquipment = ref(null);

const showEquipmentInfo = (equipment) => {
  selectedEquipment.value = {
    name: equipment,
    part: '예시 부위', // 실제 데이터로 교체 필요
    videoUrl: 'https://www.youtube.com/watch?v=example', // 실제 URL로 교체 필요
    description: '이 운동기구에 대한 설명입니다.' // 실제 설명으로 교체 필요
  };
};

const closeEquipmentModal = () => {
  selectedEquipment.value = null;
};

const getEquipmentImage = (equipment) => {
  // 여기에 실제 이미지 URL을 반환하는 로직 구현
  return 'path/to/default/image.jpg';
};
</script>
