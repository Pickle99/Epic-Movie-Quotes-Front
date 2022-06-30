<template>
  <blur-panel>
    <Form as="div" class="flex flex-col" v-slot="{ meta }">
      <div class="text-center mb-8">
        <h1 class="text-white text-4xl">
          {{ $t("message.create_an_account") }}
        </h1>
        <p class="text-[#6C757D] mt-3">
          {{ $t("message.start_your_journey") }}!
        </p>
      </div>
      <form>
        <basic-input
          :key="option.id"
          v-for="option in options"
          :name="option.name"
          :placeholder="option.placeholder"
          :rules="option.rules"
          :labelName="option.labelName"
        />
      </form>
      <div class="flex flex-col">
        <button
          :class="
            !meta.valid
              ? 'text-white bg-[#E31221] py-2 rounded-md opacity-50 w-96'
              : 'opacity-100 text-white bg-[#E31221] py-2 rounded-md w-96'
          "
          @click="onSubmit()"
          :disabled="!meta.valid"
        >
          {{ $t("message.get_started") }}
        </button>
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
import BlurPanel from "@/components/BlurPanel.vue";
import BasicInput from "@/components/UI/BasicInput.vue";
export default {
  components: {
    Form,
    BlurPanel,
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
          name: "username",
          placeholder: "message.at_least_3_max_15",
          rules: "required|min:3|max:15",
          labelName: "message.name",
        },
        {
          id: 2,
          name: "email",
          placeholder: "message.enter_your_email",
          rules: "required|email",
          labelName: "message.email",
        },
        {
          id: 3,
          name: "password",
          placeholder: "message.at_least_8_max_15",
          rules: "required|min:8|max:15",
          labelName: "message.password",
        },
        {
          id: 4,
          name: "password_confirm",
          placeholder: "message.confirm_password",
          rules: "required|confirmed:@password",
          labelName: "message.confirm_password",
        },
      ],
    };
  },
};
</script>
