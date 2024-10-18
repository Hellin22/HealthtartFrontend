<template>
    <div class="modal-overlay" v-if="isOpen">
      <div class="rival-modal-content">
        <h2 class="modal-title">라이벌 등록</h2>
        <div class="input-container">
          <input type="text" v-model="rivalName" placeholder="라이벌 닉네임" class="modal-input" />
        </div>
        <div class="modal-actions">
          <button class="modal-cancel-btn" @click="closeModal">취소</button>
          <button class="modal-confirm-btn" @click="registerRival">등록</button>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const rivalName = ref('');
const props = defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(['close', 'register']);

const closeModal = () => {
  emit('close');
};

const registerRival = () => {
  if (rivalName.value) {
    emit('register', rivalName.value);
    rivalName.value = '';
    closeModal();
  }
};
</script>
  
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.rival-modal-content {
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  width: 300px;
  text-align: center;
}

.modal-title {
  font-size: 20px;
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
}

.modal-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 10px;
  background-color: transparent;
  color: #ffffff;
  font-size: 16px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-cancel-btn, .modal-confirm-btn {
  padding: 6px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.modal-cancel-btn {
  background-color: #cccccc;
  color: #000000;
}

.modal-confirm-btn {
  background-color: #00ffff;
  color: #000000;
}
</style>
