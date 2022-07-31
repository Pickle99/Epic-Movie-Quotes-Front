import { createI18n } from "vue-i18n/index";
import { messages } from "@/config/i18next/messages.js";

const i18n = createI18n({
  locale: localStorage.getItem("locale") || "en",
  fallBackLocale: "en",
  messages,
});

export default i18n;
