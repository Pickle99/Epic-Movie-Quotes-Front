<template>
  <div class="flex justify-center overflow-hidden md:overflow-visible">
    <OnClickOutside class="w-fit" @trigger="close">
      <blur-panel class="h-screen md:h-fit">
        <ValidationForm
          v-slot="{ meta }"
          as="div"
          class="flex flex-col"
          @submit="onSubmit"
        >
          <div class="text-center mb-8">
            <h1 class="text-white text-xl md:text-4xl">
              {{ $t("message.create_an_account") }}
            </h1>
            <p class="text-[#6C757D] mt-3">
              {{ $t("message.start_your_journey") }}!
            </p>
          </div>
          <form>
            {{ data.error }}
            <div class="w-screen px-5 md:w-[30rem]">
              <basic-input
                inputId="username"
                name="username"
                placeholder="message.at_least_3_max_15"
                rules="required|min:3|max:15|alpha_lower"
                label-name="message.name"
              />
              <basic-input
                inputId="email"
                name="email"
                placeholder="message.enter_your_email"
                rules="required|email"
                label-name="message.email"
              />
              <password-input
                inputId="password"
                name="password"
                placeholder="message.at_least_8_max_15"
                rules="required|min:8|max:15|alpha_lower"
                label-name="message.password"
              />
              <password-input
                inputId="password_confirmation"
                name="password_confirmation"
                placeholder="message.confirm_password"
                rules="required|confirmed:@password"
                label-name="message.confirm_password"
              />
            </div>
            <div class="mx-5">
              <basic-button id="register-button" class="w-full" :is-disabled="!meta.valid"
                >{{ $t("message.get_started") }}
              </basic-button>
            </div>
          </form>
          <div class="flex flex-col mx-5">
            <button
              class="flex items-center justify-center text-white mt-5 border-white border-2 py-2 rounded-sm"
              @click="google()"
            >
              <IconGoogle class="mr-2" />
              {{ $t("message.sign_up_google") }}
            </button>
          </div>
          <div class="flex justify-center mt-10">
            <p class="text-[#6C757D]">
              {{ $t("message.already_have_an_account") }}?
            </p>
            <RouterLink
              :to="{ name: 'login' }"
              class="text-[#0D6EFD] underline ml-2"
              >{{ $t("message.login") }}</RouterLink
            >
          </div>
        </ValidationForm>
      </blur-panel>
    </OnClickOutside>
  </div>
</template>
<script>
import { Form as ValidationForm } from "vee-validate";
import { useUserStore } from "@/stores/useUserStore.js";
import BlurPanel from "@/components/Landing/BlurPanel.vue";
import BasicInput from "@/components/UI/BasicInput.vue";
import BasicButton from "@/components/UI/BasicButton.vue";
import PasswordInput from "@/components/UI/PasswordInput.vue";
import { OnClickOutside } from "@vueuse/components";
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import IconGoogle from "@/components/icons/IconGoogle.vue";
export default {
  components: {
    IconGoogle,
    ValidationForm,
    BlurPanel,
    BasicInput,
    PasswordInput,
    BasicButton,
    OnClickOutside,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ["data"]),
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
      this.isLoading = true;
      axios
        .post("register", {
          email: this.data.email,
          username: this.data.username,
          password: this.data.password,
          password_confirmation: this.data.password_confirmation,
        })
        .then(() => {
          this.$router.push({ name: "email-sent" });
          this.data.email = "";
          this.data.username = "";
          this.data.password = "";
          this.data.password_confirmation = "";
        })
        .catch((error) => {
          this.data.error = error.response.data.error;
          setTimeout(() => {
            this.data.error = "";
          }, 3000);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
