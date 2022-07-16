<template>
  <UserVerifiedComponent />
</template>

<script>
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useDataStore } from "@/stores/data/data.js";
import UserVerifiedComponent from "@/components/Landing/UserVerifiedComponent.vue";
import { setJwtToken } from "@/helpers/jwt/index.js";
import { useRequestsStore } from "@/stores/requests.js";
export default {
  components: {
    UserVerifiedComponent,
  },
  computed: {
    ...mapWritableState(useDataStore, ["data"]),
    ...mapWritableState(useRequestsStore, ["user"]),
  }, 
  mounted() {
    this.redirect();
  },
  methods: {
    redirect() {
      axios
        .post(`successfully-verified/${this.$route.params.token}`)
        .then((response) => {
          this.user = response.data.user;
          setJwtToken(response.data.access_token, response.data.expires_in);
          localStorage.setItem("username", this.user.username);
          localStorage.setItem("avatar", this.user.avatar);
          localStorage.setItem('userId', this.user.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
