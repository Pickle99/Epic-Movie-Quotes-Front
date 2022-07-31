<template>
  <div class="text-white flex justify-center mb-32">
    <div class="bg-[#11101A] w-screen md:w-[43rem] z-10">
      <div class="flex items-center justify-center w-full p-4">
        <div class="flex justify-start w-1/4"></div>
        <div class="flex justify-center w-2/4 font-bold">
          <p>{{ $t("message.write_new_quote") }}</p>
        </div>
        <div class="flex justify-end w-1/4">
          <div class="cursor-pointer" @click="close()">
            <IconX />
          </div>
        </div>
      </div>
      <div class="border-gray-600 border-b-2 w-full"></div>
      <div class="flex p-4">
        <div class="flex items-center">
          <img
            width="48"
            :src="back_url+localAvatar"
            alt="user-avatar"
          />
          <p class="ml-4">{{ localUser }}</p>
        </div>
      </div>
      <div class="flex flex-col p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapActions, mapState } from "pinia";
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import IconX from "@/components/icons/IconX.vue";
import { useEnvStore } from "@/stores/useEnvStore";
export default {
  components: { IconX },
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
    ...mapWritableState(useLocalStorageStore, {
      localUser: "username",
      localAvatar: "avatar",
      localUserId: "userId",
    }),
    ...mapWritableState(useQuotesStore, ["isModalOpen"]),
  },
  methods: {
    ...mapActions(useQuotesStore, ["writeQuoteResetFields"]),
    close() {
      this.isModalOpen = false;
      this.writeQuoteResetFields();
    },
  },
};
</script>
