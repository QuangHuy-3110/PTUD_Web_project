import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";

const routes = [
    {
        path: "/",
        name: "loginform",
        component: Login,
    },

    {
        path: "/nhanvien/",
        name: "nhanvien",
        component: () => import("@/views/Nhanvien.vue"),
    },

    {
        path: "/docgia",
        name: "docgia",
        component: () => import("@/views/Docgia.vue"),
    },
    
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;