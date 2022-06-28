<script setup></script>

<template>
  <header class="font-monsterrat">
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
