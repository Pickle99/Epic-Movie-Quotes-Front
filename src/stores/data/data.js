import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      data: {
        username: "",
        user: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  actions: {
    updateField(state, payload) {
      this.data[state] = payload;
    },
  },
});
