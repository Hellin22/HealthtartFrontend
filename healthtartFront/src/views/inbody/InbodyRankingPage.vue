<template>
  <div class="inbody-ranking">
    <BackGround class="background-component" />
    <h2 class="inbodyrankingtitle">InBody Ranking</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr class="inbodytrtitle">
            <th>랭킹</th>
            <th>이름</th>
            <th>성별</th>
            <th>키</th>
            <th>체중</th>
            <th>골격근량</th>
            <th>체지방률</th>
            <th>기초대사량</th>
            <th>인바디 점수</th>
          </tr>
        </thead>
        <tbody>
          <tr class="inbodytr" v-for="(user, index) in paginatedUsers" :key="index">
            <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td>{{ user.userNickname }}</td>
            <td>{{ user.userGender }}</td>
            <td>{{ user.height }}</td>
            <td>{{ user.weight }}</td>
            <td>{{ user.muscleWeight }}</td>
            <td>{{ user.fatPercentage }}</td>
            <td>{{ user.basalMetabolicRate }}</td>
            <td>{{ user.inbodyScore }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">이전</button>
      <button 
        v-for="page in displayedPages" 
        :key="page" 
        @click="changePage(page)"
        :class="{ active: currentPage === page }"
      >
        {{ page }}
      </button>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">다음</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import BackGround from '../../components/BackGround.vue';

const inbodyUsers = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;

const fetchInbodyData = async () => {
  try {
    console.log('Fetching InBody data...');
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/inbody', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Response status:', response.status);
    console.log('Fetched data:', response.data);

    inbodyUsers.value = response.data;
  } catch (error) {
    console.error('Error fetching InBody data:', error);
  }
};

onMounted(() => {
  fetchInbodyData();
});

const totalPages = computed(() => Math.ceil(inbodyUsers.value.length / itemsPerPage));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return inbodyUsers.value.slice(start, end);
});

const displayedPages = computed(() => {
  const range = 2; // 현재 페이지 양쪽으로 표시할 페이지 수
  let start = Math.max(1, currentPage.value - range);
  let end = Math.min(totalPages.value, currentPage.value + range);

  if (end - start + 1 < range * 2 + 1) {
    if (start === 1) {
      end = Math.min(start + range * 2, totalPages.value);
    } else {
      start = Math.max(end - range * 2, 1);
    }
  }

  return Array.from({length: end - start + 1}, (_, i) => start + i);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<style scoped>
.inbody-ranking {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 65px);
  padding: 20px;
  position: relative;
}

.background-component {
  position: fixed;
  width: 100%;
  height: 100%;
  margin-top: 30px;
  z-index: -1;
}

.inbodyrankingtitle {
  text-align: center;
  font-size: 40px;
  margin-bottom: 20px;
  color: #fff;
  position: relative;
  z-index: 2;
}

.table-container {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
}

table {
  width: 70%;
  border-collapse: collapse;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* 그림자 추가 */
}

.inbodytrtitle, .inbodytr {
  border: 1px solid #ffffff;
  padding: 8px;
  text-align: center;
  transition: background-color 0.3s; /* 호버 시 색상 전환 효과 */
}

.inbodytrtitle {
  background-color: rgba(255, 255, 255, 0.8); /* 더 밝은 배경 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* 제목 행에 그림자 추가 */
}

th {
  font-weight: bold;
  padding: 8px;
  font-size: 14px;
  color: #000;
}

td {
  height: 40px;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  color: #fff;
}

.pagination button {
  background-color: #fff;
  color: #000;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 버튼에 그림자 추가 */
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.pagination button.active {
  background-color: #00ffff;
  color: black;
}
</style>
