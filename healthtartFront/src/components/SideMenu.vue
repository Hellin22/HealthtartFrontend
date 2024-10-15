<template>
    <aside class="side-menu">
      <div class="menu-item">
        <i class="fa fa-calendar"></i>
        <span>My Health Calendar</span>
      </div>
      <div class="menu-item">
        <i class="fa fa-list"></i>
        <span>Recommended Routine</span>
      </div>
    </aside>
  </template>
  
  <script setup>
  // 사이드 메뉴는 별도의 로직이 없으므로 script는 비워둡니다.
  </script>
  
  <style scoped>
  .side-menu {
    width: 300px;
    background-color: #000;
    color: #fff;
    padding: 20px;
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
    gap: 10px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  
  .menu-item i {
    font-size: 24px;
    color: #00ffff;
  }
  
  .menu-item span {
    font-size: 16px;
    color: #fff;
  }
  
  .menu-item:hover {
    color: #00ffff;
  }
  </style>