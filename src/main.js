import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages";
import store from "./stores/index";
import { createI18n } from "vue-i18n";

const app = createApp(App);

app.use(store);
app.use(router);

const messages = {
  en: {
    message: {
      get_started: "Get started",
      sign_up: "Sign up",
      sign_in: "Sign in",
      eng: "Eng",
      geo: "Geo",
      movie_quotes: "MOVIE QUOTES",
      find_any_quote: "Find any quote",
      millions_of_movie_lines: "millions of movie lines",
      name: "Name",
      email: "Email",
      password: "Password",
      confirm_password: "Confirm Password",
      sign_up_google: "Sign up with Google",
      already_have_an_account: "Already have an account",
      login: "Log in",
      create_an_account: "Create an account",
      start_your_journey: "Start your journey",
      enter_your_email: "Enter your email",
      at_least_3_max_15: "At least 3 & max.15 lower case characters",
      at_least_8_max_15: "At least 8 & max.15 lower case characters",
      log_in_to_acc: "Log in to your account",
      welcome_back: "Welcome back! Please enter your details",
      remember_me: "Remember me",
      forgot_password: "Forgot password",
      sign_in_google: "Sign in with Google",
      dont_have_an_account_yet: "Don't have an account yet",
    },
  },
  ka: {
    message: {
      get_started: "დაწყება",
      sign_up: "რეგისტრაცია",
      sign_in: "შესვლა",
      eng: "ინგ",
      geo: "ქარ",
      movie_quotes: "ფილმის ციტატები",
      find_any_quote: "იპოვე ნებისმიერი ციტატა",
      millions_of_movie_lines: "მილიონობით ფილმების ხაზში",
      name: "სახელი",
      email: "ფოსტა",
      password: "პაროლი",
      confirm_password: "გაიმეორეთ პაროლი",
      sign_up_google: "რეგისტრაცია გუგლით",
      create_an_account: "ანგარიშის შექმნა",
      start_your_journey: "დაიწყეთ თავგადასავალი",
      already_have_an_account: "უკვე გაქვთ ანგარიში",
      login: "შესვლა",
      enter_your_email: "ჩაწერეთ თქვენი მეილი",
      at_least_3_max_15: "მინიმუმ 3 & მაქსიმუმ 15 სიმბოლო",
      at_least_8_max_15: "მინიმუმ 8 & მაქსიმუმ 15 სიმბოლო",
      log_in_to_acc: "ანგარიშზე შესვლა",
      welcome_back: "კეთილი იყოს თქვენი დაბრუნება",
      remember_me: "დამიმახსოვრეთ",
      forgot_password: "დამავიწყდა პაროლი",
      sign_in_google: "გუგლით შესვლა",
      dont_have_an_account_yet: "არ გაქვთ ანგარიში",
    },
  },
};

const i18n = createI18n({
  locale: "en",
  fallBackLocale: "en",
  messages,
});

app.use(i18n);

app.mount("#app");
