import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => {
    return {
      markedAsAllRead: false,
      page: 1,
      lastPage: 1,
      notifications: [],
    };
  },
  getters: {
    newNotificationsLength(state){
      if(!state.markedAsAllRead){
        const object = state.notifications.filter((item) => item.notification_phase !== null);
        return object.length;
      }else return false;
    }
  }

});
