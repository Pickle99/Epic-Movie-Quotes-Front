<script>
import LandingComponent from "@/components/LandingComponent.vue";
export default {
  components: {
    LandingComponent,
  },
};
</script>

<template>
  <header class="font-monsterrat">
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
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </header>
</template>

<style>
html {
  background: black;
}
</style>
