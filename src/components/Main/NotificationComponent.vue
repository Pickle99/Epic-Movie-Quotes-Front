<template>
  <div>
    <div class="absolute mt-3 -ml-5"><img src="@/assets/icons/triangle.svg" alt="svg"/></div>
    <div class="rounded-md max-h-[40rem] overflow-y-scroll p-7 text-white text-xl w-[60rem] bg-black absolute mt-8 -ml-[37rem]">
      <div class="flex justify-between items-center mb-7">
        <h1 class="text-2xl font-bold">Notifications</h1>
        <p class="underline text-sm cursor-pointer" @click="handleMarkNotificationsAsAllRead">Mark as all read</p>
      </div>
      <NotificationFromComponent
        v-for="notification in notifications"
        :key="notification"
        :username="notification.action_from"
        :reaction="notification.action"
        :avatar="notification.avatar"
        :timestamp="notification.created_at"
        :phase="notification.notification_phase"
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
export default {
  computed: {
    ...mapWritableState(useLocalStorageStore, ["userId"]),
    ...mapWritableState(useNotificationsStore, ["markedAsAllRead", "notifications"]),
  },
  components: {
    NotificationFromComponent
  },
  created(){
    window.Echo.private('showNotification.' + this.userId)
      .listen('ShowNotification', ({notification}) => {
        this.notifications.unshift(notification);
        console.log(this.notifications);
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

