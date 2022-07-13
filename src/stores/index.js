import { createPinia } from "pinia/dist/pinia";
import { useLocaleStore } from "@/stores/locale.js";
import { useDataStore } from "@/stores/data/data.js";
import { useMoviesStore } from "@/stores/data/movies.js";
import { useRequestsStore } from "@/stores/requests.js";

const store = createPinia({
  useLocaleStore,
  useDataStore,
  useMoviesStore,
  useRequestsStore,
});

export default store;
