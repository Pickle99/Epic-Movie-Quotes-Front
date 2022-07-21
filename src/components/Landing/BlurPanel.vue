<template>
  <div class="flex justify-center -mt-[50rem] blur-none">
    <div class="px-20 py-12 bg-[#222030] rounded-md">
      <div class="w-full flex justify-end">
        <RouterLink :to="{name: 'landing'}" class="cursor-pointer text-xl text-red-500">
          x
        </RouterLink>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
