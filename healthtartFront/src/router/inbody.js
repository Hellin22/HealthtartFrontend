import InbodyRankingPage from "@/views/inbody/InbodyRankingPage.vue";


const InbodyRoutes = [
    {
        path:"/inbody",
        component: InbodyRankingPage,
        meta: { requiresAuth: true }, // 로그인 필요
    }
];

export default InbodyRoutes;