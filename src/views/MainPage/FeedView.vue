<template>
  <div class="flex mb-28">
    <MainHeader />
  </div>
  <nav class="text-white justify-around flex flex-col h-60 w-fit">
    <div class="flex items-center ml-12">
      <div class="w-32 flex justify-center">
        <img src="@/assets/images/icons/user.png" />
      </div>
      <div>
        <p>Nino Tabagari</p>
        <p class="text-sm text-gray-400">Edit your profile</p>
      </div>
    </div>

    <div class="flex items-center ml-12">
      <div class="w-32 flex justify-center">
        <img src="@/assets/images/icons/house.png" />
      </div>
      <div>
        <p>News feed</p>
      </div>
    </div>
    <div class="flex items-center ml-12">
      <div class="w-32 flex justify-center">
        <img src="@/assets/images/icons/camera.png" />
      </div>
      <div>
        <p>List of movies</p>
      </div>
    </div>
  </nav>
</template>

<script>
import MainHeader from "@/components/Main/MainHeader.vue";
export default {
  components: {
    MainHeader,
  },
};
</script>