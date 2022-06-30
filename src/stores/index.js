import { createPinia } from "pinia/dist/pinia";
import { useLocaleStore } from "./locale";

const store = createPinia({
  useLocaleStore,
});

export default store;
