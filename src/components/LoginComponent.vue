<template>
  <blur-panel>
    <div class="text-center mb-7">
      <h1 class="text-white text-4xl mb-5">
        {{ $t("message.log_in_to_acc") }}
      </h1>
      <p class="text-[#6C757D]">{{ $t("message.welcome_back") }} !</p>
    </div>
    <Form v-slot="{ meta }" @submit="onSubmit()">
      <div>
        <basic-input
          v-for="option in options"
          :key="option.id"
          :name="option.name"
          :placeholder="option.placeholder"
          :rules="option.rules"
          :labelName="option.labelName"
        />
      </div>
      <div class="text-sm flex justify-between">
        <div class="flex items-center">
          <input type="checkbox" />
          <p class="text-white ml-2">{{ $t("message.remember_me") }}</p>
        </div>
        <RouterLink class="underline text-[#0D6EFD]" to="forgotpassword">
          {{ $t("message.forgot_password") }}</RouterLink
        >
      </div>
      <div class="flex justify-center flex-col">
        <button
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
import { Form, Field, ErrorMessage } from "vee-validate";
import BasicInput from "@/components/UI/BasicInput.vue";
export default {
  components: {
    BlurPanel,
    Form,
    Field,
    ErrorMessage,
    BasicInput,
  },
  methods: {
    onSubmit() {
      console.log("hi");
    },
  },
  data() {
    return {
      options: [
        {
          id: 1,
          name: "user",
          placeholder: "message.enter_your_email",
          rules: "required|min:3",
          labelName: "message.email",
        },
        {
          id: 2,
          name: "password",
          placeholder: "message.password",
          rules: "required",
          labelName: "message.password",
        },
      ],
    };
  },
};
</script>
