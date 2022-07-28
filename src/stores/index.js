import { createPinia } from "pinia/dist/pinia";
import { useLocaleStore } from "@/stores/locale.js";
import { useUserStore } from "@/stores/user.js";
import { useMoviesStore } from "@/stores/movies.js";
import { useRequestsStore } from "@/stores/requests.js";
import { useLocalStorageStore } from "@/stores/localStorage.js";
import { useNotificationsStore } from "@/stores/notifications.js";
import { useQuotesStore } from "@/stores/quotes.js";
const store = createPinia({
  useLocaleStore,
  useUserStore,
  useMoviesStore,
  useRequestsStore,
  useLocalStorageStore,
  useNotificationsStore,
  useQuotesStore,
});

export default store;
