import { createPinia } from "pinia/dist/pinia";
import { useLocaleStore } from "@/stores/locale.js";
import { useDataStore } from "@/stores/data/data.js";
import { useMoviesStore } from "@/stores/data/movies.js";
const store = createPinia({
  useLocaleStore,
  useDataStore,
  useMoviesStore,
});

export default store;
