<template>
  <UserVerifiedComponent />
</template>

<script>
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useDataStore } from "@/stores/data/data.js";
import UserVerifiedComponent from "@/components/UserVerifiedComponent.vue";
export default {
  components: {
    UserVerifiedComponent,
  },
  computed: {
    ...mapWritableState(useDataStore, ["data"]),
  },
  methods: {
    redirect() {
      axios.post(`successfully-verified/${this.$route.params.token}`);
    },
  },
  mounted() {
    this.redirect();
  },
};
</script>
