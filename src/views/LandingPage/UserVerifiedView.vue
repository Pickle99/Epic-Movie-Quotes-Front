<template>
  <UserVerifiedComponent />
</template>

<script>
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useDataStore } from "@/stores/data/data.js";
import UserVerifiedComponent from "@/components/Landing/UserVerifiedComponent.vue";
import { setJwtToken } from "@/helpers/jwt/index.js";
export default {
  components: {
    UserVerifiedComponent,
  },
  computed: {
    ...mapWritableState(useDataStore, ["data"]),
  },
  methods: {
    redirect() {
      axios
        .post(`successfully-verified/${this.$route.params.token}`)
        .then((response) => {
          setJwtToken(response.data.access_token, response.data.expires_in);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.redirect();
  },
};
</script>
