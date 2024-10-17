<template>
    <div class="user-recommendation">
        <RoutineInnerTab>
            <div class="board-container">
                <div class="board-header">
                    <div class="board-header-number">번호</div>
                    <div class="board-header-title">제목</div>
                    <div class="board-header-rating">평균 별점</div>
                    <div class="board-header-time">운동 시간</div>
                    <div class="board-header-start">시작하기</div>
                </div>
            </div>
        </RoutineInnerTab>
    </div>
</template>

<script setup>
    import RoutineInnerTab from '@/components/routine/RoutineInnerTab.vue';


</script>

<style scoped>
    .board-header {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr 1fr 1fr;
        padding: 20px 16px;
        margin-top: -30px;
        font-weight: bold;
        border-bottom: 2px solid rgb(1, 254, 174, 0.5);
        text-align: center;
    }
</style>