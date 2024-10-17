import WorkoutInfoInputPage from "@/views/routine/WorkoutInfoInputPage.vue";
import UserRecommendationPage from "../views/routine/UserRecommendationPage.vue";
import UserRecommendationdetailPage from "../views/routine/UserRecommendationdetailPage.vue";

const RoutineRoutes = [
  {
    path: "/routine",
    component: WorkoutInfoInputPage
  },
  {
    path: "/user-recommendation",
    component: UserRecommendationPage
  },
  {
    path: "/routine-detail",
    component: UserRecommendationdetailPage
  },

];

export default RoutineRoutes;
