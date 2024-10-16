import MyPage from "@/views/user/MyPage.vue";
import MyPageEdit from "@/views/user/MyPageEdit.vue";

const UserRoutes = [
    { path: "/mypage", component: MyPage },
    { path: "/mypage/edit", component: MyPageEdit },
];

export default UserRoutes;
