<template>
  <LandingComponent
    :class="
      $route.name === 'register'
        ? 'blur-sm'
        : $route.name === 'login'
        ? 'blur-sm'
        : $route.name === 'email-sent'
        ? 'blur-sm'
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
