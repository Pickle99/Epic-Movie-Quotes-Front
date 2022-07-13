<template>
  <header class="fixed w-screen bg-[#222030] z-10">
    <div class="flex justify-between mx-40 my-5 items-center">
      <div>
        <h1 class="text-[#DDCCAA]">{{ $t("message.movie_quotes") }}</h1>
      </div>

      <div class="flex text-white items-center">
        <img src="@/assets/icons/bell.svg" alt="img" />
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

export default {
  components: {
    SetLanguage,
  },
  methods: {
    logout() {
      axios
        .post("logout")
        .then(() => {
          localStorage.removeItem("username");
          localStorage.removeItem("avatar");
          setJwtToken("", "");
          window.location.href = "http://localhost:3000/";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
