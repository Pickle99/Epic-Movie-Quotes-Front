<template>
  <button @click="setDisabled">
    <div
      class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
    >
      <p v-if="$i18n.locale === 'en'">
        {{ $t("message.eng") }}
      </p>
      <p v-if="$i18n.locale === 'ka'">
        {{ $t("message.geo") }}
      </p>
     <IconArrowDownSlim/>
    </div>
    <div v-if="isDisabled" class="absolute ml-4">
      <p class="mt-2" @click="change('en')">
        {{ $t("message.eng") }}
      </p>
      <p class="mt-2" @click="change('ka')">
        {{ $t("message.geo") }}
      </p>
    </div>
  </button>
</template>

<script>
import { setLocale } from "@vee-validate/i18n";
import { useLocaleStore } from "@/stores/locale.js";
import { mapActions, mapState } from "pinia/dist/pinia";
import IconArrowDownSlim from '@/components/icons/IconArrowDownSlim.vue';
export default {
  components: {
    IconArrowDownSlim
  },
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
