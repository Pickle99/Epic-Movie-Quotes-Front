<template>
  <blur-panel class="mt-24">
    <div
      class="flex flex-col justify-center px-4 items-center text-center text-white"
    >
      <div class="mb-10">
        <IconActivated/>
      </div>
      <h1 class="text-3xl mb-8">{{$t('message.success')}}!</h1>
      <p class="text-md mb-8">{{$t('message.your_password_reset_success')}}.</p>
      <button
        class="md:px-32 px-24 rounded-md py-1.5 text-md bg-[#E31221]"
        @click="redirect()"
      >
        {{$t('message.lets_login')}}!
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
      this.$router.push({ name: "login" });
    },
  },
};
</script>
