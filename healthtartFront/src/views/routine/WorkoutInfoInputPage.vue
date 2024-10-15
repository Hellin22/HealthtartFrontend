<template>
    <div class="workout-info-input">
        <RoutineInnerTab>
            <div class="workout-time-section">
            <label for="workout-time">운동 예정 시간:</label>
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
                <label class="select-label">운동 부위를 선택해 주세요. (중복 선택 가능)</label>
            </div>
            <button class="generate-routine-button">운동 루틴 생성하기</button>
        </RoutineInnerTab>
    </div>
 </template>
 
 <script setup>
    import { ref } from 'vue';
    import RoutineInnerTab from '@/components/routine/RoutineInnerTab.vue';
    import '@/assets/css/routine/WorkoutInfoInputPage.css';

    const bodyParts = ['등', '가슴', '어깨', '코어', '삼두', '유산소', '하체', '전완근', '이두'];
    const selectedParts = ref([]);

    const toggleSelection = (part) => {
        if (selectedParts.value.includes(part)) {
            selectedParts.value = selectedParts.value.filter((p) => p !== part);
        } else {
            selectedParts.value.push(part);
        }
    };
 </script>
