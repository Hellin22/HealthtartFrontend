<template>
    <div class="inbody-modal-overlay" v-if="isOpen">
      <div class="inbody-modal-content">
        <h2 class="registerinbodytitle">인바디 등록</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label class="lablefirst" for="inbodyImage">인바디 이미지 업로드:</label>
            <input type="file" id="inbodyImage" @change="onFileChange" accept="image/*" />
          </div>
          <div v-if="imageUrl" class="image-preview-container">
            <img :src="imageUrl" alt="Preview" class="image-preview" />
          </div>
          <div class="inbody-btn-group">
            <button type="submit" class="submit-btn" :disabled="!imageUrl">등록</button>
            <button type="button" class="cancel-btn" @click="closeModal">취소</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const props = defineProps({
    isOpen: Boolean,
    closeModal: Function,
  });
  
  const router = useRouter();
  const imageUrl = ref(null);
  
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrl.value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = () => {
    alert('인바디 이미지가 등록되었습니다!');
    props.closeModal();
    router.push('/mypage'); // MyPage로 이동
  };
  </script>
  
  <style scoped>
  .inbody-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(193, 193, 193, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .inbody-modal-content {
    background: rgb(0, 0, 0);
    padding: 20px;
    border-radius: 10px;
    width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .registerinbodytitle {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .image-preview {
    max-width: 100%;
    margin-top: 10px;
    margin-right: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .lablefirst {
    width: 170px;
  }
  
  .inbody-btn-group {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
  }
  
  .submit-btn {
    background-color: #00ffff;
    color: #000;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .cancel-btn {
    background-color: #f44336;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 20px;
  }

  .image-preview-container {
  margin-top: 20px;
  text-align: center;
}

.image-preview {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
  </style>
  