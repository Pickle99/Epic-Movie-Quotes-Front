<template>
  <header class="fixed w-screen bg-[#222030] z-10">
    <div class="flex justify-between mx-40 my-5 items-center">
      <div>
        <h1 class="text-[#DDCCAA]">{{ $t("message.movie_quotes") }}</h1>
      </div>

      <div class="flex text-white items-center">
        <div class="flex flex-col items-center">
          <div>

            <div v-if="newNotificationsLength" class="absolute ml-3 -mt-1">
              <div class="bg-red-500 rounded-full text-center w-7 justify-end">
                <p class="text-[14px]">{{newNotificationsLength}}</p>
              </div>
            </div>

            <img src="@/assets/icons/bell.svg" class="cursor-pointer" alt="icon" @click="showHideNotification" />
          </div>
          <NotificationComponent :class="!showNotification ? 'hidden' : ''"/>
        </div>

        <SetLanguage class="mx-8" />
        <p 
          class="hover:cursor-pointer border-white border-2 px-6 py-2 rounded-md"
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
import NotificationComponent from '@/components/Main/NotificationComponent.vue'
import { mapWritableState, mapGetters } from "pinia";
import { useNotificationsStore } from "@/stores/notifications.js";
import {useQuotesStore} from "@/stores/formData/quotes.js";

export default {
  components: {
    SetLanguage,
    NotificationComponent
  },
  data(){
    return {
    showNotification: false,
    }
  },
  mounted(){
    this.handleGetNotifications();
    this.handleGetQuote();
  },
  computed: {
    ...mapWritableState(useNotificationsStore, ["notifications"]),
    ...mapGetters(useNotificationsStore, ["newNotificationsLength"]),
    ...mapWritableState(useQuotesStore, ["allQuotes"]),
  },
  methods: {
    handleGetNotifications() {
      axios.get("notifications").then((res) => {
        this.notifications = Array.from(res.data);
        this.notifications.sort(function(a, b) {
          return new Date(b.created_date) - new Date(a.created_date);
        });
        console.log(this.notifications);
      })
        .catch((err) => {
          console.log(err);
        });
    },
    handleGetQuote() {
      if(this.page > this.lastPage) { return }
      axios.get(`feed?page=${this.page}`).then((res) => {
        this.allQuotes.push(...res.data.data);
        this.allQuotes.sort(function (a,b){
          return new Date(b.created_at) - new Date(a.created_at)
        });
        console.log(this.allQuotes);
      })
        .catch((err) => {
          console.log(err);
        });
    },
    showHideNotification(){
      this.showNotification = !this.showNotification
    },
    logout() {
      axios
        .post("logout")
        .then(() => {
          localStorage.removeItem("username");
          localStorage.removeItem("avatar");
          localStorage.removeItem('userId');
          setJwtToken("", "");
          this.$router.push({name: 'landing'})
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
