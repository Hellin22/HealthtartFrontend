<template>
    <div class="level">
      <BackGround />
      <div class="content">
        <div class="emoji-container">
          <img src="@/assets/icons/emoji.svg" alt="Muscle Emoji" class="muscle-emoji" />
        </div>
        <div class="emoji-none">
          <h1>오늘도 난 한단계 강해졌다 으랏차차!!</h1>
          <div class="stars">
            <span v-for="star in 5" :key="star" @click="rate(star)">
              <img
                :src="rating >= star ? filledStar : emptyStar"
                :alt="star"
                class="star"
              />
            </span>
          </div>
          <p>오늘 운동한 시간: 1시간</p>
          <p>운동 루틴이 마음에 드신만큼 선택해 주세요 :)</p>
          <div class="foot">
            <div class="right-progress">
              <img :src="right" alt="right" class="right-icon" />
              <a href="/history" class="view-progress">내 달력 보러가기</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BackGround from '@/components/BackGround.vue';
  
  import filledStar from '@/assets/icons/history/star.svg';
  import emptyStar from '@/assets/icons/history/nonestar.svg';
  import right from '@/assets/icons/right1.svg';
  
  const rating = ref(4); 
  
  const rate = (value) => {
    rating.value = value;
  };
  </script>
  
  <style scoped>
 .level {
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 65px);
  position: relative;
  z-index: 1;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; 
}
  
  .content {
    text-align: center;
    color: white;
  }
  
  .emoji-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
  }
  
  .emoji-none {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
  }
  
  .muscle-emoji {
    width: 400px; 
    height: auto;
  }
  
  h1 {
    color: #00f9ff;
    font-size: 3.5rem;
    margin-bottom: 20px;
  }
  
  .stars {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .star {
    width: 90px;
    cursor: pointer;
  }
  
  p {
    font-size: 1.2rem;
    margin: 20px 0;
  }
  
  .right-progress {
    display: flex;
    align-items: center;
  }
  
  .right-icon {
    width: 20px;
    margin-right: 10px;
  }
  
  .foot {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .view-progress {
    color: #00f9ff;
    font-size: 1.2rem;
    text-decoration: none;
    margin-top: 0; 
  }
  </style>
  