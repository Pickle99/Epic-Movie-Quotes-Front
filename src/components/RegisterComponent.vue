<template>
  <blur-panel>
    <Form as="div" class="flex flex-col" v-slot="{ meta }">
      <div class="text-center mb-8">
        <h1 class="text-white text-4xl">Create an account</h1>
        <p class="text-[#6C757D] mt-3">Start your journey!</p>
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
          Get started
        </button>
        <button
          class="flex items-center justify-center text-white mt-5 border-white border-2 py-2 rounded-sm"
        >
          <img class="mr-2" src="@/assets/images/google.png" alt="img" /> Sign
          up with Google
        </button>
      </div>
      <div class="flex justify-center mt-10">
        <p class="text-[#6C757D]">Already have an account?</p>
        <RouterLink
          :to="{ name: 'login' }"
          class="text-[#0D6EFD] underline ml-2"
          >Log in</RouterLink
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
          placeholder: "At least 3 & max.15 lower case characters",
          rules: "required|min:3|max:15",
          labelFor: "username",
          labelName: "Name",
        },
        {
          id: 2,
          name: "email",
          placeholder: "Enter your email",
          rules: "required|email",
          labelFor: "email",
          labelName: "Email",
        },
        {
          id: 3,
          name: "password",
          placeholder: "At least 8 & max.15 lower case characters",
          rules: "required|min:8|max:15",
          labelFor: "password",
          labelName: "Password",
        },
        {
          id: 4,
          name: "password_confirm",
          placeholder: "Confirm Password",
          rules: "required|confirmed:@password",
          labelFor: "password_confirm",
          labelName: "Confirm Password",
        },
      ],
    };
  },
};
</script>
