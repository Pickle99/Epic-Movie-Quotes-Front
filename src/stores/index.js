import { createPinia } from "pinia/dist/pinia";
import { useLocaleStore } from "@/stores/locale.js";
import { useDataStore } from "@/stores/data/data.js";
import { useMoviesStore } from "@/stores/data/movies.js";
import { useRequestsStore } from "@/stores/requests.js";
import { useLocalStorageStore } from "@/stores/localStorage.js";
const store = createPinia({
  useLocaleStore,
  useDataStore,
  useMoviesStore,
  useRequestsStore,
  useLocalStorageStore,
});

export default store;
