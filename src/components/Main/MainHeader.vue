<template>
  <header class="fixed w-screen bg-[#222030]">
    <div class="flex justify-between mx-40 my-5 items-center">
      <div>
        <h1 class="text-[#DDCCAA]">{{ $t("message.movie_quotes") }}</h1>
      </div>

      <div class="flex text-white items-center">
        <img src="@/assets/images/icons/bell.png" alt="img" />
        <SetLanguage class="mx-8" />
        <RouterLink
          class="border-white border-2 px-6 py-2 rounded-md"
          :to="{ name: 'landing' }"
          >{{ $t("message.log_out") }}</RouterLink
        >
      </div>
    </div>
  </header>
</template>
<script>
import SetLanguage from "@/components/Landing/SetLanguage.vue";
export default {
  components: {
    SetLanguage,
  },
};
</script>
