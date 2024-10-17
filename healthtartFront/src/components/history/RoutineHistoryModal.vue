<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="closeModal">
    <div class="modal-content">
      <div class="header-row">
        <h3>{{ formattedDate }}</h3>
        <p class="workout-time">운동 시간 : {{ formattedWorkoutTime }}</p>
      </div>
      <table class="workout-table">
        <thead>
          <tr>
            <th>운동명</th>
            <th>세트 수</th>
            <th>세트 당 개수</th>
            <th>세트 당 무게</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(exercise, index) in workoutDetails" :key="index" > 
            <td style="height: 20px; font-size: 16px;">{{ exercise.name }}</td>
            <td style="height: 20px; font-size: 18px;">{{ exercise.sets }}</td>
            <td style="height: 20px; font-size: 18px;">{{ exercise.reps }}</td>
            <td style="height: 20px; font-size: 18px;">{{ exercise.weight }}</td>
          </tr>
        </tbody>
      </table>
      <div class="satisfaction">
      <div class="box">
        <div class="stars">
          <span>만족도 &nbsp; </span>
          <img v-for="n in 5" :key="n" :src="n <= satisfaction ? activeStar : inactiveStar" class="star" />
        </div>
        <button class="confirm-btn" @click="closeModal">확인</button>
      </div>
      
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import '@/assets/css/history/historyroutine.css';

// star.svg 파일 경로 지정
const activeStar = new URL('@/assets/icons/history/star.svg', import.meta.url).href;  // 채워진 별
const inactiveStar = new URL('@/assets/icons/history/nonestar.svg', import.meta.url).href;  // 빈 별

const props = defineProps({
  isOpen: Boolean,
  workoutDetails: Array,
  workoutTime: Number,
  satisfaction: Number,
  date: Number,
});

// 분을 "시간 분" 형식으로 변환하는 일반 함수
const convertMinutesToTime = (minutes) => {
  if (isNaN(minutes) || minutes <= 0) {
    return '0분'; 
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}시간 ${remainingMinutes}분`;
  } else if (hours > 0) {
    return `${hours}시간`;
  } else {
    return `${remainingMinutes}분`;
  }
};

// computed 속성: workoutTime을 형식화하여 반환 (데이터가 없을 시 0분 처리)
const formattedWorkoutTime = computed(() => {
  const time = props.workoutTime || 0; // workoutTime이 없을 경우 0으로 설정
  return convertMinutesToTime(time);
});

const emit = defineEmits(['close']);

// 모달을 닫는 함수
const closeModal = () => {
  emit('close');
};

// 날짜 포맷팅
const formattedDate = computed(() => {
  const date = new Date(2024, 9, props.date); // 2024년 10월 날짜 기준
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
});
</script>
