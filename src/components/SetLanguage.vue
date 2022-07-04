<template>
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
</template>

<script>
import { setLocale } from "@vee-validate/i18n";
import { useLocaleStore } from "@/stores/locale.js";
import { mapActions, mapState } from "pinia/dist/pinia";
export default {
  methods: {
    change(lang) {
      localStorage.setItem("locale", lang);
      setLocale((this.$i18n.locale = localStorage.getItem("locale")));
    },
    ...mapActions(useLocaleStore, ["currentLanguage", "setDisabled"]),
  },
  computed: {
    ...mapState(useLocaleStore, ["isDisabled"]),
  },
};
</script>
