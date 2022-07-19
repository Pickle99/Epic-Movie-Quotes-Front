<template>
  <div class="absolute mt-10"><img src="@/assets/icons/triangle.svg" alt="svg"/></div>
  <div class="max-h-[40rem] overflow-y-scroll p-7 text-white text-xl w-[60rem] bg-black absolute mt-16 -ml-96 ">
    <div class="flex justify-between items-center mb-7">
      <h1 class="text-2xl font-bold">Notifications</h1>
      <p class="underline text-sm">Mark as all read</p>
    </div>
    <NotificationFromComponent
      v-for="notification in notifications"
      :key="notification"
      :username="notification.action_from"
      :reaction="notification.action"
      :avatar="notification.avatar"
      :timestamp="notification.created_at"
    />
  </div>
</template>


<script>
import NotificationFromComponent from '@/components/Main/NotificationFromComponent.vue'
import {useRequestsStore} from '@/stores/requests.js';
import { useLocalStorageStore } from "@/stores/localStorage.js";
import { mapWritableState } from "pinia";
export default {
  computed: {
    ...mapWritableState(useRequestsStore, ["notifications"]),
    ...mapWritableState(useLocalStorageStore, ["userId"]),
  },
  components: {
    NotificationFromComponent
  },
  created(){
    window.Echo.private('showNotification.' + this.userId)
      .listen('ShowNotification', ({notification}) => {
        this.notifications.push(notification);
        console.log(this.notifications);
      });
  },
}
</script>

