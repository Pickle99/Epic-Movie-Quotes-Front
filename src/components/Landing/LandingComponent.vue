<script>
import SetLanguage from "@/components/Landing/SetLanguage.vue";
import IconLine from "@/components/icons/IconLine.vue";

export default {
  components: {
    IconLine,
    SetLanguage,
  },
};
</script>

<template>
  <div class="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory">
    <div class="snap-start"></div>
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
    <article>
      <div
        class="snap-center w-screen h-[75rem] bg-no-repeat bg-cover bg-bottom bg-fixed bg-[url('@/assets/images/movies/Interstellar.png')]">
        <div class="w-full flex  items-center absolute h-full text-4xl text-white">

          <div class="ml-16 w-fit h-fit absolute z-10 flex items-center">
            <div>
              <IconLine/>
            </div>
            <div class="w-fit ml-12 w-[39rem] mt-28">
              <h1>"You have to leave something behind to go forward"
              </h1>
              <p class="mt-10">Interstellar, 2014</p>
            </div>
          </div>
        </div>
        <div class="w-screen h-[75rem]">
          <div
            class="bg-gradient-to-r opacity-90 from-black  h-[75rem] w-screen"
          ></div>
          <div
            class="bg-gradient-to-b opacity-90 from-black  h-[75rem] w-screen"
          ></div>
        </div>
      </div>

      <div
        class="w-screen h-[75rem] snap-center bg-no-repeat bg-cover bg-bottom bg-fixed bg-[url('@/assets/images/movies/TheRoyalTenenbaums.png')]">
        <div class="w-full flex  items-center absolute h-full text-4xl text-white">

          <div class="ml-16 w-fit h-fit absolute z-10 flex items-center">
            <div>
              <IconLine/>
            </div>
            <div class="w-fit ml-12 w-[38rem] mt-28">
              <h1>"I think we’re just gonna have
                to be secretly in love with earch other
                and leave it that"
              </h1>
              <p class="mt-10">The Royal Tenenbaums,2001 </p>
            </div>
          </div>
        </div>
        <div class="w-screen h-[75rem]">
          <div
            class="bg-gradient-to-r opacity-90 from-black  h-[75rem] w-screen"
          ></div>
          <div
            class="bg-gradient-to-b opacity-90 from-black  h-[75rem] w-screen"
          ></div>
        </div>
      </div>

      <div
        class="w-screen h-[75rem] snap-center bg-no-repeat bg-cover bg-bottom bg-fixed bg-[url('@/assets/images/movies/TheRoyalTenenbaums-2.png')]">
        <div class="w-full flex  items-center absolute h-full text-4xl text-white">

          <div class="ml-16 w-fit h-fit absolute z-10 flex items-center">
            <div>
              <IconLine/>
            </div>
            <div class="w-fit ml-12 w-[38rem] mt-28">
              <h1>"I think we’re just gonna have
                to be secretly in love with earch other
                and leave it that"
              </h1>
              <p class="mt-10">The Royal Tenenbaums,2001 </p>
            </div>
          </div>
        </div>
        <div class="w-screen h-[75rem]">
          <div
            class="bg-gradient-to-r opacity-90 from-black  h-[75rem] w-screen"
          ></div>
        </div>
      </div>
    </article>

    </div>
    <footer class="snap-end text-[#DDCCAA] bg-[#0D0B14] absolute top-[269rem]">
      <p class="ml-32 py-5">
        © 2022 {{ $t("message.movie_quotes") }}.
        {{ $t("message.all_rights_reserved") }}
      </p>
    </footer>
  </div>
</template>
