import { createPinia } from "pinia/dist/pinia";
import { useLocaleStore } from "@/stores/locale.js";
import { useUserDataStore } from "@/stores/formData/user.js";
import { useMoviesStore } from "@/stores/formData/movies.js";
import { useRequestsStore } from "@/stores/requests.js";
import { useLocalStorageStore } from "@/stores/localStorage.js";
import { useNotificationsStore } from "@/stores/notifications.js";
import { useQuotesStore } from "@/stores/formData/quotes.js";
const store = createPinia({
  useLocaleStore,
  useUserDataStore,
  useMoviesStore,
  useRequestsStore,
  useLocalStorageStore,
  useNotificationsStore,
  useQuotesStore,
});

export default store;
