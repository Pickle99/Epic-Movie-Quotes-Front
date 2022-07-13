import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/LandingPage/HomeView.vue";
import AuthView from "@/views/LandingPage/AuthView.vue";
import EmailSentView from "@/views/LandingPage/EmailSentView.vue";
import ForgotPasswordView from "@/views/LandingPage/ForgotPasswordView.vue";
import PasswordResetView from "@/views/LandingPage/PasswordResetView.vue";
import FeedView from "@/views/MainPage/FeedView.vue";
import UserVerifiedView from "@/views/LandingPage/UserVerifiedView.vue";
import RegisterView from "@/views/LandingPage/RegisterView.vue";
import PasswordResetSentView from "@/views/LandingPage/PasswordResetSentView.vue";
import PasswordResetSuccess from "@/views/LandingPage/PasswordResetSuccess.vue";
import RouteForbidden from "@/views/Errors/RouteForbidden.vue";
import NotFound from "@/views/Errors/RouteNotFound.vue";
import UserMoviesView from "@/views/MainPage/UserMoviesView.vue";
import NewMovieView from "@/views/MainPage/NewMovieView.vue";
import MovieDescriptionView from "@/views/MainPage/MovieDescriptionView.vue";
import { Guest } from "@/router/guards.js";
import { Authorized } from "@/router/guards.js";

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
      beforeEnter: [Authorized],
    },
    {
      path: "/register",
      name: "register",
      components: {
        default: HomeView,
        RegisterView,
      },
      beforeEnter: [Authorized],
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: HomeView,
        AuthView,
        beforeEnter: [Authorized],
      },
    },
    {
      path: "/email-verification-sent",
      name: "email-sent",
      components: {
        default: HomeView,
        EmailSentView,
      },
      beforeEnter: [Authorized],
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      components: {
        default: HomeView,
        ForgotPasswordView,
      },
      beforeEnter: [Authorized],
    },
    {
      path: "/reset-password/:token/:email",
      name: "password-reset",
      components: {
        default: HomeView,
        PasswordResetView,
      },
      beforeEnter: [Authorized],
    },
    {
      path: "/feed",
      name: "feed",
      component: FeedView,
      beforeEnter: [Guest],
    },
    {
      path: "/successfully-verified/:token",
      name: "user-verified",
      components: {
        default: HomeView,
        UserVerifiedView,
      },
      beforeEnter: [Authorized],
    },
    {
      path: "/password-reset-sent",
      name: "password-reset-sent",
      components: {
        default: HomeView,
        PasswordResetSentView,
      },
      beforeEnter: [Authorized],
    },
    {
      path: "/password-reset-success",
      name: "reset-success",
      components: {
        default: HomeView,
        PasswordResetSuccess,
      },
      beforeEnter: [Authorized],
    },
    {
      path: "/forbidden",
      name: "403",
      component: RouteForbidden,
    },
    {
      path: "/movies",
      name: "movies",
      component: UserMoviesView,
      beforeEnter: [Guest],
    },
    {
      path: "/movies/add",
      name: "movies-add",
      components: {
        default: UserMoviesView,
        NewMovieView,
      },
      beforeEnter: [Guest],
    },
    {
      path: "/movie/:id/description",
      name: "movie-description",
      component: MovieDescriptionView,
    },
  ],
});

export default router;
