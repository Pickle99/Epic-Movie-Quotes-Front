import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages";
import store from "@/stores/index.js";
import { createI18n } from "vue-i18n";
import { messages } from "@/messages.js";

const app = createApp(App);

app.use(store);
app.use(router);

const i18n = createI18n({
  locale: localStorage.getItem("locale") || "en",
  fallBackLocale: "en",
  messages,
});

app.use(i18n);

app.mount("#app");
