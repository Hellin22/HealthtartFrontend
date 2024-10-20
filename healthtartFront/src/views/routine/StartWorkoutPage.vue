<template>
    <div class="container">
        <div class="routine-container">
            <div class="routine-info">
                <div class="exercise-list">
                    <div v-for="(exercise, index) in routine.exercises" :key="index">
                        <p class="name-p"><span class="name-span">{{ exercise.name }}</span> - {{ exercise.sets }}세트, {{ exercise.reps }}회</p>
                        <p v-if="getExplanation(exercise)">
                            <span v-html="formatExerciseExplanation(getExplanation(exercise))"></span>.
                        </p><br>
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
    import { ref, computed, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const routine = ref(JSON.parse(route.query.routineData || '{"exercises":[], "totalTime": 0}')); 
    console.log('Initial routine data:', routine.value);

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

    const getExplanation = (exercise) => {
        if (exercise.explanation) {
            return exercise.explanation;
        } else if (exercise.exerciseEquipmentCode.exerciseDescription) {
            return exercise.exerciseEquipmentCode.exerciseDescription;
        }
        return '';
    };

    const fetchRoutineDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('토큰이 없습니다.');
                return;
            }

            const workoutInfoCode = route.query.workoutInfoCode;
            if (!workoutInfoCode) {
                console.error('workoutInfoCode가 없습니다.');
                return;
            }

            const response = await fetch(`http://localhost:8080/workoutInfos/${workoutInfoCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('운동 정보 조회 오류');
            }

            const workoutInfo = await response.json();
            console.log('Workout Info:', workoutInfo);

            const routineResponse = await fetch(`http://localhost:8080/workout-per-routine/detail/${workoutInfo.routineCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });


            if (!routineResponse.ok) {
                throw new Error('운동 루틴 상세 정보 조회 오류');
            }

            const routineInfo = await routineResponse.json();
            console.log('Routine Info:', routineInfo);


            routine.value = {
                title: workoutInfo.title,
                totalTime: workoutInfo.time,
                exercises: routineInfo.map((exercise) => ({
                    name: exercise.workoutName,
                    sets: exercise.weightSet,
                    reps: exercise.numberPerSet,
                    weight: exercise.weightPerSet,
                    explanation: exercise.exerciseExplanation || 
                        (exercise.exerciseEquipmentCode && exercise.exerciseEquipmentCode.exerciseDescription) || '',
                    video: exercise.link
                }))
            };

            console.log('Updated routine data:', routine.value);

        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    onMounted(() => {
        fetchRoutineDetails();
    });
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

    .timer-instruction {
        color: white;
        text-align: center; 
        margin: 10px 0; 
        font-size: 18px; 
    }
</style>