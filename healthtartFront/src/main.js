import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js';

const app = createApp(App);

// createApp(App).mount('#app')
app.use(router)  // Vue Router 사용
app.mount('#app');