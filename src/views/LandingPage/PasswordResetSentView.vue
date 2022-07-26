<template>
  <blur-panel class="h-fit mt-24">
    <div
      class="flex flex-col justify-center items-center text-center text-white"
    >
      <div class="mb-10">
        <img src="@/assets/images/telegram.png" alt="img" />
      </div>
      <h1 class="text-3xl mb-8 font-bold">{{$t('message.check_your_email')}}</h1>
      <span class="text-md mb-8 w-[21rem]">
       {{$t('message.we_have_sent_you_instructions')}}.
      </span>
      <a
        href="https://gmail.com"
        target="_blank"
        class="md:px-32 px-24 rounded-md py-1.5 text-md bg-[#E31221]"
      >
        {{$t('message.go_to_my_email')}}
      </a>
    </div>
    <back-to-login-button>
      <p class="text-[#6C757D]">{{$t('message.skip_will_confirm_later')}}</p>
    </back-to-login-button>
  </blur-panel>
</template>

<script>
import BlurPanel from "@/components/Landing/BlurPanel.vue";
import BackToLoginButton from "@/components/UI/BackToLoginButton.vue";
export default {
  components: {
    BackToLoginButton,
    BlurPanel,
  },
};
</script>
