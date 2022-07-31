<template>
  <blur-panel class="h-screen overflow-hidden md:h-fit">
    <div class="text-center mb-7">
      <h1 class="text-white mt-24 md:mt-0 text-4xl mb-5">
        {{ $t("message.create_new_password") }}
      </h1>
      <p class="text-[#6C757D] w-[22rem]">
        {{ $t("message.your_new_password_must_be_different") }}
      </p>
    </div>
    <ValidationForm v-slot="{ meta }" @submit="onSubmit()">
      <p class="text-red-500 mb-3">{{ data.error }}</p>
      <div class="md:w-[23rem]">
        <password-input
          name="password"
          placeholder="message.at_least_8_max_15"
          rules="required|min:8|max:15|alpha_lower"
          label-name="message.password"
        />
        <password-input
          name="password_confirmation"
          placeholder="message.confirm_password"
          rules="required|confirmed:@password"
          label-name="message.confirm_password"
        />
      </div>

      <basic-button class="w-full" :is-disabled="!meta.valid">{{
        $t("message.reset_password")
      }}</basic-button>
    </ValidationForm>
    <back-to-login-button>
      <IconArrowLeft />
      <p class="text-[#6C757D]">{{ $t("message.back_to_log_in") }}</p>
    </back-to-login-button>
  </blur-panel>
</template>
<script>
import BlurPanel from "@/components/Landing/BlurPanel.vue";
import { Form as ValidationForm } from "vee-validate";
import PasswordInput from "@/components/UI/PasswordInput.vue";
import BasicButton from "@/components/UI/BasicButton.vue";
import BackToLoginButton from "@/components/UI/BackToLoginButton.vue";
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useUserStore } from "@/stores/useUserStore.js";
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";

export default {
  components: {
    IconArrowLeft,
    BlurPanel,
    ValidationForm,
    PasswordInput,
    BasicButton,
    BackToLoginButton,
  },
  computed: {
    ...mapWritableState(useUserStore, ["data"]),
  },
  methods: {
    onSubmit() {
      axios
        .post(`reset-password/${this.$route.params.token}`, {
          email: this.$route.params.email,
          token: this.$route.params.token,
          password: this.data.password,
          password_confirmation: this.data.password_confirmation,
        })
        .then(() => {
          this.$router.push({ name: "reset-success" });
        })
        .catch(() => {
          this.data.error =
            "Sorry, you already reset your password, your token is expired";
          setTimeout(() => {
            this.data.error = "";
            this.$router.push({ name: "login" });
          }, 2000);
        });
    },
  },
};
</script>
