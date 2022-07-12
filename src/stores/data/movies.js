import { defineStore } from "pinia";

export const useMoviesStore = defineStore("movies", {
  state: () => {
    return {
      title_en: "",
      title_ka: "",
      director_en: "",
      director_ka: "",
      year: "",
      budget: "",
      description_en: "",
      description_ka: "",
    };
  },
  getters: {
    movieYear(state) {
      return parseInt(state.year) || null;
    },
    movieBudget(state) {
      return parseInt(state.budget) || null;
    },
  },
});
