<script>
import SetLanguage from "@/components/Landing/SetLanguage.vue";
import IconLine from "@/components/icons/IconLine.vue";
import IconLineSmall from "@/components/icons/IconLineSmall.vue";

export default {
  components: {
    IconLineSmall,
    IconLine,
    SetLanguage,
  },
};
</script>

<template>
  <div
:class="$route.name === 'landing' ? 'h-screen overflow-y-scroll overflow-x-hidden md:snap-mandatory md:snap-y' : 
'hidden md:block h-screen overflow-y-scroll overflow-x-hidden md:snap-mandatory md:snap-y'">
    <div class="snap-start"></div>
    <header class="flex justify-between mx-3 md:mx-40 mt-5 items-center">
      <div>
        <h1 class="text-[#DDCCAA]">{{ $t("message.movie_quotes") }}</h1>
      </div>

      <div class="flex text-white items-center">
        <SetLanguage class="mr-4 md:mr-0"/>
        <RouterLink
          class="mx-5 bg-red-500 px-6 py-2 rounded-md hidden md:block"
          :to="{ name: 'register' }"
          >{{ $t("message.sign_up") }}</RouterLink
        >
        <RouterLink
          class="border-white border-2 px-6 py-2 rounded-md"
          :to="{ name: 'login' }"
          >{{ $t("message.login") }}</RouterLink
        >
      </div>
    </header>
    <div class="flex justify-end items-center mt-[10rem] flex-col">
      <div class="mb-10 text-[#DDCCAA] text-3xl md:text-6xl font-bold text-center">
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
    <article class="flex">
      <div class="md:mt-64 mt-10 font-bold">

        <div class="">
          <div class="text-white flex items-center mt-64 md:mt-[45rem]">
            <div class="w-full md:h-[74rem] h-full absolute bg-no-repeat md:bg-cover bg-contain bg-center md:bg-fixed bg-[url('@/assets/images/movies/Interstellar.png')]" >

            </div>
            <div>
              <div class="absolute z-10 ml-3 md:ml-16">
                <div class="flex snap-center">
                  <div class="mt-2 mr-3">
                    <IconLineSmall class="md:hidden"/>
                    <IconLine class="hidden md:block mt-3"/>
                  </div>
                  <div>
                    <h1 class="mr-36 md:text-5xl md:w-[40rem]">“You have to leave something behind to go forward”</h1>
                    <p class="mt-3 md:text-2xl">Interstellar, 2014</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-gradient-to-r h-[16.5rem] opacity-90 from-black absolute  md:h-[74rem] w-screen"
            ></div>
          </div>

          <div class="text-white flex items-center mt-64 md:mt-[74rem] ">
            <div class="absolute w-full md:h-[74rem] h-full absolute bg-no-repeat md:bg-cover bg-contain bg-center md:bg-fixed bg-[url('@/assets/images/movies/TheRoyalTenenbaums.png')]" >

            </div>
            <div class="absolute z-10 ml-3 md:ml-16">
              <div class="flex snap-center">
                <div class="mt-2 mr-3">
                  <IconLineSmall class="md:hidden"/>
                  <IconLine class="hidden md:block mt-3"/>
                </div>
                <div>
                  <h1 class="mr-36 md:text-5xl md:w-[40rem]">“I think we’re just gonna
                    have to be secretly in love
                    with earch other and
                    leave it that”</h1>
                  <p class="mt-3 md:text-2xl">The Royal Tenenbaums,2001</p>
                </div>
              </div>
            </div>
            <div
              class="bg-gradient-to-r h-[16.3rem] opacity-90 from-black absolute  md:h-[74.1rem] w-screen"
            ></div>
          </div>

          <div class="text-white flex items-center mt-64 md:mt-[74rem]">
            <div class="absolute snap-end" >
              <img src="@/assets/images/movies/TheLordOfTheRings.png" alt="lord-of-the-rings"/>
            </div>
            <div class="absolute z-10 ml-3 md:ml-16">
              <div class="flex snap-center">
                <div class="mt-2 mr-3">
                  <IconLineSmall class="md:hidden"/>
                  <IconLine class="hidden md:block mt-3"/>
                </div>
                <div>
                  <h1 class="mr-36 md:text-5xl md:w-[40rem]">“I see in your eyes the same
                    fear that would take the
                    heart of me....”</h1>
                  <p class="mt-3 md:text-2xl">The Lord of the Rings, 2003</p>
                </div>
              </div>
            </div>
            <div
              class="bg-gradient-to-r  h-[16.5rem] opacity-90 from-black absolute  md:h-[74.4rem] w-screen"
            ></div>
          </div>
        </div>
        <footer class="snap-end text-[#DDCCAA]  ml-3 md:ml-0 text-sm md:text-xl bg-[#0D0B14] mt-32 md:mt-[37rem]">
          <p class="md:ml-32 py-5">
            © 2022 {{ $t("message.movie_quotes") }}.
            {{ $t("message.all_rights_reserved") }}
          </p>
        </footer>
      </div>
    </article>
  </div>
</template>
