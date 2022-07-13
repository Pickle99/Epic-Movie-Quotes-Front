import { defineStore } from "pinia";

export const useRequestsStore = defineStore("requests", {
  state: () => {
    return {
      allMovies: [],
      user: [],
    };
  },
});
