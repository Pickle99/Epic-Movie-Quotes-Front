<template>
  <nav class="text-white justify-around flex flex-col h-60 w-fit">
    <RouterLink :to="{name: 'profile'}" class="flex items-center">
      <div
       class="w-32 flex justify-center">
        <img
          :class="$route.name === 'profile' ? 'rounded-full border-2 border-[#E31221]' : 'rounded-full'"
          :src="`http://localhost:8000/${avatar}`"
          width="54"
          alt="img"
        />
      </div>
      <div>
        <p>{{ username }}</p>
        <p class="text-sm text-gray-400">Edit your profile</p>
      </div>
    </RouterLink>

    <RouterLink :to="{ name: 'feed' }" class="flex items-center">
      <div class="w-32 flex justify-center">
        <img v-if="$route.name !== 'feed'" src="@/assets/icons/house.svg" />
        <img v-if="$route.name === 'feed'" src="@/assets/icons/house-red.svg" />
      </div>
      <div>
        <p>News feed</p>
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'movies' }" class="flex items-center">
      <div class="w-32 flex justify-center">
        <img v-if="$route.name !== 'movies'" src="@/assets/icons/camera.svg" />
        <img v-if="$route.name === 'movies'"  src="@/assets/icons/camera-red.svg" />
      </div>
      <div>
        <p>List of movies</p>
      </div>
    </RouterLink>
  </nav>
</template>

<script>
import { mapWritableState } from "pinia";
import { useLocalStorageStore } from "@/stores/localStorage.js";

export default {
computed: {
...mapWritableState(useLocalStorageStore, ["username", "avatar"])
}
}
</script>
