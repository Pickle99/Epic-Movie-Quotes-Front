<template>
  <blur-panel>
    <div class="text-center mb-7">
      <h1 class="text-white text-4xl mb-5">
        {{ $t("message.log_in_to_acc") }}
      </h1>
      <p class="w-96 text-[#6C757D]">{{ $t("message.welcome_back") }}</p>
    </div>
    <Form v-slot="{ meta }" @submit="onSubmit()">
      <div>
        <p class="text-red-500 text-center">
          {{ error }}
        </p>
        <basic-input
          name="user"
          placeholder="message.enter_your_email"
          rules="required|min:3"
          labelName="message.email"
          :error="error"
        />
        <password-input
          name="password"
          placeholder="message.password"
          rules="required|min:3"
          labelName="message.password"
          :error="error"
        />
      </div>
      <div class="text-sm flex justify-between">
        <div class="flex items-center">
          <input type="checkbox" />
          <p class="text-white ml-2">{{ $t("message.remember_me") }}</p>
        </div>
        <RouterLink
          class="underline text-[#0D6EFD]"
          :to="{ name: 'forgot-password' }"
        >
          {{ $t("message.forgot_password") }}</RouterLink
        >
      </div>
      <div class="flex justify-center flex-col">
        <button
          type="submit"
          :class="
            !meta.valid
              ? 'text-white bg-[#E31221] py-2 rounded-md opacity-50 mt-5'
              : 'opacity-100 text-white bg-[#E31221] py-2 rounded-md mt-5'
          "
          :disabled="!meta.valid"
        >
          {{ $t("message.sign_in") }}
        </button>
        <button
          @click="google()"
          class="flex items-center justify-center text-white mt-5 border-white border-2 py-2 rounded-sm"
        >
          <img class="mr-2" src="@/assets/images/google.png" alt="img" />
          {{ $t("message.sign_in_google") }}
        </button>
      </div>
      <div class="flex justify-center mt-6">
        <p class="text-[#6C757D]">
          {{ $t("message.dont_have_an_account_yet") }}?
        </p>
        <RouterLink
          class="text-[#0D6EFD] underline ml-3"
          :to="{ name: 'register' }"
        >
          {{ $t("message.sign_up") }}</RouterLink
        >
      </div>
    </Form>
  </blur-panel>
</template>
<script>
import BlurPanel from "@/components/BlurPanel.vue";
import { Form } from "vee-validate";
import BasicInput from "@/components/UI/BasicInput.vue";
import PasswordInput from "@/components/UI/PasswordInput.vue";
import axios from "@/config/axios/index.js";
import { setJwtToken } from "@/helpers/jwt/index.js";
import { mapWritableState } from "pinia";
import { useDataStore } from "@/stores/data/data.js";

export default {
  data() {
    return {
      error: "",
      timeOut: null,
    };
  },
  components: {
    BlurPanel,
    Form,
    BasicInput,
    PasswordInput,
  },
  computed: {
    ...mapWritableState(useDataStore, ["data"]),
  },
  methods: {
    google() {
      window.location.href = "http://localhost:8000/auth/google/redirect";
    },
    onSubmit() {
      axios
        .post("login", {
          email: this.data.user,
          password: this.data.password,
        })
        .then((response) => {
          setJwtToken(response.data.access_token, response.data.expires_in);
          this.$router.push({ name: "movies" });
        })
        .catch((error) => {
          this.error = error.response.data.error;
          clearTimeout(this.timeOut);
          this.timeOut = setTimeout(() => {
            this.error = "";
          }, 3000);
        });
    },
  },
};
</script>
