import {createRouter, createWebHistory} from "vue-router";
import UsersPage from "@/views/UsersPage.vue";
import UserActivities from "@/views/UserActivities.vue";
import HomePage from "@/views/HomePage.vue"
import UserAppointments from "@/views/AppointmentsPage.vue";
import UserMedications from "@/views/MedicationsPage.vue";
import UserLabReports from "@/views/LabReportsPage.vue";
import UserNutritionandCalories from "@/views/NutritionandCaloriesPage.vue";
import OverViewPage from "@/views/OverviewPage.vue"
const routes =[
    {path:'/', name:"Home", component: HomePage},
    {path:'/users', name:"Users",component: UsersPage},
    {path:'/activities',name:"Activities", component: UserActivities},
    {path: '/appointments', name:"Appointments", component: UserAppointments},
    {path: '/medications', name:"Medications", component: UserMedications},
    {path: '/labreports', name:"LabReports", component: UserLabReports},
    {path: '/nutritionandcaloriestracker', name:"NutritionandCalories", component: UserNutritionandCalories},
    {path: '/overview/:userID', name:"OverViewPage", component: OverViewPage}
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router