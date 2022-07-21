<template>
  <div class="text-white flex justify-center mb-32">
    <div class="bg-[#11101A] w-[43rem] z-10">
      <div class="flex items-center justify-center w-full p-4">
        <div class="flex justify-start w-1/4"></div>
        <div class="flex justify-center w-2/4 font-bold">
          <p>Write New Quote</p>
        </div>
        <div class="flex justify-end w-1/4">
          <div class="cursor-pointer" @click="close()">
            <img src="@/assets/icons/x-icon.svg" alt="img" />
          </div>
        </div>
      </div>
      <div class="border-gray-600 border-b-2 w-full"></div>
      <div class="flex p-4">
        <div class="flex items-center">
          <img width="48" :src="`http://localhost:8000/${localAvatar}`" alt="img" />
          <p class="ml-4">{{localUser}}</p>
        </div>
      </div>
      <div class="flex flex-col p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapActions } from "pinia";
import { useLocalStorageStore } from "@/stores/localStorage.js";
import { useQuotesStore } from "@/stores/formData/quotes.js";
export default {
  computed:{
    ...mapWritableState(useLocalStorageStore, {
      localUser: "username",
      localAvatar: "avatar",
      localUserId: "userId",
    }),
    ...mapWritableState(useQuotesStore, ["isModalOpen"])
  },
  methods: {
    ...mapActions(useQuotesStore, ["resetFields"]),
    close() {
     this.isModalOpen = false;
     this.resetFields();
    },
  },
}

</script>