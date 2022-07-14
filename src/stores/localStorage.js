import { defineStore } from "pinia";

export const useLocalStorageStore = defineStore("localStorage", {
  state: () => {
    return {
      username: localStorage.getItem('username'),
      avatar: localStorage.getItem('avatar'),
    };
  },
});
