<template>
  <header class="fixed w-screen bg-[#222030] z-10">
    <div class="flex justify-between mx-10 md:mx-40 my-5 items-center">
      <div>
        <h1 class="text-[#DDCCAA] hidden md:block">
          {{ $t("message.movie_quotes") }}
        </h1>
        <IconThreeLines class="md:hidden" @click="showDropdown" />
      </div>

      <div class="flex text-white items-center">
        <IconMagnifyingGlass class="mr-4 md:hidden" @click="showSearch" />
        <div class="flex flex-col items-center">
          <div>
            <div v-if="newNotificationsLength" class="absolute ml-3 -mt-1">
              <div class="bg-red-500 rounded-full text-center w-7 justify-end">
                <p class="text-[14px]">{{ newNotificationsLength }}</p>
              </div>
            </div>
            <div class="flex flex-col items-center">
              <IconBell class="cursor-pointer" @click="showHideNotification" />
              <IconTriangle
                v-if="isNotificationVisible"
                class="absolute mt-12"
              />
            </div>
          </div>
        </div>
        <SetLanguage class="mx-8 hidden md:block" />
        <p
          class="hidden md:block hover:cursor-pointer border-white border-2 px-6 py-2 rounded-md"
          @click="logout()"
        >
          {{ $t("message.log_out") }}
        </p>
      </div>
    </div>
  </header>
</template>
<script>
import SetLanguage from "@/components/Landing/SetLanguage.vue";
import axios from "@/config/axios/index.js";
import { setJwtToken } from "@/helpers/jwt/index.js";
import NotificationComponent from "@/components/Main/NotificationComponent.vue";
import { mapWritableState, mapState, mapActions } from "pinia";
import { useNotificationsStore } from "@/stores/useNotificationsStore.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { useRequestsStore } from "@/stores/useRequestsStore.js";
import IconBell from "@/components/icons/IconBell.vue";
import IconThreeLines from "@/components/icons/IconThreeLines.vue";
import IconMagnifyingGlass from "@/components/icons/IconMagnifyingGlass.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import IconTriangle from "@/components/icons/IconTriangle.vue";
export default {
  components: {
    IconTriangle,
    IconMagnifyingGlass,
    IconThreeLines,
    IconBell,
    SetLanguage,
    NotificationComponent,
  },
  computed: {
    ...mapWritableState(useQuotesStore, ["allQuotes", "lastPage", "page"]),
    ...mapWritableState(useRequestsStore, ["quotesForNotifications"]),
    ...mapWritableState(useNotificationsStore, [
      "notifications",
      "isNotificationVisible",
    ]),
    ...mapState(useNotificationsStore, ["newNotificationsLength"]),
  },
  created() {
    this.handleGetNotifications();
    this.handleGetPaginatedQuotes();
    this.handleGetAllQuotes();
  },
  methods: {
    ...mapActions(useNotificationsStore, [
      "showHideNotification",
      "hideNotification",
    ]),
    ...mapActions(useUserStore, ["showSearch", "showDropdown"]),
    handleGetNotifications() {
      axios
        .get("notifications")
        .then((res) => {
          this.notifications = Array.from(res.data.data);
          this.notifications.sort(function (a, b) {
            return new Date(b.created_date) - new Date(a.created_date);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleGetAllQuotes() {
      axios.get("quotes").then((res) => {
        this.quotesForNotifications = res.data.data;
      });
    },
    handleGetPaginatedQuotes() {
      axios
        .post(`feed?page=${this.page}`)
        .then((res) => {
          this.allQuotes = res.data.data;
          this.lastPage = res.data.meta.last_page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      axios
        .post("logout")
        .then(() => {
          localStorage.removeItem("username");
          localStorage.removeItem("avatar");
          localStorage.removeItem("userId");
          setJwtToken("", "");
          this.$router.push({ name: "landing" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
