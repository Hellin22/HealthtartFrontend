<template>
    <div class="loading-screen">
            <div class="loading-text">운동 루틴을 생성 중입니다!<br />잠시만 기다려 주세요.</div>
        <div class="progress-container">
            <div class="progress-bar" :style="{ width: progressWidth }"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BackGround from '../../components/BackGround.vue';

const progressWidth = ref('0%'); // 게이지 바의 너비

onMounted(async () => {
    // 게이지 바가 차오르도록 2초 동안 애니메이션을 진행
    for (let i = 0; i <= 100; i++) {
        await new Promise(resolve => setTimeout(resolve, 20)); // 2초 동안 진행
        progressWidth.value = `${i}%`;
    }
});
</script>

<style scoped>
.loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column; /* 세로 방향으로 정렬 */
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 중앙 정렬 */
    background-color: rgba(0, 0, 0, 0.8); /* 배경을 약간 어둡게 */
    z-index: 999; /* 다른 요소들 위에 보이게 */
}

.loading-text {
    color: white; /* 텍스트 색상 */
    font-size: 18px; /* 텍스트 크기 */
    text-align: center; /* 텍스트 중앙 정렬 */
    margin-bottom: 20px; /* 게이지 바와의 간격 */
}

.progress-container {
    width: 80%; /* 게이지 바의 전체 너비 */
    background-color: rgba(255, 255, 255, 0.3); /* 게이지 바 배경 색상 */
    border-radius: 5px; /* 모서리 둥글게 */
    overflow: hidden; /* 초과 부분 숨기기 */
}

.progress-bar {
    height: 10px; /* 게이지 바 높이 */
    background-color: #00BFFF; /* 게이지 바 색상 */
    transition: width 0.02s; /* 너비 변화 애니메이션 */
}
</style>
