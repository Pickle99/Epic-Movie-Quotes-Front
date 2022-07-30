import { createPinia } from "pinia/dist/pinia";
import { useUserStore } from "@/stores/useUserStore.js";
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import { useRequestsStore } from "@/stores/useRequestsStore.js";
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import { useNotificationsStore } from "@/stores/useNotificationsStore.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
const store = createPinia({
  useUserStore,
  useMoviesStore,
  useRequestsStore,
  useLocalStorageStore,
  useNotificationsStore,
  useQuotesStore,
});

export default store;
