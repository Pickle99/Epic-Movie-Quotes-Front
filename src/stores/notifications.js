import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => {
    return {
      markedAsAllRead: false,
      page: 1,
      lastPage: 1,
    };
  },
  getters: {
    movieYear(state) {
      if(state.markedAsAllRead) {
        return true;
      } else return false;
    },
  },
  actions: {
    resetFields() {
      this.title_en = "";
    },
  }
});
