<template>
  <blur-panel>
    <div class="text-center mb-7">
      <h1 class="text-white text-4xl mb-5">
        {{ $t("message.forgot_password_no_problem") }}
      </h1>
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
      <div class="flex justify-center flex-col">
        <button
          :class="
            !meta.valid
              ? 'text-white bg-[#E31221] py-2 rounded-md opacity-50 mt-5'
              : 'opacity-100 text-white bg-[#E31221] py-2 rounded-md mt-5'
          "
          :disabled="!meta.valid"
        >
          {{ $t("message.reset_password") }}
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
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useDataStore } from "@/stores/data/data.js";
export default {
  components: {
    BlurPanel,
    Form,
    BasicInput,
  },
  computed: {
    ...mapWritableState(useDataStore, ["data"]),
  },
  methods: {
    onSubmit() {
      axios.post("forgot-password", {
        email: this.data.forgot_password,
      });
    },
  },
  data() {
    return {
      options: [
        {
          id: 1,
          name: "forgot_password",
          placeholder: "message.enter_your_email",
          rules: "required|min:3|email",
          labelName: "message.email",
        },
      ],
    };
  },
};
</script>
