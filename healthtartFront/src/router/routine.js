import WorkoutInfoInputPage from "@/views/routine/WorkoutInfoInputPage.vue";
import UserRecommendationPage from "../views/routine/UserRecommendationPage.vue";
import UserRecommendationdetailPage from "../views/routine/UserRecommendationdetailPage.vue";
import AIGenerateRoutinePage from "../views/routine/AIGenerateRoutinePage.vue";
<<<<<<< HEAD
import RoutineFinishPage from "../views/routine/RoutineFinish.vue";
=======
import StartWorkoutPage from "../views/routine/StartWorkoutPage.vue";
>>>>>>> 701bfaea947a936b38f60377cd0995060a9f7b63

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
<<<<<<< HEAD
    path: "/finished-routine",
    component: RoutineFinishPage
  },
=======
    path: "/start-workout",
    component: StartWorkoutPage
  }
>>>>>>> 701bfaea947a936b38f60377cd0995060a9f7b63

];

export default RoutineRoutes;
