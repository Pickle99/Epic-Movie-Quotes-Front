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
      allUsersMovies: [],
      chosenMovieId: null,
      chosenMovie: "",
      imageForQuote: "",
      userMovies: [],
      userMoviesSearch: "",
    };
  },
  getters: {
    findMovie(state) {
   return state.chosenMovie =  state.allUsersMovies.find((movie) => movie.id === state.chosenMovieId);
     },
    movieYear(state) {
      return parseInt(state.year) || null;
    },
    movieBudget(state) {
      return parseInt(state.budget) || null;
    },
    writeQuoteData() {
      const formData = new FormData();
      formData.append("text_en", this.text_en);
      formData.append("text_ka", this.text_ka);
      formData.append("image", this.imageForQuote);
      formData.append("movieId", this.chosenMovieId);
      return formData;
    }
  },
  actions: {
    resetFields() {
        this.title_en = "";
        this.title_ka = "";
        this.director_en = "";
        this.director_ka = "";
        this.year = "";
        this.budget = "";
        this.description_en = "";
        this.description_ka = "";
        this.text_en = "";
        this.text_ka = "";
    },
  }
});
