<template>
  <h1 class="text-6xl text-white">Verified!</h1>
</template>

<script>
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useDataStore } from "@/stores/data/data.js";
export default {
  computed: {
    ...mapWritableState(useDataStore, ["data"]),
  },
  methods: {
    redirect() {
      axios.get(`successfully-verified/${this.$route.params.token}`);
    },
  },
  mounted() {
    this.redirect();
  },
};
</script>
