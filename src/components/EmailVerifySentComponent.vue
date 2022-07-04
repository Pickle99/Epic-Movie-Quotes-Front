<template>
  <blur-panel>
    <div
      class="flex flex-col justify-center items-center text-center text-white"
    >
      <div class="mb-10">
        <img src="@/assets/images/telegram.png" alt="img" />
      </div>
      <h1 class="text-3xl mb-8">Thank You!</h1>
      <span class="text-md mb-8">
        Please check your email and follow the instructions to
        <p>activate your account.</p>
      </span>
      <button class="px-32 rounded-md py-1.5 text-md bg-[#E31221]">
        Go to my email
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
};
</script>
