<template>
    <div class="workout-info-input">
        <RoutineInnerTab>
            <div class="workout-time-section">
            <label for="workout-time">운동 예정 시간:</label>

            <!-- v-model="selectedTime" 추가하기 -->
            <select id="workout-time" class="dropdown"> 
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="120">120</option>
                <option value="120">150</option>

            </select>
            <span>분</span>
        </div>

        <div class="body-parts-section">
                <div class="button-grid">
                    <button v-for="part in bodyParts":key="part"@click="toggleSelection(part)":class="{'selected': selectedParts.includes(part)}"class="body-part-button">
                        {{part}}
                    </button>
                </div>
                <label class="select-label">운동 부위를 선택해 주세요. (중복 선택 불가)</label>
            </div>
            <button class="generate-routine-button" @click="generateRoutine">운동 루틴 생성하기</button>
        </RoutineInnerTab>
        <LoadingScreen v-if="loading"/>
    </div>
 </template>
 
 <script setup>
    import { ref } from 'vue';

    import RoutineInnerTab from '@/components/routine/RoutineInnerTab.vue';
    import '@/assets/css/routine/WorkoutInfoInputPage.css';
    import LoadingScreen from './LoadingScreen.vue';

    const bodyParts = ['등', '가슴', '어깨', '코어', '삼두', '유산소', '하체', '전완근', '이두'];
    const selectedParts = ref([]);
    const loading = ref(false);

    const toggleSelection = (part) => {
        if (!selectedParts.value.includes(part)) {
            selectedParts.value=[];
            selectedParts.value.push(part);
        };
    }

    // selectedTime 만들어야됨

    const generateRoutine = async () => {
    loading.value = true; 
    await new Promise(resolve => setTimeout(resolve, 2000)); // cors해결되면 gpt api 호출해서 대기타는걸로 변경해야댐
    // const createRoutine = await fetch(`api/gpt/generate-routine?userCode=${userCode}&bodyPart=${part}&time=${time}`);
    loading.value = false;

    // 루틴 생성 후 루틴 확인 화면으로 이동
    // 라우터 푸시하기
};
    
 </script>
