import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/AuthView.vue"),
    },
    {
      path: "/email-verification-sent",
      name: "email-sent",
      component: () => import("@/views/EmailSentView.vue"),
    },
  ],
});

export default router;
