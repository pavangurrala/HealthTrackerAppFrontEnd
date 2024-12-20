import {createRouter, createWebHistory} from "vue-router";
import UsersPage from "@/views/UsersPage.vue";
import UserActivities from "@/views/UserActivities.vue";
import HomePage from "@/views/HomePage.vue"

const routes =[
    {path:'/', name:"Home", component: HomePage},
    {path:'/users', name:"Users",component: UsersPage},
    {path:'/activities',name:"Activities", component: UserActivities},
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router