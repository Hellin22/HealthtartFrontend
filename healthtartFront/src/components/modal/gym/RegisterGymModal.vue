<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <h2 class="h2gymregister">헬스장 등록</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>헬스장 이름</th>
                <th>헬스장 주소</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="gym in paginatedGyms" :key="gym.id">
                <td>{{ gym.id }}</td>
                <td>{{ gym.name }}</td>
                <td>{{ gym.address }}</td>
                <td>
                  <button @click="selectGym(gym)" class="select-btn">선택</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="search-container">
          <input type="text" placeholder="헬스장 검색" v-model="searchQuery" @input="search" />
          <button class="search-btn" @click="search">검색</button>
        </div>
        <div class="pagination">
          <button class="prev-btn" @click="prevPage" :disabled="currentPage === 1">&lt;</button>
          <button 
            v-for="page in totalPages" 
            :key="page" 
            :class="{ active: currentPage === page }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <button class="next-btn" @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
        </div>
        <button class="close-btn" @click="closeModal">닫기</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineEmits } from 'vue';
  
  const props = defineProps({
    isOpen: Boolean,
  });
  
  const emit = defineEmits(['close', 'selectGym']);
  
  const searchQuery = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 5;
  
  const gyms = ref([
    { id: 1, name: '김가네 헬스장', address: '보라매로 삼도몰 73-21' },
    { id: 2, name: '최씨네 헬스장', address: '장미로 477번길 99' },
    { id: 3, name: '풀무원 헬스장', address: '인주대로 222 73' },
    { id: 4, name: '헬스타트', address: '마천동 케이타워 2424' },
    { id: 5, name: '인천 제군 헬스장', address: '스텐피현 245번길 19' },
    { id: 6, name: '안성 헬스장', address: '노른문 24455번길' },
    { id: 7, name: '장가 헬스장', address: '팔산 442-24' },
    { id: 8, name: '팽팽 헬스장', address: '평양 북더라만 24' },
    { id: 9, name: '구국 헬스장', address: '청와대 22' },
  ]);
  
  const filteredGyms = computed(() => {
    return gyms.value.filter(gym => 
      gym.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      gym.address.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const totalPages = computed(() => Math.ceil(filteredGyms.value.length / itemsPerPage));
  
  const paginatedGyms = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredGyms.value.slice(start, end);
  });
  
  const search = () => {
    currentPage.value = 1;
  };
  
  const goToPage = (page) => {
    currentPage.value = page;
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };
  
  const selectGym = (gym) => {
    emit('selectGym', gym);
    closeModal();
  };
  
  const closeModal = () => {
    emit('close');
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
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #F3F7FA;
    padding: 15px;
    border-radius: 10px;
    width: 70%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .h2gymregister {
    color: #fff;
    text-align: center;
    margin: -15px -15px 15px -15px;
    padding: 8px 0;
    background-color: #000;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  .table-container {
    max-height: 50vh;
    overflow-y: auto;
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
  }
  
  td {
    background-color: #ffffff;
  }
  
  th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  .search-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  input[type="text"] {
    flex-grow: 1;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
  }
  
  .search-btn {
    padding: 6px 12px;
    background-color: #ffffff;
    color: #000;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .pagination button {
    margin: 0 5px;
    padding: 4px 8px;
    border: none;
    background-color: transparent;
    color: #000;
    cursor: pointer;
  }
  
  .pagination button.active {
    background-color: rgba(0, 0, 0, 0.1);
    color: #000;
    border-radius: 5px;
  }
  
  .prev-btn, .next-btn {
    font-weight: bold;
  }
  
  .close-btn {
    display: block;
    margin: 0 auto;
    padding: 6px 12px;
    background-color: rgba(193, 193, 193, 0.1);
    color: #000;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .select-btn {
    padding: 5px 10px;
    background-color: #00ffff;
    color: #000;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  </style>