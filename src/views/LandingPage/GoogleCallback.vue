<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <p class="text-white text-3xl">{{ $t("message.redirecting") }}</p>
  </div>
</template>

<script>
import axios from "@/config/axios/index.js";
import { setJwtToken } from "@/helpers/jwt/index.js";
import { useRequestsStore } from "@/stores/useRequestsStore.js";
import { mapWritableState } from "pinia";
export default {
  computed: {
    ...mapWritableState(useRequestsStore, ["user", "currentUser"]),
  },
  mounted() {
    this.handleCallback();
  },
  methods: {
    handleCallback() {
      const code = this.$route.query.code;
      axios
        .get("auth/google/callback", {
          params: { code: code },
        })
        .then((res) => {
          this.user = res.data.user;
          localStorage.setItem("username", this.user.username);
          localStorage.setItem("avatar", this.user.avatar);
          localStorage.setItem("userId", this.user.id);
          setJwtToken(res.data.access_token, res.data.expires_in);
          this.$router.push({ name: "feed" });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
