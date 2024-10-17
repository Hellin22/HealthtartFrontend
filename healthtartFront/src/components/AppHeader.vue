<template>
  <header class="header">
    <div class="left-header">
      <div class="logo" :class="{ active: activeTab === 'home' }" @click="setActiveTab('home')" >
        <img src="@/assets/icons/logo.svg" alt="Healthtart Logo" class="logo-img"  />
      </div>
    </div>
    <div class="right-header" style="padding-top: 10px;">
      <div class="nav-menu">
        <nav class="nav">
          <button class="appheader-nav-button" :class="{ active: activeTab === 'home' }" @click="setActiveTab('home')">Home</button>
          <button class="appheader-nav-button" :class="{ active: activeTab === 'gym' }" @click="setActiveTab('gym')">Gym</button>
          <button class="appheader-nav-button" :class="{ active: activeTab === 'routine' }" @click="setActiveTab('routine')">Routine</button>
          <button class="appheader-nav-button" :class="{ active: activeTab === 'history' }" @click="setActiveTab('history')">History</button>
          <button class="appheader-nav-button" :class="{ active: activeTab === 'inbody' }" @click="setActiveTab('inbody')">InBody</button>
          <button class="appheader-nav-button" :class="{ active: activeTab === 'mypage' }" @click="setActiveTab('mypage')">MyPage</button>
        </nav>
        <div class="auth-btn">
          <template v-if="loginState.state.isLoggedIn">
            <span class="user-nickname">{{ loginState.state.userNickname }}</span>
            <button @click="loginState.logout" style="padding-bottom: 4px;">Logout</button>
          </template>
          <button v-else :class="{active: activeTab === 'login'}" @click="setActiveTab('login')" style="padding-bottom: 4px;">
            LogIn
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
  
<script setup>
import { ref, inject, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const loginState = inject('loginState');

const activeTab = ref('home');
const route = useRoute();
const router = useRouter();

function setActiveTab(tab) {
  activeTab.value = tab;
  switch (tab) {
    case 'home':
      router.push({ path: '/' });
      break;
    case 'gym':
      router.push({ path: '/gym' });
      break;
    case 'routine':
      router.push({ path: '/routine' });
      break;
    case 'history':
      router.push({ path: '/history' });
      break;
    case 'inbody':
      router.push({ path: '/ranking' });
      break;
    case 'mypage':
      router.push({ path: '/mypage' });
      break;
    case 'login':
      router.push({ path: '/login' });
      break;
  }
}

function updateActiveTabFromRoute() {
  const path = route.path;
  if (path === '/') {
    activeTab.value = 'home';
  } else if (path.includes('/gym')) {
    activeTab.value = 'gym';
  } else if (path.includes('/routine')) {
    activeTab.value = 'routine';
  } else if (path.includes('/history')) {
    activeTab.value = 'history';
  } else if (path.includes('/ranking')) {
    activeTab.value = 'inbody';
  } else if (path.includes('/mypage')) {
    activeTab.value = 'mypage';
  } else if (path.includes('/login')) {
    activeTab.value = 'login';
  }
}


updateActiveTabFromRoute();

// Watch for route changes to update the active tab
watch(() => route.path, updateActiveTabFromRoute);

// Watch for login state changes
watch(() => loginState.state.isLoggedIn, (newValue) => {
  if (!newValue) {
    // If logged out, redirect to home
    router.push('/');
  }
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 10px 30px;
  height: 60px;
}

.left-header {
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.logo {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

.logo-img {
  width: 80px;
  height: auto;
  object-fit: contain;
  margin-top: 20px;
}

.nav-menu {
  display: flex;
  justify-content: center;
  flex-grow: 0;
  margin: 0 20px;
  align-items: center;
}

.appheader-nav-button {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serifc;
  font-weight: normal;
  padding: 3px 10px;
  padding-bottom: 4px;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  z-index: 2;
}

.appheader-nav-button.active {
  background-color: #01FEAE;
  color: black;
  border-radius: 10px;
}

.appheader-nav-button:hover {
  background-color: #e0ffdf;
  color: black;
  border-radius: 10px;
}

.auth-btn {
  flex: 0 0 auto;
  margin-left: 30px;
  z-index: 2;
}

.auth-btn button {
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serifc;
  font-weight: normal;
  background-color: #00E0E0;
  color: black;
  border: none;
  border-radius: 10px;
  padding: 3px 10px;
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;
}

.auth-btn button:hover {
  background-color: #00c0c0;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.logout-btn {
    background-color: #00E0E0;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 3px 15px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .logout-btn:hover {
    background-color: #00c0c0;
  }

@media (max-width: 768px) {
  .header {
    flex-wrap: wrap;
    height: auto;
    padding: 10px;
  }

  .nav-menu {
    order: 3;
    width: 100%;
    margin: 10px 0 0 0;
  }

  .nav {
    justify-content: space-around;
  }

  .nav-button {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serifc;
   font-weight: normal;
    font-size: 15px;
    padding: 3px;
  }

  .auth-btn button {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serifc;
    font-weight: normal;
    font-size: 15px;
    padding: 3px 10px;
  }
}

.user-nickname {
  color: white;
  margin-right: 10px;
}
</style>
