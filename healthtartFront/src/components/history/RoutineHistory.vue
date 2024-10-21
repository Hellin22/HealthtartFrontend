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
          <td v-for="(day, dayIndex) in week" :key="dayIndex" class="day-cell" @click="openModal(day)">
            <!-- 운동 아이콘 표시 -->
            <div class="workout-icon">
              <img v-if="day.workout" :src="getWorkoutIcon(day.workout)" :alt="day.workout" />
            </div>
            <!-- 날짜 표시 -->
            <div class="day-number" :class="{ 'current-day': day.date === currentDate }">
              <span v-if="day.date === currentDate" class="current-date-circle">{{ formatDay(day.date) }}</span>
              <span v-else>{{ formatDay(day.date) }}</span>
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

    <RoutineHistoryModal 
  v-if="isModalOpen" 
  :isOpen="isModalOpen" 
  :workoutDetails="selectedWorkoutDetails || []" 
  :workoutTime="selectedWorkoutTime || 0" 
  :satisfaction="selectedSatisfaction || 5" 
  :date="selectedDay?.date || ''"  
  @close="closeModal" 
/>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
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
const selectedWorkoutTime = ref(0);  // 시간을 숫자로 초기화
const selectedSatisfaction = ref(0);

// workoutData는 각 날짜에 대한 운동 기록을 저장
const workoutData = ref({});

// JWT 토큰에서 userCode 추출
const getUserCodeFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub;
  }
  return null;
};


// 루틴 코드별 운동 루틴 상세 정보 조회
const fetchWorkoutDetailsForRoutine = async (routineCode) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/workout-per-routine/detail/${routineCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`운동 루틴 조회 오류 상태: ${response.status}`);
    }

    const workoutDetails = await response.json();
    return workoutDetails; // 루틴 상세 정보 반환
  } catch (error) {
    console.error('루틴 코드별 운동 루틴 조회 실패:', error);
    return null;
  }
};

// 운동기구의 운동 부위 API 호출
// 운동 부위를 가슴, 등, 하체, 어깨로 분류하는 매핑 테이블
const bodyPartClassification = {
  가슴: 'chest',
  등: 'back',
  어깨: 'shoulders',
  코어: 'back',        // 코어는 등으로 분류
  삼두: 'chest',      // 삼두는 가슴 운동과 연관
  유산소: 'legs',    // 유산소는 하체로 분류
  하체: 'legs',
  전완근: 'back',      // 전완근은 등으로 분류
  이두: 'chest',      // 이두는 가슴 운동과 연관
};

const categorizeBodyPart = (bodyPart) => {
  const trimmedBodyPart = bodyPart?.trim(); // 공백 제거 후 처리
  const category = bodyPartClassification[trimmedBodyPart] || '기타'; // 기타로 분류되지 않게 확인
  console.log('Categorized bodyPart:', category); // 분류된 값을 콘솔에 출력
  return category;
};

// 운동 부위에 따른 아이콘 반환
const getWorkoutIcon = (workout) => {
  console.log('Received workout category:', workout); // 전달받은 workout 값 확인
  let iconUrl;
  switch (workout) {
    case 'chest':
      iconUrl = new URL('@/assets/icons/history/chest.svg', import.meta.url).href;
      break;
    case 'back':
      iconUrl = new URL('@/assets/icons/history/back.svg', import.meta.url).href;
      break;
    case 'legs':
      iconUrl = new URL('@/assets/icons/history/lowerbody.svg', import.meta.url).href;
      break;
    case 'shoulders':
      iconUrl = new URL('@/assets/icons/history/shoulder.svg', import.meta.url).href;
      break;
    default:
      iconUrl = ''; // workout 정보가 없을 경우 기본값
  }
  console.log(`사진 경로 ㅋ ${workout}:`, iconUrl);
  return iconUrl;
};

// 예시 사용 방법
const fetchBodyPartForEquipment = async (exerciseEquipmentCode) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/exercise_equipment/${exerciseEquipmentCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`운동 루틴 조회 오류 상태: ${response.status}`);
    }

    const workoutDetails = await response.json();
    console.log('운동 기구 상세 정보:', workoutDetails);

    // bodyPart를 분류된 값으로 변환
    const categorizedPart = categorizeBodyPart(workoutDetails.bodyPart);
    return categorizedPart;  // 분류된 운동 부위를 반환
  } catch (error) {
    console.error('운동 부위 조회 실패:', error);
    return '기타'; // 오류 발생 시 기본값 설정
  }
};



