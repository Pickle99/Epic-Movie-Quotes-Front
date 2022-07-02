import { createPinia } from "pinia/dist/pinia";
import { useLocaleStore } from "@/stores/locale.js";
import { useDataStore } from "@/stores/data/data.js";
const store = createPinia({
  useLocaleStore,
  useDataStore,
});

export default store;
