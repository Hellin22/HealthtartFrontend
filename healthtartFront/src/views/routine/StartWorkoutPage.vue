<template>
    <div class="container">
        <div class="routine-container">
            <div class="routine-info">
                <div class="exercise-list">
                    <div v-for="(exercise, index) in routine.exercises" :key="index">
                        <p class="name-p"><span class="name-span">{{ exercise.name }}</span> - {{ exercise.sets }}세트, {{ exercise.reps }}회</p>
                        <p><span v-html="formatExerciseExplanation(exercise.explanation)"></span>.</p><br>
                    </div>
                </div>
            </div>
        </div>
        <div class="timer-border">
            <div class="timer">{{ formattedTime }}</div>
            <div class="timer-button">
                <button class="start-button" @click="startTimer">
                    <img class="start-icon" src="@/assets/icons/playbutton.svg" alt="시작 버튼">
                </button>
                <button class="pause-button" @click="stopTimer">
                    <img class="pause-icon" src="@/assets/icons/pausebutton.svg" alt="중지 버튼">
                </button>
                <button class="stop-button" @click="resetTimer">
                    <img class="stop-icon" src="@/assets/icons/stopbutton.svg" alt="끝 버튼">
                </button>
            </div>
            <p class="timer-instruction">추천 운동 시간: {{ routine.totalTime }}분</p>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const routine = ref(JSON.parse(route.query.routineData || '{}')); 
    console.log(routine);
    const seconds = ref(0);
    let timerInterval = null;

    const formattedTime = computed(() => {
        const minutes = String(Math.floor(seconds.value / 60)).padStart(2, '0');
        const secs = String(seconds.value % 60).padStart(2, '0');
        return `${minutes}:${secs}`;
    });

    const startTimer = () => {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                seconds.value++;
            }, 1000);
        }
    };

    const stopTimer = () => {
        clearInterval(timerInterval);
        timerInterval = null;
    };
    
    const resetTimer = () => {
        stopTimer();
        seconds.value = 0;
    };

    const formatExerciseExplanation = (explanation) => {
        return explanation.split('.').map(sentence => sentence.trim()).filter(sentence => sentence).join('.<br>');
    };
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        background-color: black;
        height: calc(100vh - 65px);
        padding-top: 41.6px;
        overflow-y: auto; 
    }

    .routine-container {
        flex: 1; 
        margin-left: 50px;
    }

    .routine-title {
        margin-bottom: 20px;
    }

    .name-p {
        border-bottom: 1px solid rgba(109, 108, 108, 1);
        padding-bottom: 2px;
        display: inline-block;
    }

    .name-span {
        font-weight: bold;
    }


    .timer-border {
        position: sticky; 
        top: 0;
        background-color: #2b2e2e;
        border-radius: 20px;
        box-shadow: 0 2px 3px rgba(109, 108, 108, 0.5);
        margin-right: 50px;
    }

    .timer {
        font-size: 48px;
        margin: 30px;
        padding: 10px 20px;
        background-color: rgb(198, 198, 198);
        color: rgb(43, 43, 43);
        text-shadow: 
            1px 1px 0 rgba(189, 188, 188, 0.5), 
            -1px -1px 0 rgba(189, 188, 188, 0.5), 
            1px -1px 0 rgba(189, 188, 188, 0.5), 
            -1px 1px 0 rgba(0, 0, 0, 0.5);
        box-shadow: 
            inset 1px 1px 0 rgba(55, 53, 53, 0.7),
            inset -1px -1px 0 rgba(153, 152, 152, 0.2);
    }

    .timer-button {
        display: flex;
        gap: 20px;
        justify-content: center; 
        margin-bottom: 20px;
    }

    .start-button, .pause-button, .stop-button {
        background-color: white;
        border: white;
        font-size: 10px;
        width: 35px;
        height: 35px;
        padding: 10px;
        display: flex; 
        justify-content: center; 
        align-items: center;
        border-radius: 10px;
    }
    
    .start-icon, .pause-icon, .stop-icon {
        width: 20px;
        height: 20px;
    }

    p {
        color:#01FDFE;
        font-size: 20px;
    }

    h1 {
        color:#01FDFE;
    }

     /* 추가된 스타일 */
     .timer-instruction {
        color: white;
        text-align: center; 
        margin: 10px 0; 
        font-size: 18px; 
    }
</style>
