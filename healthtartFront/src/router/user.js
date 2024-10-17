import MyPage from "@/views/user/MyPage.vue";
import MyPageEdit from "@/views/user/MyPageEdit.vue";
import UserLoginPage from "../views/user/UserLoginPage.vue";

const UserRoutes = [
    { path: "/mypage", component: MyPage },
    { path: "/mypage/edit", component: MyPageEdit },
    { path:"/login", component: UserLoginPage },
];

export default UserRoutes;
