<template>
  <article class="mt-10">
    <div class="flex items-center">
      <div>
        <img
          class="rounded-full w-12 md:w-16"
          :src="back_url + avatar"
          alt="user-avatar"
        />
      </div>
      <div>
        <p class="ml-5">{{ user }}</p>
      </div>
    </div>
    <div class="border-b border-gray-600 w-[16rem] md:w-[35.5rem] ml-20">
      <p class="mb-5 break-words">
        {{ text }}
      </p>
    </div>
  </article>
</template>

<script>
import { mapState } from "pinia";
import { useEnvStore } from "@/stores/useEnvStore";

export default {
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
};
</script>
