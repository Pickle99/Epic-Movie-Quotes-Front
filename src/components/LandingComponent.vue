<script>
import { useLocaleStore } from "@/stores/locale.js";
import { mapState, mapActions } from "pinia";
import { setLocale } from "@vee-validate/i18n";

export default {
  props: {
    blur: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapState(useLocaleStore, ["isDisabled"]),
  },
  methods: {
    ...mapActions(useLocaleStore, ["currentLanguage", "setDisabled"]),
    change(lang) {
      setLocale((this.$i18n.locale = lang));
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
        <!--        <div><p>Eng ^</p></div>-->
        <button @click="setDisabled">
          <div
            class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          >
            <p v-if="this.$i18n.locale === 'en'">
              {{ $t("message.eng") }}
            </p>
            <p v-if="this.$i18n.locale === 'ka'">
              {{ $t("message.geo") }}
            </p>
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div v-if="isDisabled" class="absolute ml-4">
            <p class="mt-2" @click="change('ka')">
              {{ $t("message.geo") }}
            </p>
            <p class="mt-2" @click="change('en')">
              {{ $t("message.eng") }}
            </p>
          </div>
        </button>

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
