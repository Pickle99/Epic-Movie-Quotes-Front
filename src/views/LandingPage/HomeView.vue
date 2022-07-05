<template>
  <LandingComponent
    :class="
      $route.name === 'landing' ? 'blur-none ' : 'overflow-hidden blur-sm pointer-events-none'
    "
  />
</template>

<script>
import LandingComponent from "@/components/Landing/LandingComponent.vue";
export default {
  components: {
    LandingComponent,
  },
};
</script>
