<template>
    <div class="container">
        <div class="recommendation-main-container">
            <div class="title-info-container">
                <label class="routine-title">{{this.$route.query.title}}</label>
                <div class="info-container">
                    <p class="registration-time">등록 시간: 등록시간 드가야댐</p>
                    <p class="total-time">전체 운동 시간: 전체운동시간 드가야댐</p>
                </div>
            </div>
            <div class="board-container">
                <div class="detail-board-header">
                    <div class="board-header-number">순서</div>
                    <div class="board-header-workout">운동</div>
                    <div class="board-header-set">세트 수</div>
                    <div class="board-header-num">세트 별 개수</div>
                    <div class="board-header-weight">무게</div>
                    <div class="board-header-link">영상 링크</div>
                </div>
                <div class="board-body">
                    <div class="board-row" v-for="(routine, index) in routines" :key="routine.number">
                        <div class="board-row-number">{{ routine.number }}</div>
                        <div class="board-row-workout">{{ routine.title }}</div>
                        <div class="board-row-set">{{ routine.set }}</div>
                        <div class="board-row-num">{{ routine.num }}</div>
                        <div class="board-row-weight">{{ routine.weight }}</div>
                        <div class="board-row-link">{{ routine.link }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: black;
        color: white;
        height: calc(100vh - 60px);
        padding-top: 41.6px;
    }

    .recommendation-main-container {
        width: 80%;
        height: 90%; 
        padding: 40px;
        background-color: rgba(255, 255, 255, 0.3);
        border: 2px solid rgba(255, 255, 255, 0);
        border-radius: 15px;
    }

    .title-info-container {
        display: flex;
        align-items: center; 
    }

    .routine-title {
        padding: 10px;
        background-color: hwb(161 0% 0% / 0.5);
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        margin: 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .info-container {
        margin-left: 20px; 
        text-align: left;
    }

    .registration-time, .total-time {
        font-weight: 500;
        font-size: 14px;
    }

    .board-container {
        margin-top: 20px;
    }

    .detail-board-header {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr 1fr 1fr 2fr;
        padding: 20px 16px;
        font-weight: bold;
        border-bottom: 2px solid rgb(1, 254, 174, 0.5);
        text-align: center;
        background-color: rgba(255, 255, 255, 0);
    }

    .board-body {
        display: flex;
        flex-direction: column;
        max-height: 400px; 
        overflow-y: auto; 
    }

    .board-row {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr 1fr 1fr 2fr;
        padding: 10px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .board-row-number, .board-row-workout, .board-row-set, .board-row-num, .board-row-weight, .board-row-link {
        text-align: center; 
    }
</style>
