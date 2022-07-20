import { createPinia } from "pinia/dist/pinia";
import { useLocaleStore } from "@/stores/locale.js";
import { useDataStore } from "@/stores/data/data.js";
import { useMoviesStore } from "@/stores/data/movies.js";
import { useRequestsStore } from "@/stores/requests.js";
import { useLocalStorageStore } from "@/stores/localStorage.js";
import { useNotificationsStore } from "@/stores/notifications.js";
import { useQuotesStore } from "@/stores/data/quotes.js";
const store = createPinia({
  useLocaleStore,
  useDataStore,
  useMoviesStore,
  useRequestsStore,
  useLocalStorageStore,
  useNotificationsStore,
  useQuotesStore,
});

export default store;
