import WorkoutInfoInputPage from "@/views/routine/WorkoutInfoInputPage.vue";
import UserRecommendationPage from "../views/routine/UserRecommendationPage.vue";
import UserRecommendationdetailPage from "../views/routine/UserRecommendationdetailPage.vue";
import AIGenerateRoutinePage from "../views/routine/AIGenerateRoutinePage.vue";
import StartWorkoutPage from "../views/routine/StartWorkoutPage.vue";

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
  {
    path: "/generate-routine",
    component: AIGenerateRoutinePage
  },
  {
    path: "/start-workout",
    component: StartWorkoutPage
  }

];

export default RoutineRoutes;
