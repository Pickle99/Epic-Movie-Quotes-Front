<template>
  <div class="flex justify-center overflow-hidden md:overflow-visible">
    <OnClickOutside class="w-fit" @trigger="close()">
      <blur-panel class="h-screen md:h-fit">
        <div class="text-center mb-7">
          <h1
            class="text-white text-xl md:text-3xl mt-10 md:mt-0 md:text-4xl mb-5"
          >
            {{ $t("message.log_in_to_acc") }}
          </h1>
          <p class="w-96 text-sm md:text-xl text-[#6C757D]">
            {{ $t("message.welcome_back") }}
          </p>
        </div>
        <ValidationForm v-slot="{ meta }" @submit="onSubmit()">
          <div class="mx-4">
            <p class="text-red-500 text-center">
              {{ error }}
            </p>
            <basic-input
              name="user"
              placeholder="message.enter_your_email"
              rules="required|min:3"
              label-name="message.email"
              :error="error"
            />
            <password-input
              name="password"
              placeholder="message.password"
              rules="required|min:3"
              label-name="message.password"
              :error="error"
            />
          </div>
          <div class="text-sm flex justify-between mx-4">
            <div class="flex items-center">
              <input v-model="data.remember_token" type="checkbox" />
              <p class="text-white ml-2">{{ $t("message.remember_me") }}</p>
            </div>
            <RouterLink
              class="underline text-[#0D6EFD]"
              :to="{ name: 'forgot-password' }"
            >
              {{ $t("message.forgot_password") }}</RouterLink
            >
          </div>
          <div class="flex justify-center flex-col mx-4">
            <basic-button class="mt-5" :is-disabled="!meta.valid">{{
              $t("message.sign_in")
            }}</basic-button>
            <button
              class="flex items-center justify-center text-white mt-5 border-white border-2 py-2 rounded-sm"
              @click="google()"
            >
              <IconGoogle class="mr-2" />
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
        </ValidationForm>
      </blur-panel>
    </OnClickOutside>
  </div>
</template>
<script>
import BlurPanel from "@/components/Landing/BlurPanel.vue";
import { Form as ValidationForm } from "vee-validate";
import BasicInput from "@/components/UI/BasicInput.vue";
import BasicButton from "@/components/UI/BasicButton.vue";
import PasswordInput from "@/components/UI/PasswordInput.vue";
import axios from "@/config/axios/index.js";
import { setJwtToken } from "@/helpers/jwt/index.js";
import { mapWritableState } from "pinia";
import { useUserStore } from "@/stores/useUserStore.js";
import { OnClickOutside } from "@vueuse/components";
import IconGoogle from "@/components/icons/IconGoogle.vue";
export default {
  components: {
    IconGoogle,
    BlurPanel,
    ValidationForm,
    BasicInput,
    PasswordInput,
    BasicButton,
    OnClickOutside,
  },
  data() {
    return {
      error: "",
      timeOut: null,
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ["data", "currentUser"]),
  },
  methods: {
    close() {
      this.$router.push({ name: "landing" });
    },
    google() {
      axios
        .get("auth/google/redirect")
        .then((res) => {
          window.location.href = res.data.url;
        })
        .catch((err) => console.log(err));
    },
    onSubmit() {
      axios
        .post("login", {
          user: this.data.user,
          password: this.data.password,
          remember_token: this.data.remember_token,
        })
        .then((response) => {
          setJwtToken(response.data.access_token, response.data.expires_in);
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("avatar", response.data.user.avatar);
          localStorage.setItem("userId", response.data.user.id);
          this.data.user = "";
          this.data.password = "";
          this.data.remember_token = false;
          this.$router.push({ name: "feed" });
        })
        .catch((error) => {
          this.data.password = "";
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
