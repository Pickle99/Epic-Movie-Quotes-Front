<template>
  <blur-panel class="h-screen overflow-hidden md:h-fit">
    <div class="text-center mb-7">
      <h1 class="text-white mt-24 md:mt-0 text-xl md:text-4xl mb-5">
        {{ $t("message.forgot_password_no_problem") }}
      </h1>
      <p class="text-[#6C757D] text-sm md:text-xl px-5 md:px-0 w-[24rem]">
        {{ $t('message.enter_the_email_and_we_will_send_instructions')}}
      </p>
    </div>
    <Form v-slot="{ meta }" @submit="onSubmit()">
      <div class="mx-5 md:mx-0">
        <basic-input
          name="forgot_password"
          placeholder="message.enter_your_email"
          rules="required|min:3|email"
          label-name="message.email"
        />
      </div>
      <div class="flex justify-center flex-col">
        <basic-button class="mx-5 md:mx-0" :is-disabled="!meta.valid">{{
          $t("message.send_instructions")
        }}</basic-button>
        <div v-if="isLoading" class="flex justify-center">
          <svg
            class="w-8 h-8 -mt-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
     <back-to-login-button>
       <IconArrowLeft/>
       <p class="text-[#6C757D]">{{$t('message.back_to_log_in')}}</p>
     </back-to-login-button>
    </Form>
  </blur-panel>
</template>
<script>
import BlurPanel from "@/components/Landing/BlurPanel.vue";
import { Form } from "vee-validate";
import BasicInput from "@/components/UI/BasicInput.vue";
import BasicButton from "@/components/UI/BasicButton.vue";
import BackToLoginButton from '@/components/UI/BackToLoginButton.vue';
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useUserStore } from "@/stores/user.js";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
export default {
  components: {
    IconArrowLeft,
    BlurPanel,
    Form,
    BasicInput,
    BasicButton,
    BackToLoginButton
  },
  computed: {
    ...mapWritableState(useUserStore, ["data"]),
  },
  methods: {
    onSubmit() {
      axios
        .post(
          "forgot-password",
          {
            email: this.data.forgot_password,
          },
          (this.isLoading = true)
        )
        .then(() => {
          this.isLoading = false;
          this.$router.push({ name: "password-reset-sent" });
        })
        .catch((error) => {
          this.isLoading = false;
          this.data.error = error.response.data.error;
          setTimeout(() => {
            this.data.error = "";
          }, 3000);
        });
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>
