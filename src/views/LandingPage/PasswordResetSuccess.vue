<template>
  <blur-panel>
    <div
      class="flex flex-col justify-center px-4 items-center text-center text-white"
    >
      <div class="mb-10">
        <img src="@/assets/images/activated.png" alt="img" />
      </div>
      <h1 class="text-3xl mb-8">Thank You!</h1>
      <p class="text-md mb-8">Your password was successfully reset.</p>
      <button
        @click="redirect()"
        class="px-32 rounded-md py-1.5 text-md bg-[#E31221]"
      >
        Let's login!
      </button>
    </div>
  </blur-panel>
</template>

<script>
import BlurPanel from "@/components/BlurPanel.vue";
export default {
  components: {
    BlurPanel,
  },
  data() {
    return {
      blur: "blur-sm",
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>
