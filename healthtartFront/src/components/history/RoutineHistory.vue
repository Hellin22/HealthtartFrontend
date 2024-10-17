<template>
  <div class="routine-calendar-container">
    <div class="calendar-header">
      <h2>{{ currentMonth }} {{ currentYear }}</h2>
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
            <td
              v-for="(day, dayIndex) in week"
              :key="dayIndex"
              class="day-cell"
             @click="openModal(day)"
            >
              <div class="workout-icon">
                <img v-if="day.workout" :src="getWorkoutIcon(day.workout)" :alt="day.workout"  />
              </div>
              <div class="day-number" :class="{ 'current-day': day.date === currentDate }">
                <span v-if="day.date === currentDate" class="current-date-circle">{{ formatDate(day.date) }}</span>
                <span v-else>{{ formatDate(day.date) }}</span>
              </div>
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

    <!-- RoutineHistoryModal 컴포넌트 호출 -->
    <RoutineHistoryModal
      v-if="isModalOpen"
      :isOpen="isModalOpen"
      :workoutDetails="selectedWorkoutDetails"
      :workoutTime="selectedWorkoutTime"
      :satisfaction="selectedSatisfaction"
      :date="selectedDay.date"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '@/assets/css/history/historyroutine.css';
import RoutineHistoryModal from './RoutineHistoryModal.vue';

// 현재 연도와 월을 설정
const currentYear = ref(2024);
const currentMonth = ref('OCT');
const currentDate = ref(new Date().getDate());

// 달력 관련 데이터
const weeks = ref([]);

// 모달 관련 상태
const isModalOpen = ref(false);
const selectedDay = ref(null);
const selectedWorkoutDetails = ref([]);
const selectedWorkoutTime = ref('');
const selectedSatisfaction = ref(0);

// 운동 데이터
const workoutData = {
  14: {
    time: '1시간 07분',
    satisfaction: 4,
    details: [
      { name: '고블릿 스쿼트', sets: 4, reps: '10 ~ 12', weight: '10kg' },
      { name: '불가리안 스플릿 스쿼트', sets: 3, reps: '8 ~ 10', weight: '8kg' },
      { name: '힙 쓰러스트', sets: 4, reps: '10 ~ 12', weight: '40kg' },
      { name: '레그 익스텐션', sets: 3, reps: '12 ~ 15', weight: '30kg' },
      { name: '스탠딩 카프 레이즈', sets: 4, reps: '15 ~ 20', weight: '20kg' }
    ]
  }
};

// 날짜 클릭 시 모달 열기
const openModal = (day) => {
  console.log('모달 열기 시도:', day);
  
  if (!day.date) return; // 날짜가 없는 경우는 제외

  // workoutData가 없는 경우 기본 데이터를 설정
  if (!workoutData[day.date]) {
    selectedDay.value = day;
    selectedWorkoutDetails.value = [{ name: '운동 정보 없음', sets: '-', reps: '-', weight: '-' }];
    selectedWorkoutTime.value = '정보 없음';
    selectedSatisfaction.value = 0;
  } else {
    // 운동 데이터가 있는 경우에 대한 처리
    selectedDay.value = day;
    selectedWorkoutDetails.value = workoutData[day.date].details;
    selectedWorkoutTime.value = workoutData[day.date].time;
    selectedSatisfaction.value = workoutData[day.date].satisfaction;
  }

  isModalOpen.value = true; // 모달 열기
};


// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
};

// 달력 생성 함수 등 기존 함수 그대로 유지
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
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

const workoutLegend = ref([
  { workout: 'chest', name: '가슴' },
  { workout: 'back', name: '등' },
  { workout: 'legs', name: '하체' },
  { workout: 'shoulders', name: '어깨' }
]);

const formatDate = (date) => {
  return date ? (date < 10 ? `0${date}` : date) : '';
};

const generateCalendar = () => {
  const days = daysInMonth(currentYear.value, 9); // 2024년 10월 기준
  const firstDay = getFirstDayOfMonth(currentYear.value, 9);

  const workouts = [
    { date: 1, workout: 'chest' },
    { date: 2, workout: 'back' },
    { date: 3, workout: 'legs' },
    { date: 4, workout: 'shoulders' },
    { date: 6, workout: 'back' },
    { date: 8, workout: 'chest' }
  ];

  let week = [];
  for (let i = 0; i < firstDay; i++) {
    week.push({ date: null });
  }

  for (let day = 1; day <= days; day++) {
    const workout = workouts.find(w => w.date === day);
    week.push({ date: day, workout: workout ? workout.workout : null });
    if (week.length === 7) {
      weeks.value.push(week);
      week = [];
    }
  }

  while (week.length < 7) {
    week.push({ date: null });
  }
  weeks.value.push(week);
};

onMounted(() => {
  generateCalendar();
});
</script>
