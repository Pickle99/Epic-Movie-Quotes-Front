<template>
  <LandingComponent
    :class="
      $route.name === 'landing' ? 'blur-none' : 'blur-sm pointer-events-none'
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
