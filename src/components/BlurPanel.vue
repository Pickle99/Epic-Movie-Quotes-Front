<template>
  <div class="flex justify-center -mt-80 blur-none mb-40">
    <div class="px-20 py-10 bg-[#222030]">
      <RouterLink
        class="text-[#E31221] hover:text-red-900 text-2xl absolute top-0 ml-[26rem] mt-3"
        :to="{ name: 'landing' }"
        >x</RouterLink
      >
      <slot></slot>
    </div>
  </div>
</template>
