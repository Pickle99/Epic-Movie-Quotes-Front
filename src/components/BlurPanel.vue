<template>
  <div class="flex justify-center -mt-[50rem] blur-none">
    <div class="px-20 py-12 bg-[#222030] rounded-md">
      <RouterLink
        class="text-[#E31221] hover:text-red-900 text-2xl absolute top-0 ml-[26rem] mt-3"
        :to="{ name: 'landing' }"
        >x</RouterLink
      >
      <slot></slot>
    </div>
  </div>
</template>
