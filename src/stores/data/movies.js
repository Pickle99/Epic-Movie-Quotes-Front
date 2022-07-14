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
      text_en: "",
      text_ka: "",
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
  actions: {
    resetFields(param) {
      if(param === 'movies-add')
      {
        this.title_en = "";
        this.title_ka = "";
        this.director_en = "";
        this.director_ka = "";
        this.year = "";
        this.budget = "";
        this.description_en = "";
        this.description_ka = "";
      }
      if(param === 'add-quote')
      {
        this.text_en = "";
        this.text_ka = "";
      }
    }
  }
});
