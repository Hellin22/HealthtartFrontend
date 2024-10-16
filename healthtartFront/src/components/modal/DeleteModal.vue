<template>
    <div class="modal-overlay" v-if="isOpen">
      <div class="modal-content">
        <div class="modal-header">
          <button class="close-btn" @click="closeModal">✖</button>
        </div>
        <div class="modal-body">삭제하시겠습니까?</div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeModal">취소</button>
          <button class="confirm-btn" @click="confirmDeletion">확인</button>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    isOpen: Boolean
});

const emit = defineEmits(['close', 'confirm']);

const closeModal = () => {
    emit('close');
};

const confirmDeletion = () => {
    emit('confirm');
    closeModal();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(193, 193, 193, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 10px;
  width: 300px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-header {
  background-color: #000000;
  padding: 10px;
  text-align: right;
}

.close-btn {
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  padding: 30px 20px;
  background-color: #ffffff;
  font-size: 18px;
  margin: 0;
  word-break: keep-all;
  color: #000000;
  text-align: center;
  font-weight: bold;
}

.modal-actions {
  display: flex;
  border-top: 1px solid #e0e0e0;
}

.cancel-btn,
.confirm-btn {
  flex: 1;
  padding: 15px 0;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: #ffffff;
}

.cancel-btn {
  border-right: 1px solid #e0e0e0;
  color: #000000;
}

.confirm-btn {
  color: #ff0000;
}

.cancel-btn:hover {
    background-color: #e0e0e0;
}

.confirm-btn:hover {
  background-color: #ff0000;
  color : white;
}

</style>