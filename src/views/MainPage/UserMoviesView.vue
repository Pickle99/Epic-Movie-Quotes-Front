<template>
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />
  <div
    :class="
      $route.name !== 'movies-add'
        ? 'mt-28'
        : 'mt-28 pointer-events-none opacity-40'
    "
  >
    <div class="text-white flex justify-between ml-96 mr-28">
      <div>
        <p>My list of Movies (Total 25)</p>
      </div>
      <div class="flex">
        <div class="flex items-center">
          <img
            class="mr-3"
            src="@/assets/icons/magnifying-glass.svg"
            alt="img"
          />
          <input
            class="focus:outline-0 bg-[#0d0b14] w-20"
            placeholder="Search"
          />
        </div>
        <RouterLink
          :to="{ name: 'movies-add' }"
          class="flex items-center bg-[#E31221] p-3 rounded-md"
        >
          <img class="mr-2" src="@/assets/icons/plus.svg" alt="img" />
          <p>Add movie</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
export default {
  components: { UserNavbar, MainHeader },
};
</script>
