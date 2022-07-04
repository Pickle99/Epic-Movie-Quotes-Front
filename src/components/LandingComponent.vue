<script>
import SetLanguage from "@/components/SetLanguage.vue";

export default {
  components: {
    SetLanguage,
  },
  props: {
    blur: {
      type: String,
      required: false,
    },
  },
};
</script>

<template>
  <div :class="blur">
    <header class="flex justify-between mx-40 mt-5 items-center">
      <div>
        <h1 class="text-[#DDCCAA]">{{ $t("message.movie_quotes") }}</h1>
      </div>

      <div class="flex text-white items-center">
        <SetLanguage />
        <RouterLink
          class="mx-5 bg-red-500 px-6 py-2 rounded-md"
          :to="{ name: 'register' }"
          >{{ $t("message.sign_up") }}</RouterLink
        >
        <RouterLink
          class="border-white border-2 px-6 py-2 rounded-md"
          :to="{ name: 'login' }"
          >{{ $t("message.sign_in") }}</RouterLink
        >
      </div>
    </header>
    <div class="flex justify-end items-center h-[25rem] flex-col">
      <div class="mb-10 text-[#DDCCAA] text-6xl text-center">
        <h1>
          {{ $t("message.find_any_quote") }}
          <h1 class="mt-3">{{ $t("message.millions_of_movie_lines") }}</h1>
        </h1>
      </div>

      <RouterLink
        class="text-white px-10 py-3 rounded-md bg-[#E31221]"
        :to="{ name: 'register' }"
        >{{ $t("message.get_started") }}</RouterLink
      >
    </div>
    <div class="mt-60 font-bold">
      <div>
        <div class="absolute mt-[27.2rem] ml-52">
          <p class="text-white text-5xl">__</p>
        </div>
        <div class="absolute mt-[29rem] ml-80">
          <h1 class="text-white text-4xl">
            “You have to leave something
            <h1 class="text-white text-3xl">behind to go forward”</h1>
          </h1>
          <p class="text-white text-xl mt-4">Interstellar, 2014</p>
        </div>
        <img src="@/assets/images/movies/Interstellar.png" alt="img" />
      </div>

      <div>
        <div class="absolute mt-[27.8rem] ml-52">
          <p class="text-white text-5xl">__</p>
        </div>
        <div class="absolute mt-[29rem] ml-80">
          <h1 class="text-white text-4xl">
            I think we’re just gonna have to be secretly in love with earch
            other
            <h1 class="text-white text-4xl">
              to be secretly in love with earch other
            </h1>
            <h1 class="text-white text-4xl">and leave it that</h1>
          </h1>
          <p class="text-white text-xl mt-4">The Royal Tenenbaums,2001</p>
        </div>
        <img src="@/assets/images/movies/TheRoyalTenenbaums.png" alt="img" />
      </div>

      <div>
        <div class="absolute mt-[40.8rem] ml-52">
          <p class="text-white text-5xl">__</p>
        </div>
        <div class="absolute mt-[42rem] ml-80">
          <h1 class="text-white text-4xl">
            I think we’re just gonna have to be secretly in love with earch
            other
            <h1 class="text-white text-4xl">
              to be secretly in love with earch other
            </h1>
            <h1 class="text-white text-4xl">and leave it that</h1>
          </h1>
          <p class="text-white text-xl mt-4">The Royal Tenenbaums,2001</p>
        </div>
        <img src="@/assets/images/movies/TheRoyalTenenbaums-2.png" alt="img" />
      </div>
    </div>
  </div>
</template>
