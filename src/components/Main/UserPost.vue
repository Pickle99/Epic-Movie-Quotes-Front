<template>
  <div class="text-white justify-center flex">
    <div class="flex flex-col">
      <div class="flex mt-3">
        <div class="py-3 px-3 bg-[#24222F] rounded-md">
          <RouterLink class="flex w-[10rem]" to="'/hi'">
            <img class="mr-4" src="@/assets/icons/pencil.svg" />
            <p>Write new quote</p>
          </RouterLink>
        </div>
        <div class="w-full ml-10 flex items-center border-gray-700 border-b-4">
          <div class="mr-3">
            <img src="@/assets/icons/magnifying-glass.svg" />
          </div>
          <div class="w-full">
            <input
              class="bg-[#0d0b14] w-96"
              placeholder="Enter @ to search movies, Enter # to search quotes"
            />
          </div>
        </div>
      </div>
      <PostComponent />
    </div>
  </div>
</template>
<script>
import PostComponent from "@/components/Main/PostComponent.vue";
export default {
  components: { PostComponent },
};
</script>
