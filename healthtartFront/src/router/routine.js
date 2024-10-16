import WorkoutInfoInputPage from "@/views/routine/WorkoutInfoInputPage.vue";
import UserRecommendationPage from "../views/routine/UserRecommendationPage.vue";

const RoutineRoutes = [
  {
    path: "/routine",
    component: WorkoutInfoInputPage
  },
  {
    path: "/user-recommendation",
    component: UserRecommendationPage
  },

];

export default RoutineRoutes;
