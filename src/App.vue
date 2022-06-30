<script setup></script>

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
  </header>
</template>

<style>
html {
  background: black;
}
</style>
