<template>
  <nav class="text-white justify-around flex flex-col h-60 w-fit">
    <div class="flex items-center">
      <div class="w-32 flex justify-center">
        <img
          class="rounded-full"
          :src="null || 'https://ui-avatars.com/api/?name=jackrestler'"
          alt="img"
        />
      </div>
      <div>
        <p>Nino Tabagari</p>
        <p class="text-sm text-gray-400">Edit your profile</p>
      </div>
    </div>

    <RouterLink :to="{ name: 'feed' }" class="flex items-center">
      <div class="w-32 flex justify-center">
        <img src="@/assets/icons/house.svg" />
      </div>
      <div>
        <p>News feed</p>
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'movies' }" class="flex items-center">
      <div class="w-32 flex justify-center">
        <img src="@/assets/icons/camera.svg" />
      </div>
      <div>
        <p>List of movies</p>
      </div>
    </RouterLink>
  </nav>
</template>
