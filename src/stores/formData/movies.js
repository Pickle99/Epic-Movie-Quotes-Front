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
      userMovies: [],
      userMoviesSearch: "",
      userSelectedGenres: [],
      allGenres: [],
      imageForMovie: "",
      genresError: "",
      movieDescriptionData: "",
      movieDescriptionQuoteData: "",
    };
  },
  getters: {
    movieData(state) {
      const formData = new FormData();
      const arr = state.userSelectedGenres;
      formData.append("title_en", state.title_en);
      formData.append("title_ka", state.title_ka);
      formData.append("director_en", state.director_en);
      formData.append("director_ka", state.director_ka);
      formData.append("description_en", state.description_en);
      formData.append("description_ka", state.description_ka);
      if (state.year) {
        formData.append("year", state.movieYear);
      }
      formData.append("budget", state.movieBudget);
      if(this.imageForMovie){
        formData.append("image", state.imageForMovie);
      }
      for (var i = 0; i < arr.length; i++) {
        formData.append("genres[" + i + "]", arr[i]);
      }
      return formData;
    },
    movieYear(state) {
      return parseInt(state.year) || null;
    },
    movieBudget(state) {
      return parseInt(state.budget) || null;
    },
  },
  actions: {
    movieResetFields(){
      this.title_en = "";
      this.title_ka = "";
      this.director_en = "";
      this.director_ka = "";
      this.year = "";
      this.budget = "";
      this.description_en = "";
      this.description_ka = "";
      this.userSelectedGenres = [];
      this.imageForMovie = "";
    },

  }
});
