<template>
  <div class="routine-calendar-container">
    <div class="calendar-header">
      <h2>{{ currentMonth }} {{ currentYear }}</h2> <!-- 연도와 월을 동적으로 출력 -->
    </div>
    <div class="calendar-layout">
      <table class="calendar-table">
        <thead>
          <tr>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in weeks" :key="weekIndex">
            <td v-for="(day, dayIndex) in week" :key="dayIndex" class="day-cell">
              <div class="workout-icon">
                <img v-if="day.workout" :src="getWorkoutIcon(day.workout)" :alt="day.workout" />
              </div>
              <div class="day-number">{{ formatDate(day.date) }}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 운동별 전설 -->
      <div class="legend">
        <div class="legend-item" v-for="(legend, index) in workoutLegend" :key="index">
          <img :src="getWorkoutIcon(legend.workout)" alt="운동 아이콘" class="legend-icon" />
          <span style="font-size: 20px;">{{ legend.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 현재 연도와 월을 설정
const currentYear = ref(2024);
const currentMonth = ref('OCT'); // 월 이름을 설정

// 달력 관련 데이터
const weeks = ref([]);

// 날짜 계산 함수
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

// 운동별 아이콘
const getWorkoutIcon = (workout) => {
  switch (workout) {
    case 'chest':
      return new URL('@/assets/icons/history/chest.svg', import.meta.url).href;
    case 'back':
      return new URL('@/assets/icons/history/back.svg', import.meta.url).href;
    case 'legs':
      return new URL('@/assets/icons/history/lowerbody.svg', import.meta.url).href;
    case 'shoulders':
      return new URL('@/assets/icons/history/shoulder.svg', import.meta.url).href;
    default:
      return '';
  }
};

// 운동별 전설 설정
const workoutLegend = ref([
  { workout: 'chest', name: '가슴' },
  { workout: 'back', name: '등' },
  { workout: 'legs', name: '하체' },
  { workout: 'shoulders', name: '어깨' }
]);

// 날짜 포맷팅 함수
const formatDate = (date) => {
  return date ? (date < 10 ? `0${date}` : date) : ''; // 날짜가 null이면 빈 문자열 반환
};

// 달력 생성 함수
const generateCalendar = () => {
  const days = daysInMonth(currentYear.value, 9); // 2024년 10월 기준
  const firstDay = getFirstDayOfMonth(currentYear.value, 9);

  const workouts = [
    { date: 1, workout: 'chest' },
    { date: 2, workout: 'back' },
    { date: 3, workout: 'legs' },
    { date: 4, workout: 'shoulders' },
    { date: 6, workout: 'back' },
    { date: 8, workout: 'chest' },
    // 나머지 날짜에 대한 데이터 추가...
  ];

  let week = [];
  for (let i = 0; i < firstDay; i++) {
    week.push({ date: null }); // 첫 번째 주의 빈 날짜 추가
  }

  for (let day = 1; day <= days; day++) {
    const workout = workouts.find(w => w.date === day);
    week.push({ date: day, workout: workout ? workout.workout : null });
    if (week.length === 7) {
      weeks.value.push(week);
      week = [];
    }
  }

  // 마지막 주에서 남은 셀을 빈 날짜로 채우기
  while (week.length < 7) {
    week.push({ date: null });
  }
  weeks.value.push(week);
};

onMounted(() => {
  generateCalendar();
});
</script>

<style scoped>
.routine-calendar-container {
  width: 100%;
  margin: auto;
  color: white;
}

.calendar-header {
  margin-left: 260px;
  text-align: left;
  font-size: 30px;
  color: white;
  margin-bottom: 20px;
}

.calendar-layout {
  margin-left: 260px;
  display: flex;
  align-items: flex-start;
}

.calendar-table {
  width: 80%; /* 달력의 너비 */
  height: 450px;
  border-collapse: collapse;
  text-align: left;
  table-layout: fixed;
}

th {
  border: none; /* 요일 머리글에서 점선 제거 */
  padding-bottom: 5px;
  font-size: 12px; /* 작은 폰트 크기 조정 */
  font-weight: 300; /* 얇은 폰트 두께 설정 */
}

td {
  border: 1px dashed #555; /* 점선 스타일 */
  width: 80px;
  height: 90px;
  color: white;
  font-size: 18px;
}

.day-cell {
  text-align: center;
  padding-top: 10px;
  position: relative;
}

.workout-icon img {
  width: 90px;
  height: 70px;
}

.day-number {
  position: absolute;
  top: 5px;  /* 셀의 왼쪽 상단에 위치 */
  left: 5px; /* 셀의 왼쪽 상단에 위치 */
  font-size: 12px; /* 작은 폰트 크기 조정 */
  font-weight: 300; /* 얇은 폰트 두께 설정 */
}

.legend {
  width: 20%; /* 전설의 너비 줄이기 */
  text-align: center;
  display: flex;
  flex-direction: column; /* 전설 항목을 세로로 나열 */
}

.legend-item {
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  padding-left: 40px;
}

.legend-icon {
  width: 80px;
  height: 40px;
  margin-right: 30px;
}
</style>
