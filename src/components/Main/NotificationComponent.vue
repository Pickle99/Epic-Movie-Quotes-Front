<template>
  <div class="flex justify-center">
    <div class="rounded-md w-screen max-h-[28rem]  md:max-h-[40rem] overflow-y-scroll p-7 text-white text-xl md:w-[60rem] bg-black absolute mt-8 md:-ml-[37rem]">
      <div class="flex justify-between items-center mb-7">
        <h1 class="text-2xl font-bold">{{$t('message.notifications')}}</h1>
        <p class="underline text-sm cursor-pointer" @click="handleMarkNotificationsAsAllRead">{{$t('message.mark_as_all_read')}}</p>
      </div>
      <NotificationFromComponent
        v-for="notification in notifications"
        :key="notification"
        :username="notification.action_from"
        :reaction="notification.action"
        :avatar="notification.avatar"
        :timestamp="notification.created_at"
        :phase="notification.notification_state"
        :notification-id="notification.id"
        :quote-id="notification.quote_id"
      />
    </div>
  </div>
</template>


<script>
import NotificationFromComponent from '@/components/Main/NotificationFromComponent.vue'
import { useLocalStorageStore } from "@/stores/localStorage.js";
import { useNotificationsStore } from "@/stores/notifications.js";
import { mapWritableState } from "pinia";
import axios from "@/config/axios/index.js";
import IconTriangle from "@/components/icons/IconTriangle.vue";
export default {
  computed: {
    ...mapWritableState(useLocalStorageStore, ["userId"]),
    ...mapWritableState(useNotificationsStore, ["markedAsAllRead", "notifications"]),
  },
  components: {
    IconTriangle,
    NotificationFromComponent
  },
  created(){
    window.Echo.private('showNotification.' + this.userId)
      .listen('ShowNotification', ({notification}) => {
        console.log(notification);
          if(!notification.comment_id){
            const isQuoteLiked = this.notifications.find((item) => item.user_id === notification.user_id && item.quote_id === notification.quote_id && item.like_id !== null);
            console.log(isQuoteLiked, '123');
            if(!isQuoteLiked){
              this.notifications.unshift(notification);
            }
          } else {
            this.notifications.unshift(notification);
            console.log('here')
          }
      });
  },
  methods: {
    handleMarkNotificationsAsAllRead() {
      axios.get("notifications/mark-all-as-read").then(() => {
        this.markedAsAllRead = true;
      })
        .catch((err) => {
          console.log(err);
        });
    },
  }
}
</script>

