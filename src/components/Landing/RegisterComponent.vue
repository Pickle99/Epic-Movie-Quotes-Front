<template>
  <blur-panel>
    <Form v-slot="{ meta }" as="div" class="flex flex-col" @submit="onSubmit">
      <div class="text-center mb-8">
        <h1 class="text-white text-4xl">
          {{ $t("message.create_an_account") }}
        </h1>
        <p class="text-[#6C757D] mt-3">
          {{ $t("message.start_your_journey") }}!
        </p>
      </div>
      <form>
        {{ data.error }}
       <div class="w-[30rem]">
         <basic-input
           name="username"
           placeholder="message.at_least_3_max_15"
           rules="required|min:3|max:15|alpha_lower"
           label-name="message.name"
         />
        <basic-input
          name="email"
          placeholder="message.enter_your_email"
          rules="required|email"
          label-name="message.email"
        />
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
        <basic-button :is-disabled="!meta.valid"
          >{{ $t("message.get_started") }}
        </basic-button>
      </form>
      <div class="flex flex-col">
        <button
class="flex items-center justify-center text-white mt-5 border-white border-2 py-2 rounded-sm"
          @click="google()"
        >
          <img class="mr-2" src="@/assets/images/google.png" alt="img" />
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
    </Form>
  </blur-panel>
</template>
<script>
import { Form } from "vee-validate";
import { useUserDataStore } from "@/stores/formData/user.js";
import BlurPanel from "@/components/Landing/BlurPanel.vue";
import BasicInput from "@/components/UI/BasicInput.vue";
import BasicButton from "@/components/UI/BasicButton.vue";
import PasswordInput from "@/components/UI/PasswordInput.vue";
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
export default {
  components: {
    Form,
    BlurPanel,
    BasicInput,
    PasswordInput,
    BasicButton,
  },
  computed: {
    ...mapWritableState(useUserDataStore, ["data"]),
  },
  methods: {
    google() {
      axios
        .get('auth/google/redirect')
        .then((res) => {
          window.location.href = res.data.url;
        })
        .catch((err) => console.log(err));
    },
    onSubmit() {
      axios
        .post(
          "register",
          {
            email: this.data.email,
            username: this.data.username,
            password: this.data.password,
            password_confirmation: this.data.password_confirmation,
          },
          (this.isLoading = true)
        )
        .then(() => {
          this.isLoading = false;
          this.$router.push({ name: "email-sent" });
        })
        .catch((error) => {
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
