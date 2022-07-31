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
import AddMovieView from "@/views/MainPage/AddMovieView.vue";
import MovieDescriptionView from "@/views/MainPage/MovieDescriptionView.vue";
import AddQuoteView from "@/views/MainPage/AddQuoteView.vue";
import EditQuoteView from "@/views/MainPage/EditQuoteView.vue";
import EditMovieView from "@/views/MainPage/EditMovieView.vue";
import ShowQuoteView from "@/views/MainPage/ShowQuoteView.vue";
import GoogleCallback from "@/views/LandingPage/GoogleCallback.vue";
import UserProfileView from "@/views/MainPage/UserProfileView.vue";
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
      },
      beforeEnter: [Authorized],
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
      path: "/my-list-of-movies",
      name: "movies",
      component: UserMoviesView,
      beforeEnter: [Guest],
    },
    {
      path: "/movies/add",
      name: "movies-add",
      components: {
        default: UserMoviesView,
        AddMovieView,
      },
      beforeEnter: [Guest],
    },
    {
      path: "/movie/:movie/description",
      name: "movie-description",
      component: MovieDescriptionView,
      beforeEnter: [Guest],
    },
    {
      path: "/movie/:movie/add-quote",
      name: "add-quote",
      component: AddQuoteView,
      beforeEnter: [Guest],
    },
    {
      path: "/movie/:movie/quote/:quote/edit",
      name: "edit-quote",
      component: EditQuoteView,
      beforeEnter: [Guest],
    },
    {
      path: "/movie/:movie/edit",
      name: "edit-movie",
      component: EditMovieView,
      beforeEnter: [Guest],
    },
    {
      path: "/movie/:movie/quote/:quote",
      name: "show-quote",
      component: ShowQuoteView,
      beforeEnter: [Guest],
    },
    {
      path: "/google-callback",
      name: "google-callback",
      component: GoogleCallback,
      beforeEnter: [Authorized],
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfileView,
      beforeEnter: [Guest],
    },
  ],
});

export default router;
