import { defineStore } from "pinia";

export const useLocaleStore = defineStore("locale", {
  state: () => {
    return {
      isDisabled: false,
    };
  },
  actions: {
    setDisabled() {
      this.isDisabled = !this.isDisabled;
    },
  },
});
