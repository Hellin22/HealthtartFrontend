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
  </script>
  
  <style scoped>
  .side-menu {
    background-color: black;
    width: 280px;
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