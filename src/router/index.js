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
      // component: () => import("@/views/RegisterView.vue"),
      components: {
        default: () => import("@/views/HomeView.vue"),
        RegisterView: () => import("@/views/RegisterView.vue"),
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: () => import("@/views/HomeView.vue"),
        AuthView: () => import("@/views/AuthView.vue"),
      },
    },
    {
      path: "/email-verification-sent",
      name: "email-sent",
      components: {
        default: () => import("@/views/HomeView.vue"),
        EmailSentView: () => import("@/views/EmailSentView.vue"),
      },
    },
  ],
});

export default router;