// 운동 기록 조회 후 workoutData 세팅
// 운동 기록 조회 후 workoutData 세팅
const fetchWorkoutHistoryForDay = async (userCode, dayOfExercise) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/recordperuser/${userCode}/${dayOfExercise}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`운동 기록 조회 오류 상태: ${response.status}`);
    }

    const workoutInfo = await response.json();
    if (!workoutInfo || workoutInfo.length === 0) {
      console.log('운동 기록이 없습니다.');
      workoutData.value[dayOfExercise] = {
        details: [{ name: '운동 정보 없음', sets: '-', reps: '-', weight: '-' }],
        time: 0,
        satisfaction: 0,
      };
      return;
    }

    const routineCode = workoutInfo[0]?.routineCode;
    const routineDetails = await fetchWorkoutDetailsForRoutine(routineCode);

    if (!routineDetails || routineDetails.length === 0) {
      workoutData.value[dayOfExercise] = {
        details: [{ name: '운동 정보 없음', sets: '-', reps: '-', weight: '-' }],
        time: 0,
        satisfaction: 0,
      };
      return;
    }

    const details = await Promise.all(
      routineDetails.map(async (workoutInfo) => {
        const equipmentCode = workoutInfo?.exerciseEquipmentCode?.exerciseEquipmentCode;
        const bodyPart = equipmentCode ? await fetchBodyPartForEquipment(equipmentCode) : '운동 부위 없음';
        const categorizedWorkout = categorizeBodyPart(bodyPart);

        return {
          name: workoutInfo?.exerciseEquipmentCode?.exerciseEquipmentName || '운동명 없음',
          sets: workoutInfo?.weightSet || '0',
          reps: workoutInfo?.numberPerSet || '0',
          weight: workoutInfo?.weightPerSet || '0',
          bodyPart, 
          workout: categorizedWorkout, // 영어로 변환된 운동 부위
        };
      })
    );

    workoutData.value[dayOfExercise] = {
      details,
      time: routineDetails.reduce((totalTime, workoutInfo) => totalTime + (workoutInfo.workoutTime || 0), 0),
      satisfaction: workoutInfo[0]?.satisfaction || 0,
    };
  } catch (error) {
    workoutData.value[dayOfExercise] = {
      details: [{ name: '운동 정보 없음', sets: '-', reps: '-', weight: '-' }],
      time: 0,
      satisfaction: 0,
    };
  }
};

// 모달 열기 시 운동 기록과 운동 루틴 정보 가져오기
const openModal = async (day) => {
  if (!day?.date) return;

  const userCode = getUserCodeFromToken();
  if (!userCode) {
    console.error('유저 코드를 가져올 수 없습니다.');
    return;
  }

  const formattedDate = `${currentYear.value}-${String(10).padStart(2, '0')}-${String(day.date).padStart(2, '0')}`;
  await fetchWorkoutHistoryForDay(userCode, formattedDate);

  const workout = workoutData.value[formattedDate];

  selectedWorkoutDetails.value = workout?.details || [{ name: '운동 정보 없음', sets: '-', reps: '-', weight: '-' }];
  selectedWorkoutTime.value = workout?.time || 0;
  selectedSatisfaction.value = workout?.satisfaction || 0;
  selectedDay.value = { date: formattedDate };

  isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
};
// 달력 생성 함수
const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();



// 운동 범례 설정
const workoutLegend = ref([
  { workout: 'chest', name: '가슴' },
  { workout: 'back', name: '등' },
  { workout: 'legs', name: '하체' },
  { workout: 'shoulders', name: '어깨' },
]);

// 날짜 형식 변환 함수 (날짜가 10보다 작으면 앞에 0을 붙임)
const formatDay = (day) => {
  return day ? String(day).padStart(2, '0') : '';
};

// 달력 생성 함수
const generateCalendar = () => {
  const days = daysInMonth(currentYear.value, 9); // 예: 2024년 10월
  const firstDay = getFirstDayOfMonth(currentYear.value, 9);

  const workouts = [
    { date: 1, workout: 'chest' },
    { date: 3, workout: 'back' },
    { date: 5, workout: 'legs' },
    // 나머지 날짜에 대한 workout 정보 추가
  ];

  let week = [];
  for (let i = 0; i < firstDay; i++) {
    week.push({ date: null });
  }

  for (let day = 1; day <= days; day++) {
    const workout = workouts.find((w) => w.date === day);
    week.push({ date: day, workout: workout ? workout.workout : null });
    if (week.length === 7) {
      weeks.value.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) {
      week.push({ date: null });
    }
    weeks.value.push(week);
  }
};

onMounted(() => {
  generateCalendar();
});
</script>  