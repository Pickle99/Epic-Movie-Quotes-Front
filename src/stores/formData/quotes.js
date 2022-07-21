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
      lastPage: null,
      search: "",
      comments: [],
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
    }
  },
  actions: {
    resetFields(state) {
      state.text_en = "";
      state.text_ka = "";
    },
  }
});
