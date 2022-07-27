import { createApp } from "vue";
import "@/index.css";
import App from "@/App.vue";
import router from "@/router/index.js";
import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages";
import store from "@/stores/index.js";
import Broadcast from '@/config/broadcast/broadcast.js'
import i18n from '@/config/i18next/index.js';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(Broadcast);
app.use(i18n);


app.mount("#app");
