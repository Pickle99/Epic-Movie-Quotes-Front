<template>
  <LandingComponent :class="this.blur" />
  <RegisterComponent />
</template>

<script>
import LandingComponent from "@/components/LandingComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
export default {
  components: {
    LandingComponent,
    RegisterComponent,
  },
  data() {
    return {
      blur: "blur-sm",
    };
  },
};
</script>
