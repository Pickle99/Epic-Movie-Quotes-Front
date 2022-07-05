import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AuthView from "@/views/AuthView.vue";
import EmailSentView from "@/views/EmailSentView.vue";
import ForgotPasswordView from "@/views/ForgotPasswordView.vue";
import PasswordResetView from "@/views/PasswordResetView.vue";
import MoviesView from "@/views/MoviesView.vue";
import UserVerifiedView from "@/views/UserVerifiedView.vue";
import RegisterView from "@/views/RegisterView.vue";
import PasswordResetSentView from "@/views/PasswordResetSentView.vue";
import PasswordResetSuccess from "@/views/PasswordResetSuccess.vue";
import RouteForbidden from "@/views/Errors/RouteForbidden.vue";
import NotFound from "@/views/Errors/RouteNotFound.vue";
import { isAuthenticated } from "@/router/guards.js";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
    {
      path: "/",
      name: "landing",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      components: {
        default: HomeView,
        RegisterView,
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: HomeView,
        AuthView,
      },
    },
    {
      path: "/email-verification-sent",
      name: "email-sent",
      components: {
        default: HomeView,
        EmailSentView,
      },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      components: {
        default: HomeView,
        ForgotPasswordView,
      },
    },
    {
      path: "/reset-password/:token/:email",
      name: "password-reset",
      components: {
        default: HomeView,
        PasswordResetView,
      },
    },
    {
      path: "/movies",
      name: "movies",
      component: MoviesView,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/successfully-verified/:token",
      name: "user-verified",
      components: {
        default: HomeView,
        UserVerifiedView,
      },
    },
    {
      path: "/password-reset-sent",
      name: "password-reset-sent",
      components: {
        default: HomeView,
        PasswordResetSentView,
      },
    },
    {
      path: "/password-reset-success",
      name: "reset-success",
      components: {
        default: HomeView,
        PasswordResetSuccess,
      },
    },
    {
      path: "/forbidden",
      name: "403",
      component: RouteForbidden,
    },
  ],
});

export default router;
