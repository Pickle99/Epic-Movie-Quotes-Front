<template>
  <div class="blur-sm">
    <header class="flex justify-between mx-40 mt-5 items-center">
      <div><h1 class="text-[#DDCCAA]">MOVIE QUOTES</h1></div>
      <div class="flex text-white items-center">
        <div><p>Eng ^</p></div>
        <p class="mx-5 bg-red-500 px-6 py-2 rounded-md">Sign Up</p>
        <p class="border-white border-2 px-6 py-2 rounded-md">Log in</p>
      </div>
    </header>
    <div class="flex justify-end items-center h-[25rem] flex-col">
      <div class="mb-10 text-[#DDCCAA] text-6xl text-center">
        <h1>
          Find any quote in
          <h1>millions of movie lines</h1>
        </h1>
      </div>
      <div class="bg-red-500 rounded-md px-6 py-2">
        <p class="text-white">Get started</p>
      </div>
    </div>
  </div>
  <div class="flex justify-center -mt-80 blur-none mb-40">
    <div class="px-20 py-10 bg-[#222030]">
      <Form as="div" class="blur-none flex flex-col">
        <div class="text-center mb-8">
          <h1 class="text-white text-4xl">Create an account</h1>
          <p class="text-[#6C757D] mt-3">Start your journey!</p>
        </div>
        <form>
          <div class="flex flex-col">
            <div class="flex flex-row">
              <label class="text-white mb-2" for="first_name">Name</label>
              <p class="text-[#DC3545]">*</p>
            </div>
            <Field
              name="first_name"
              class="bg-[#CED4DA] mb-7 px-3 py-2 rounded-md w-96"
              placeholder="At least 3 & max.15 lower case characters"
            />
          </div>
          <div>
            <div class="flex flex-row">
              <label class="text-white mb-2" for="email">Email</label>
              <p class="text-[#DC3545]">*</p>
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
              <p class="text-[#DC3545]">*</p>
            </div>
            <Field
              name="password"
              class="bg-[#CED4DA] mb-7 px-3 py-2 rounded-md w-96"
              placeholder="At least 8 & max.15 lower case characters"
            />
          </div>
          <div>
            <div class="flex flex-row">
              <label class="text-white mb-2" for="password_confirm"
                >Confirm password</label
              >
              <p class="text-[#DC3545]">*</p>
            </div>
            <Field
              name="password_confirm"
              class="bg-[#CED4DA] mb-7 px-3 py-2 rounded-md w-96"
              placeholder="Confirm password"
            />
          </div>
        </form>
        <div class="flex flex-col">
          <button class="text-white bg-[#E31221] py-2 rounded-md">
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
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
};
</script>
