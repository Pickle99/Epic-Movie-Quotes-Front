<template>
  <LandingComponent
    :class="
      $route.name === 'register'
        ? 'blur-sm pointer-events-none'
        : $route.name === 'login'
        ? 'blur-sm pointer-events-none'
        : $route.name === 'email-sent'
        ? 'blur-sm pointer-events-none'
        : $route.name === 'forgot-password'
        ? 'blur-sm pointer-events-none'
        : $route.name === 'password-reset'
        ? 'blur-sm pointer-events-none'
        : 'blur-none'
    "
  />
</template>

<script>
import LandingComponent from "@/components/LandingComponent.vue";
export default {
  components: {
    LandingComponent,
  },
};
</script>
