import { defineStore } from "pinia";

export const useQuotesStore = defineStore("quotes", {
  state: () => {
    return {
      isModalOpen:false,
      allQuotes: [],
      filteredQuotes: [],
      text_en: "",
      text_ka: "",
      page: 1,
      lastPage: 2,
      search: "",
      comments: [],
      chosenMovieId: null,
      chosenMovie: "",
      allUsersMovies: [],
      imageForQuote: "",
      commentText: "",
    };
  },
  getters: {
    searchIn(state){
      if(state.search.startsWith('@')){
        return 'm'+state.search.substring(1)
      } else if(state.search.startsWith('#')){
        return 'q'+state.search.substring(1)
      }
    },
    filteredFeedView(state){
    if(state.search)
    {
      return state.filteredQuotes;
    } else return false;
    },
    writeQuoteData() {
      const formData = new FormData();
      formData.append("text_en", this.text_en);
      formData.append("text_ka", this.text_ka);
      formData.append("image", this.imageForQuote);
      formData.append("movieId", this.chosenMovieId);
      return formData;
    },
    addQuoteData() {
      const formData = new FormData();
      formData.append("text_en", this.text_en);
      formData.append("text_ka", this.text_ka);
      formData.append("image", this.imageForQuote);
      return formData;
    },
    editQuoteData(){
      const formData = new FormData();
      formData.append("text_en", this.text_en);
      formData.append("text_ka", this.text_ka);
      if(this.imageForQuote)
      {
        formData.append('image', this.imageForQuote)
      }
      return formData;
    }
  },
  actions: {
    resetPage(){
      this.page = 1;
      this.lastPage = 2;
    },
    writeQuoteResetFields() {
      this.text_en = "";
      this.text_ka = "";
      this.chosenMovieId = null;
      this.chosenMovie = "";
      this.imageForQuote = "";
    },
  }
});
