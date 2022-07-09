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
        forgot_password: "",
      },
      allGenres: ["Comedy", "Horror", "Action", "Drama", "Romantic"],
      userSelectedGenres: [],
    };
  },
  actions: {
    updateField(state, payload) {
      this.data[state] = payload;
    },
  },
  getters: {
    check(state) {
      const found = state.userSelectedGenres.filter(
        (item) => !state.allGenres.includes(item)
      );
      if (found.length > 0) {
        return false;
      } else return true;
    },
  },
});
