<template>
  <LandingComponent :class="blur" />
  <blur-panel>
    <div class="text-center mb-7">
      <h1 class="text-white text-4xl mb-5">Log in to your account</h1>
      <p class="text-[#6C757D]">Welcome back! Please enter your details</p>
    </div>
    <form>
      <div>
        <div class="flex flex-row">
          <label class="text-white mb-2" for="email">Email</label>
        </div>
        <Field
          name="email"
          class="bg-[#CED4DA] mb-7 px-3 py-2 rounded-md w-96"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <div class="flex flex-row">
          <label class="text-white mb-2" for="password">Password</label>
        </div>
        <Field
          name="password"
          class="bg-[#CED4DA] mb-7 px-3 py-2 rounded-md w-96"
          placeholder="Password"
        />
      </div>
      <div class="text-sm flex justify-between">
        <div class="flex items-center">
          <input type="checkbox" />
          <p class="text-white ml-2">Remember me</p>
        </div>
        <RouterLink class="underline text-[#0D6EFD]" to="forgotpassword"
          >Forgot password</RouterLink
        >
      </div>
      <div class="flex justify-center flex-col">
        <button
          class="mt-10 text-white text-md px-[10.5rem] py-1.5 bg-[#E31221] rounded-md"
        >
          Sign in
        </button>
        <button
          class="flex items-center justify-center text-white mt-5 border-white border-2 py-2 rounded-sm"
        >
          <img class="mr-2" src="@/assets/images/google.png" alt="img" /> Sign
          up with Google
        </button>
      </div>
      <div class="flex justify-center mt-6">
        <p class="text-[#6C757D]">Already have an account?</p>
        <RouterLink
          class="text-[#0D6EFD] underline ml-3"
          :to="{ name: 'register' }"
          >Sign up</RouterLink
        >
      </div>
    </form>
  </blur-panel>
</template>
<script>
import BlurPanel from "@/components/BlurPanel.vue";
import LandingComponent from "@/components/LandingComponent.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    BlurPanel,
    LandingComponent,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      blur: "blur-sm",
    };
  },
};
</script>
