<template>
    <div class="container">
        <div class="ai-main-container">
            <div class="routine-contents">여기에 운동 루틴이 들어가야합니다 어쩌구 저쩌구 배경 흰색으로 해놓은거 쳐내고 내 마음대로 바꿔야징~ㅋ킼킼킼</div>
            <img class="bluemonster-icon" src="@/assets/icons/bluemonster.svg" alt="">
            <div class="button-container">
                    <button class="regenerate-routine-button"><img class="regenerate-icon" src="@/assets/icons/regenerate.svg" alt="">루틴 재생성 하기</button>
                    <button class="start-routine-button"><img class="start-icon"src="@/assets/icons/start.svg" alt="">운동 시작하기</button>
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
        height: calc(100vh - 65px);
        padding-top: 41.6px;
    }

    .ai-main-container {
        width: 80%;
        height: 90%; 
        padding: 40px;
        border: 2px solid #01FDFE;
        border-radius: 15px;
        display: flex; 
        flex-direction: column; 
        justify-content: space-between;
        position: relative;
        
    }

    .button-container {
        display: flex;
        gap: 20px;
        margin-top: auto;
    }

    .regenerate-routine-button, .start-routine-button {
        color: white;
        font-size: 20px;
        padding: 10px;
        width: 240px;
        border: 2px solid #01FDFE;
        border-radius: 100px;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .regenerate-icon {
        width:20px;
        margin-right: 10px;
        margin-left: 10px;
        margin-top: 2px;
    }

    .start-icon {
        width:16px;
        margin-left: 10px;
        margin-right: 25px;
        margin-top: 2px;
    }

    .bluemonster-icon {
        width:100px;
        height: auto;
        position: absolute; /* 이미지 위치 조정 */
        right: 20px; /* 오른쪽 여백 */
        bottom: 20px;
    }

</style>
