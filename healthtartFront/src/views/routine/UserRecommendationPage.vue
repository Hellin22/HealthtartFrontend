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
                <div class="board-body">
                    <div class="board-row" v-for="(routine, index) in routines" :key="routine.number">
                        <div class="board-row-number">{{ routine.number }}</div>
                        <div class="board-row-title" @click="setActiveTitle()">{{ routine.title }}</div>
                        <div class="board-row-rating">
                            <span v-for="star in routine.averageRating" :key="star">★</span>
                            <span v-for="star in (5 - routine.averageRating)" :key="star">☆</span>
                        </div>
                        <div class="board-row-time">{{ routine.workoutTime }}</div>
                        <div class="board-row-start">
                            <button @click="startRoutine(routine)">운동 시작</button>
                        </div>
                    </div>
                </div>
            </div>
        </RoutineInnerTab>
    </div>
</template>

<script setup>
    import '@/assets/css/routine/UserRecommendationPage.css';
    import RoutineInnerTab from '@/components/routine/RoutineInnerTab.vue';

    import { useRouter } from 'vue-router';

    const router = useRouter();

    const routines = [
    { number: 1, title: "초보자를 위한 쉽고 편한 운동", averageRating: 5, workoutTime: "20분" },
    { number: 2, title: "에어로빅으로 운동해", averageRating: 5, workoutTime: "40분" },
    { number: 3, title: "하루 1시간으로 건강해지기", averageRating: 5, workoutTime: "1시간" },
    { number: 4, title: "재밌는 입시생의 운동 루틴", averageRating: 4, workoutTime: "40분" },
    { number: 5, title: "주말에만 해도 10kg 감량하는 홈트", averageRating: 4, workoutTime: "30분" },
    { number: 6, title: "유제은", averageRating: 4, workoutTime: "30분" },
    { number: 7, title: "집갈래", averageRating: 3, workoutTime: "30분" },
    { number: 8, title: "너무너무", averageRating: 3, workoutTime: "30분" },
    { number: 9, title: "졸리니까", averageRating: 3, workoutTime: "30분" },
    { number: 10, title: "금요일은", averageRating: 2, workoutTime: "30분" },
    { number: 11, title: "칼퇴야", averageRating: 1, workoutTime: "30분" },
    ];

    const setActiveTitle = () => {
        router.push({ path: '/routine-detail' });
    };


    const startRoutine = (routine) => {
        console.log(`운동을 시작합니다: ${routine.title}`);
    };

</script>