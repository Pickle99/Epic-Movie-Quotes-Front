<template>
  <div :class="blur">
    <header class="flex justify-between mx-40 mt-5 items-center">
      <div><h1 class="text-[#DDCCAA]">MOVIE QUOTES</h1></div>

      <div class="flex text-white items-center">
        <div><p>Eng ^</p></div>
        <RouterLink
          class="mx-5 bg-red-500 px-6 py-2 rounded-md"
          :to="{ name: 'register' }"
          >Sign Up</RouterLink
        >
        <RouterLink
          class="border-white border-2 px-6 py-2 rounded-md"
          :to="{ name: 'login' }"
          >Log in</RouterLink
        >
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
</template>

<script>
export default {
  props: {
    blur: {
      type: String,
      required: false,
    },
  },
};
</script>
