<template>
  <RouterLink v-if="$route.name !== 'login' || 'register' " :to="{name: 'login'}" class="flex justify-center mt-6 items-center">
    <slot></slot>
  </RouterLink>
</template>