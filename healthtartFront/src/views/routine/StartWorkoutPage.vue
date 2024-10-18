<template>
    <div class="container">
        <div class="timer-border">
            <div class="timer">{{ formattedTime }}</div>
            <div class="timer-button">
            <button class="start-button" @click="startTimer"><img class="start-icon" src="@/assets/icons/playbutton.svg" alt="시작 버튼"></button>
            <button class="pause-button" @click="stopTimer"><img class="pause-icon" src="@/assets/icons/pausebutton.svg" alt="중지 버튼"></button>
            <button class="stop-button" @click="resetTimer"><img class="stop-icon" src="@/assets/icons/stopbutton.svg" alt="끝 버튼"></button>
        </div>
        </div>
    
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';

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
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: black;
        height: calc(100vh - 65px);
        padding-top: 41.6px;
    }

    .timer-border {
        background-color: #2b2e2e;

        
        /* margin: 30px; */
        border-radius: 20px;
        box-shadow: 0 2px 3px rgba(109, 108, 108, 0.5);
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
    
</style>
