<template>
  <blur-panel>
    <div class="text-center mb-7">
      <h1 class="text-white text-4xl mb-5">
        {{ $t("message.create_new_password") }}
      </h1>
      <p class="text-[#6C757D] w-[22rem]">
        {{$t('message.your_new_password_must_be_different')}}
      </p>
    </div>
    <Form v-slot="{ meta }" @submit="onSubmit()">
      <p class="text-red-500 mb-3">{{ data.error }}</p>
      <div class="w-[23rem]">
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

      <basic-button :is-disabled="!meta.valid">{{
        $t("message.reset_password")
      }}</basic-button>
    </Form>
    <back-to-login-button>
      <img class="mr-2" src="@/assets/icons/arrow-left.svg" alt="icon"/>
      <p class="text-[#6C757D]">{{$t('message.back_to_log_in')}}</p>
    </back-to-login-button>
  </blur-panel>
</template>
<script>
import BlurPanel from "@/components/Landing/BlurPanel.vue";
import { Form } from "vee-validate";
import PasswordInput from "@/components/UI/PasswordInput.vue";
import BasicButton from "@/components/UI/BasicButton.vue";
import BackToLoginButton from '@/components/UI/BackToLoginButton.vue';
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useUserDataStore } from "@/stores/formData/user.js";

export default {
  components: {
    BlurPanel,
    Form,
    PasswordInput,
    BasicButton,
    BackToLoginButton,
  },
  computed: {
    ...mapWritableState(useUserDataStore, ["data"]),
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
