<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <div class="modal-header">
          <img :src="equipmentImage" alt="운동기구 이미지" class="equipment-image" />
          <div class="equipment-details">
            <div class="detail-row">
              <span class="detail-label">운동기구 명</span>
              <span class="detail-value">{{ equipmentName }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">운동 부위</span>
              <span class="detail-value">{{ equipmentPart }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">추천 영상</span>
              <a :href="videoUrl" target="_blank" class="detail-value video-link">유튜브 링크</a>
            </div>
          </div>
        </div>
        <div class="modal-description">
          <p>운동 설명: {{ description }}</p>
        </div>
        <div class="modal-footer">
          <button @click="confirm" class="confirm-button">확인</button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  const props = defineProps({
    equipment: {
      type: Object,
      required: true,
    },
    equipmentImage: {
      type: String,
      required: true,
    },
  });
  
  const emit = defineEmits(['close', 'confirm']);
  
  const equipmentName = ref(props.equipment.name);
  const equipmentPart = ref(props.equipment.part);
  const videoUrl = ref(props.equipment.videoUrl);
  const description = ref(props.equipment.description);
  
  const close = () => {
    emit('close');
  };
  
  const confirm = () => {
    emit('confirm');
  };
  </script>
  
<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(193, 193, 193, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #1a1a1a;
    color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    height: auto;
  }
  
  .modal-header {
    display: flex;
    margin-bottom: 20px;
  }
  
  .equipment-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 20px;
  }
  
  .equipment-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .detail-label {
    font-weight: bold;
  }
  
  .detail-value {
    text-align: center;
  }
  
  .video-link {
    color: #ffffff;
    text-decoration: none;
  }
  
  .video-link:hover {
    text-decoration: underline;
  }
  
  .modal-description {
    margin-left: 20px;
    margin-top: 20px;
    font-weight: bold;
  }
  
  .modal-footer {
    margin-top: 50px;
    text-align: center;
  }
  
  .confirm-button {
    background-color: #00ffff;
    color: #1a1a1a;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .confirm-button:hover {
    background-color: #00cccc;
  }
  </style>