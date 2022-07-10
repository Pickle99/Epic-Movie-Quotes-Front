<template>
  <blur-panel>
    <Form @submit="onSubmit" as="div" class="flex flex-col" v-slot="{ meta }">
      <div class="text-center mb-8">
        <h1 class="text-white text-4xl">
          {{ $t("message.create_an_account") }}
        </h1>
        <p class="text-[#6C757D] mt-3">
          {{ $t("message.start_your_journey") }}!
        </p>
      </div>
      <div class="flex justify-center">
        <div>
          <svg
            class="w-12 h-12 mt-1 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
      <form>
        {{ data.error }}
        <basic-input
          v-for="option in options"
          :key="option.id"
          :name="option.name"
          :placeholder="option.placeholder"
          :rules="option.rules"
          :labelName="option.labelName"
        />
        <password-input
          name="password"
          placeholder="message.at_least_8_max_15"
          rules="required|min:8|max:15|alpha_lower"
          labelName="message.password"
        />
        <password-input
          name="password_confirmation"
          placeholder="message.confirm_password"
          rules="required|confirmed:@password"
          labelName="message.confirm_password"
        />
        <basic-button :isDisabled="!meta.valid"
          >{{ $t("message.get_started") }}
        </basic-button>
      </form>
      <div class="flex flex-col">
        <button
          class="flex items-center justify-center text-white mt-5 border-white border-2 py-2 rounded-sm"
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
import { useDataStore } from "@/stores/data/data.js";
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
    ...mapWritableState(useDataStore, ["data"]),
  },
  methods: {
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
      options: [
        {
          id: 1,
          name: "username",
          placeholder: "message.at_least_3_max_15",
          rules: "required|min:3|max:15|alpha_lower",
          labelName: "message.name",
        },
        {
          id: 2,
          name: "email",
          placeholder: "message.enter_your_email",
          rules: "required|email",
          labelName: "message.email",
        },
      ],
    };
  },
};
</script>
