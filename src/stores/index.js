import { createPinia } from "pinia";
import { useUserStore } from "@/stores/useUserStore.js";
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import { useRequestsStore } from "@/stores/useRequestsStore.js";
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import { useNotificationsStore } from "@/stores/useNotificationsStore.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { useEnvStore } from "@/stores/useEnvStore.js";
const store = createPinia({
  useUserStore,
  useMoviesStore,
  useRequestsStore,
  useLocalStorageStore,
  useNotificationsStore,
  useQuotesStore,
  useEnvStore,
});

export default store;
