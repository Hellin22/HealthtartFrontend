import MyPage from "@/views/users/MyPage.vue";
import MyPageEdit from "@/views/users/MyPageEdit.vue";
import LoginPage from "@/views/users/LoginPage.vue";
import AddInfoPage from "../views/users/AddInfoPage.vue";
import ResetPasswordPage from "../views/users/ResetPasswordPage.vue";

const UserRoutes = [
    { path: "/mypage", component: MyPage, meta: { requiresAuth: true } },
    { path: "/mypage/edit", name: 'MyPageEdit', component: MyPageEdit, props: true },
    { path: "/users/login", component: LoginPage },
    { path: "/users/addinfo", component: AddInfoPage},
    { path: "/users/password", component: ResetPasswordPage},
];

export default UserRoutes;
