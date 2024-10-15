<template>
    <div class="routine-calendar-container">
      <div class="calendar-header">
        <h2>OCT 2024</h2>
      </div>
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
              <div class="date">{{ day.date || '' }}</div>
              <div v-if="day.workout" class="workout-icon">
                <img :src="getWorkoutIcon(day.workout)" :alt="day.workout" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="legend">
        <div class="legend-item" v-for="(label, color) in workoutLegend" :key="label">
          <div :style="{ backgroundColor: color }" class="legend-color"></div>
          <span>{{ label }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
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
  
  // 운동별 색상 및 전설 설정
  const workoutLegend = ref({
    '#00FF00': '가슴',
    '#00FFFF': '등',
    '#FF0000': '하체',
    '#FFFFFF': '어깨',
  });
  
  // 달력 생성 함수
  const generateCalendar = () => {
    const days = daysInMonth(2024, 9); // 2024년 10월 기준
    const firstDay = getFirstDayOfMonth(2024, 9);
  
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
  
    if (week.length > 0) {
      weeks.value.push(week);
    }
  };
  
  onMounted(() => {
    generateCalendar();
  });
  </script>
  
  <style scoped>
  .routine-calendar-container {
    width: 90%;
    margin: auto;
    color: white;
  }
  
  .calendar-header {
    text-align: left;
    font-size: 36px;
    color: white;
    margin-bottom: 20px;
  }
  
  .calendar-table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    table-layout: fixed;
  }
  
  th, td {
    border: 1px solid #555;
    width: 80px;
    height: 80px;
    color: white;
    font-size: 18px;
  }
  
  .day-cell {
    position: relative;
  }
  
  .date {
    margin-bottom: 10px;
  }
  
  .workout-icon img {
    width: 40px;
    height: 40px;
  }
  
  .legend {
    margin-top: 20px;
    display: flex;
    justify-content: left;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  
  .legend-color {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  </style>
  