<template>
  <blur-panel>
    <div
      class="flex flex-col justify-center items-center text-center text-white"
    >
      <div class="mb-10">
        <img src="@/assets/images/telegram.png" alt="telegram" />
      </div>
      <h1 class="text-3xl mb-8">{{$t('message.thank_you')}}!</h1>
      <span class="text-md mb-8 w-[26rem]">
        {{$t('message.please_check_the_email_and_follow_the_instructions')}}.
      </span>
      <a
        href="https://gmail.com"
        target="_blank"
        class="px-32 rounded-md py-1.5 text-md bg-[#E31221]"
      >
        {{$t('message.go_to_my_email')}}
      </a>
    </div>
  </blur-panel>
</template>

<script>
import BlurPanel from "@/components/Landing/BlurPanel.vue";
export default {
  components: {
    BlurPanel,
  },
};
</script>
