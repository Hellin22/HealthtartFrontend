<template>
    <div class="container">
        <nav class="inner-tab">
            <div class="nav-menu">
                <button :class="{'active-button': activeTab === 'ai', 'inactive-button': activeTab !== 'ai'}"@click="setActiveTab('ai')">AI 생성 루틴</button>
            </div>
            <div class="nav-menu">
                <button :class="{'active-button': activeTab === 'user', 'inactive-button': activeTab !== 'user'}"@click="setActiveTab('user')">유저 추천 루틴</button>
            </div>
        </nav>
        <div class="main-container">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
    import '@/assets/css/RoutineInnerTab.css';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const activeTab = ref('ai'); 
    const router = useRouter();

    const setActiveTab = async (tab) => {
        activeTab.value = tab;
        switch(tab){
            case 'ai':
                router.push({ path: '/routine' });
                break;
            case 'user':
                router.push({ path: '/user-recommendation' });
                break;
        }
    };

 </script>
