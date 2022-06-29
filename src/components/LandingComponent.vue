<template>
  <div :class="blur">
    <header class="flex justify-between mx-40 mt-5 items-center">
      <div><h1 class="text-[#DDCCAA]">MOVIE QUOTES</h1></div>

      <div class="flex text-white items-center">
        <!--        <div><p>Eng ^</p></div>-->
        <div>
          <div
            class="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          >
            <h1>Eng</h1>
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="hidden">
            <h1>Geo</h1>
            <h1>Eng</h1>
          </div>
        </div>

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

      <RouterLink
        class="text-white px-10 py-3 rounded-md bg-[#E31221]"
        :to="{ name: 'register' }"
        >Get started</RouterLink
      >
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
