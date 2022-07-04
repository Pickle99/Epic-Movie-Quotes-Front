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
    {
      path: "/forgot-password",
      name: "forgot-password",
      components: {
        default: () => import("@/views/HomeView.vue"),
        ForgotPasswordView: () => import("@/views/ForgotPasswordView.vue"),
      },
    },
    {
      path: "/reset-password/:token/:email",
      name: "password-reset",
      components: {
        default: () => import("@/views/HomeView.vue"),
        PasswordResetView: () => import("@/views/PasswordResetView.vue"),
      },
    },
    {
      path: "/movies",
      name: "movies",
      component: () => import("@/views/MoviesView.vue"),
    },
    {
      path: "/successfully-verified/:token",
      name: "user-verified",
      components: {
        default: () => import("@/views/HomeView.vue"),
        UserVerifiedView: () => import("@/views/UserVerifiedView.vue"),
      },
    },
    {
      path: "/password-reset-sent",
      name: "password-reset-sent",
      component: () => import("@/views/PasswordResetSentView.vue"),
    },
    {
      path: "/password-reset-success",
      name: "reset-success",
      component: () => import("@/views/PasswordResetSuccess.vue"),
    },
  ],
});

export default router;
