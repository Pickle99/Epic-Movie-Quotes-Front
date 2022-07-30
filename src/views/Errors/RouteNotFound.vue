<template>
  <div class="mt-32 text-white text-center flex justify-center font-bold">
    <div>
      <div class="flex justify-center">
        <IconGhost class="mb-7 bg-cover-white"/>
      </div>
      <h1 class="mb-6 text-5xl">{{ $t("message.whoops") }}!</h1>
      <p class="mb-9 text-2xl">
        {{ $t("message.cant_see_the_page") }}
      </p>
      <RouterLink
        class="px-5 py-3 bg-red-500 rounded-md"
        :to="{ name: 'landing' }"
        >{{ $t("message.return_home") }}</RouterLink
      >
    </div>
  </div>
</template>
<script>
import IconGhost from "@/components/icons/IconGhost.vue";
export default {
  components: { IconGhost }
}
</script>