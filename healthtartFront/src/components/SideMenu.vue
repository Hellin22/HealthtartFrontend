<template>
  <aside class="side-menu">
    <div class="menu-item">
      <img :src="calendarIcon" alt="달력 아이콘" class="menu-icon" />
      <span class="menu-text" style="font-size: 14px; font-weight: 500;">My Health Calendar</span>
      <img :src="arrowIcon" alt="화살표 아이콘" class="arrow-icon" />
    </div>
    <div class="menu-item">
      <img :src="messageIcon" alt="메시지 아이콘" class="menu-icon" />
      <span class="menu-text" style="font-size: 14px; font-weight: 500;">Recommended Routine</span>
      <img :src="arrowIcon" alt="화살표 아이콘" class="arrow-icon" />
    </div>
  </aside>
</template>

<script setup>
// 이미지 파일을 임포트
import calendarIcon from '@/assets/icons/icon.svg';
import messageIcon from '@/assets/icons/icon2.svg';
import arrowIcon from '@/assets/icons/icon3.svg';
</script>
  
  <style scoped>
  .side-menu {
  z-index: 10001; 
  background-color: black;
  width: 230px;
  color: #fff;
  padding-left: 30px;
  padding-bottom: 50px;
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 아이콘과 텍스트를 좌우로 정렬 */
  gap: 10px;
  margin-bottom: 15px; /* 각 메뉴 간 간격 */
  cursor: pointer;
}

.menu-text {
  display: inline-block;
  width: 150px; /* 텍스트의 가로 너비를 줄임 */
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않게 설정 */
  overflow: hidden; /* 텍스트가 잘리도록 설정 */
  text-overflow: ellipsis; /* 텍스트가 넘치면 생략 부호(...) 표시 */
  
}

.menu-icon {
  width: 17px; /* 아이콘 크기 설정 */
  height: 17px;
}

.arrow-icon {
  width: 13px; /* 화살표 크기 설정 */
  height: 13px;
}

.menu-item span {
  font-size: 16px;
  color: #fff;
}

.menu-item:hover {
  color: #00ffff;
}
</style>