<script setup>
import { setLocale } from "@vee-validate/i18n";

setLocale(localStorage.getItem("locale") || "en");
</script>

<template>
  <header class="font-monsterrat">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <router-view name="RegisterView"></router-view>
    <router-view name="AuthView"></router-view>
    <router-view name="EmailSentView"></router-view>
    <router-view name="ForgotPasswordView"></router-view>
    <router-view name="PasswordResetView"></router-view>
    <router-view name="UserVerifiedView"></router-view>
    <router-view name="PasswordResetSentView"></router-view>
    <router-view name="PasswordResetSuccess"></router-view>
  </header>
</template>

<style>
html {
  background: #0d0b14;
  opacity: 96%;
}
</style>
