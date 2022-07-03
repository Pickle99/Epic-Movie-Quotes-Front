<script>
import SetLanguage from "@/components/SetLanguage.vue";

export default {
  components: {
    SetLanguage,
  },
  props: {
    blur: {
      type: String,
      required: false,
    },
  },
};
</script>

<template>
  <div :class="blur">
    <header class="flex justify-between mx-40 mt-5 items-center">
      <div>
        <h1 class="text-[#DDCCAA]">{{ $t("message.movie_quotes") }}</h1>
      </div>

      <div class="flex text-white items-center">
        <SetLanguage />
        <RouterLink
          class="mx-5 bg-red-500 px-6 py-2 rounded-md"
          :to="{ name: 'register' }"
          >{{ $t("message.sign_up") }}</RouterLink
        >
        <RouterLink
          class="border-white border-2 px-6 py-2 rounded-md"
          :to="{ name: 'login' }"
          >{{ $t("message.sign_in") }}</RouterLink
        >
      </div>
    </header>
    <div class="flex justify-end items-center h-[25rem] flex-col">
      <div class="mb-10 text-[#DDCCAA] text-6xl text-center">
        <h1>
          {{ $t("message.find_any_quote") }}
          <h1 class="mt-3">{{ $t("message.millions_of_movie_lines") }}</h1>
        </h1>
      </div>

      <RouterLink
        class="text-white px-10 py-3 rounded-md bg-[#E31221]"
        :to="{ name: 'register' }"
        >{{ $t("message.get_started") }}</RouterLink
      >
    </div>
  </div>
</template>
