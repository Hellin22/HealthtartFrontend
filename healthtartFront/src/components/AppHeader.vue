<template>
  <header class="header">
    <div class="left-header">
      <div class="logo">
        <img src="@/assets/icons/logo.svg" alt="Healthtart Logo" class="logo-img" />
      </div>
    </div>
    <div class="right-header">
      <div class="nav-menu">
        <nav class="nav">
          <button class="nav-button" :class="{ active: activeTab === 'home' }" @click="setActiveTab('home')">Home</button>
          <button class="nav-button" :class="{ active: activeTab === 'gym' }" @click="setActiveTab('gym')">Gym</button>
          <button class="nav-button" :class="{ active: activeTab === 'routine' }" @click="setActiveTab('routine')">Routine</button>
          <button class="nav-button" :class="{ active: activeTab === 'history' }" @click="setActiveTab('history')">History</button>
          <button class="nav-button" :class="{ active: activeTab === 'inbody' }" @click="setActiveTab('inbody')">InBody</button>
          <button class="nav-button" :class="{ active: activeTab === 'mypage' }" @click="setActiveTab('mypage')">MyPage</button>
        </nav>
        <div class="auth-btn">
          <button :class="{ active: activeTab === 'login' }" @click="setActiveTab('login')">
            Sign in
            <!-- {{ isLoggedIn ? 'LogOut' : 'LogIn' }}   -->
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
  
<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { ref, watch, onMounted, watchEffect } from 'vue';

    const route = useRoute();
    const router = useRouter();

    const activeTab = ref('');
    const isLoginPage = ref(false);

    watch(() => route.path, (newPath) => {
        isLoginPage.value = newPath === '/login';
    }, { immediate: true });


function setActiveTab(tab) {
  if (activeTab.value !== tab) {
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
        router.push({ path: '/inbody' });
        break;
      case 'mypage':
        router.push({ path: '/mypage' });
        break;
      case 'login':
        router.push({ path: '/login' });
        break;
    }
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
  } else if (path.includes('/inbody')) {
    activeTab.value = 'inbody';
  } else if (path.includes('/mypage')) {
    activeTab.value = 'mypage';
  } else if (path.includes('/login')) {
    activeTab.value = 'login';
  }
}

    onMounted(() => {
    updateActiveTabFromRoute();
    });

watch(route, () => {
  updateActiveTabFromRoute();
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

.nav-button {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 5px 10px;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.nav-button.active {
  background-color: #01FEAE;
  color: black;
  border-radius: 10px;
}

.nav-button:hover {
  background-color: #e0ffdf;
  color: black;
  border-radius: 10px;
}

.auth-btn {
  flex: 0 0 auto;
  margin-left: 30px;
}

.auth-btn button {
  background-color: #00E0E0;
  color: black;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
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
    padding: 5px 15px;
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
    font-size: 14px;
    padding: 5px;
  }

  .auth-btn button {
    font-size: 14px;
    padding: 5px 10px;
  }
}
</style>
