<template>
  <blur-panel>
    <div
      class="flex flex-col justify-center items-center text-center text-white"
    >
      <div class="mb-10">
        <IconActivated />
      </div>
      <h1 class="text-3xl mb-8">{{ $t("message.thank_you") }}!</h1>
      <p class="text-md mb-8">
        {{ $t("message.your_account_has_been_activated") }}.
      </p>
      <button
        class="px-32 rounded-md py-1.5 text-md bg-[#E31221]"
        @click="redirect()"
      >
        {{ $t("message.go_to_my_news_feed") }}
      </button>
    </div>
  </blur-panel>
</template>

<script>
import BlurPanel from "@/components/Landing/BlurPanel.vue";
import IconActivated from "@/components/icons/IconActivated.vue";

export default {
  components: {
    IconActivated,
    BlurPanel,
  },
  data() {
    return {
      blur: "blur-sm",
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: "feed" });
    },
  },
};
</script>
