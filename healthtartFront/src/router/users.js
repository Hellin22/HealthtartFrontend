import MyPage from "@/views/users/MyPage.vue";
import MyPageEdit from "@/views/users/MyPageEdit.vue";
import LoginPage from "@/views/users/LoginPage.vue";

const UserRoutes = [
    { path: "/mypage", component: MyPage },
    { path: "/mypage/edit", component: MyPageEdit },
    { path: "/users/login", component: LoginPage }
];

export default UserRoutes;
