<template>
  <OnClickOutside @trigger="close">
    <div class="flex justify-center">
      <div
        class="rounded-md w-screen max-h-[28rem] md:max-h-[40rem] overflow-y-scroll p-7 text-white text-xl md:w-[60rem] bg-black absolute mt-8 md:-ml-[37rem]"
      >
        <div class="flex justify-between items-center mb-7">
          <h1 class="text-2xl font-bold">{{ $t("message.notifications") }}</h1>
          <p
            class="underline text-sm cursor-pointer"
            @click="handleMarkNotificationsAsAllRead"
          >
            {{ $t("message.mark_as_all_read") }}
          </p>
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
  </OnClickOutside>
</template>

<script>
import NotificationFromComponent from "@/components/Main/NotificationFromComponent.vue";
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import { useNotificationsStore } from "@/stores/useNotificationsStore.js";
import { mapWritableState } from "pinia";
import axios from "@/config/axios/index.js";
import { OnClickOutside } from "@vueuse/components";
export default {
  components: {
    NotificationFromComponent,
    OnClickOutside,
  },
  computed: {
    ...mapWritableState(useLocalStorageStore, ["userId"]),
    ...mapWritableState(useNotificationsStore, [
      "markedAsAllRead",
      "notifications",
      "isNotificationVisible",
    ]),
  },
  created() {
    window.Echo.private("showNotification." + parseInt(this.userId)).listen(
      "ShowNotification",
      ({ notification }) => {
        if (!notification.comment_id) {
          const isQuoteLiked = this.notifications.find(
            (item) =>
              item.user_id === notification.user_id &&
              item.quote_id === notification.quote_id &&
              item.like_id !== null
          );
          if (!isQuoteLiked) {
            this.notifications.unshift(notification);
          }
          console.log("add before");
        } else {
          console.log("lol");
          this.notifications.unshift(notification);
        }
      }
    );
  },
  methods: {
    close() {
      this.isNotificationVisible = false;
    },
    handleMarkNotificationsAsAllRead() {
      axios
        .get("notifications/mark-all-as-read")
        .then(() => {
          this.markedAsAllRead = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
