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
          <tr v-for="(exercise, index) in workoutDetails" :key="index">
            <td>{{ exercise.name }}</td>
            <td>{{ exercise.sets }}</td>
            <td>{{ exercise.reps }}</td>
            <td>{{ exercise.weight }}</td>
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(103, 100, 100, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.modal-content {
  margin: 0;
  background-color: #141414; 
  padding: 20px;
  height: 500px;
  border-radius: 12px;
  width: 800px; 
  box-shadow: 0 4px 20px #00000033;
  color: white; 
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}

.header-row {
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  
}

h3 {
  font-weight: 500;
  margin: 0;
  color: #fff;
  font-size: 25px;
}

.workout-time {
  font-weight: 500;
  text-align: right;
  font-size: 23px;
  color: #c1c1c1;
}

.workout-table {
  margin: 0;
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.workout-table th,
.workout-table td {
  padding: 8px;
  font-size: 20px;
  border: none; /* 기본적으로 아래쪽 테두리는 제거 */
}

.workout-table td:first-child, 
.workout-table td:nth-child(2), 
.workout-table td:nth-child(3) { 
  border-right: 1px solid #01FDFE;
}


.workout-table th {
  font-weight: bold;
  color: #ffffff;
}

.satisfaction {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  

}
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  
}

.stars {
  display: flex;
}

.stars span {
  font-size: 30px;
}

.star {
  width: 40px;
  height: 40px;
  margin: 0 2px;
}


.confirm-btn {
  display: block;
  width: 215px;
  height: 30px;
  margin: 20px auto 0;
  background-color: #01FDFE;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 20px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
}

.confirm-btn:hover {
  background-color: #01FEAE;
}
</style>
