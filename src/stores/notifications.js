import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => {
    return {
      markedAsAllRead: false,
      notifications: [],
      isNotificationVisible:false,
    };
  },
 actions: {
    showHideNotification(){
      this.isNotificationVisible = !this.isNotificationVisible;
    },
    hideNotification(){
      this.isNotificationVisible = false;
    },
  },
  getters: {
    newNotificationsLength(state){
      if(!state.markedAsAllRead){
        const object = state.notifications.filter((item) => item.notification_state !== null);
        return object.length;
      }else return false;
    }
  }

});
