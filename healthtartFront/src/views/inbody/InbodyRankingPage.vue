<template>
    <div class="inbody-ranking">
      <h2>InBody Ranking</h2>
      <table>
        <thead>
          <tr>
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
          <tr v-for="(user, index) in inbodyUsers" :key="index">
            <td>{{ index + 1 }}</td>
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
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  // Inbody 데이터를 저장할 상태 변수
  const inbodyUsers = ref([])
  
  // 데이터 fetching 함수 (axios 사용)
  const fetchInbodyData = async () => {
    try {
      console.log('Fetching InBody data...') // 요청 시작 로그
  
      const response = await axios.get('http://localhost:8080/inbody', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      console.log('Response status:', response.status) // 응답 상태 로그
      console.log('Fetched data:', response.data) // 가져온 데이터 로그
  
      // 상태 변수에 데이터를 저장
      inbodyUsers.value = response.data
    } catch (error) {
      console.error('Error fetching InBody data:', error) // 오류 발생 시 로그
    }
  }
  
  // 컴포넌트가 마운트될 때 데이터를 가져옴
  onMounted(() => {
    fetchInbodyData()
  })
  </script>
  
  <style scoped>
  .inbody-ranking {
    margin: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>
  