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
        <p>My list of Movies (Total {{ userMovies.length }})</p>
      </div>
      <div class="flex">
        <div class="flex items-center">
          <img
            class="mr-3"
            src="@/assets/icons/magnifying-glass.svg"
            alt="img"
          />
          <input
            v-model="userMoviesSearch"
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
    <div
      :class="
        $route.name === 'movies-add'
          ? 'absolute flex ml-96 mr-28 grid grid-cols-3 text-white mt-10 gap-y-5 gap-x-12'
          : 'flex ml-96 mr-28 grid grid-cols-3 text-white mt-10 gap-y-5 gap-x-12'
      "
    >
      <article v-for="movie in filteredUserMovies" :key="movie">
        <RouterLink
          :to="{ name: 'movie-description', params: { movie: movie.id } }"
          class="hover:cursor-pointer"
        >
          <img
            :src="`http://localhost:8000/${movie.image}`"
            alt="img"
            class="rounded-xl h-96 hover:cursor-pointer mb-4"
          />
         <div class="font-bold uppercase flex">
           <p>
             {{ $i18n.locale === "en" ? movie.title.en : movie.title.ka }}
           </p>
           <p v-if="movie.year" class="ml-3">({{movie.year}})</p>
         </div>
        </RouterLink>
        <div class="flex items-center mt-3">
          <p>10</p>
          <img
            class="ml-3"
            width="20"
            src="@/assets/icons/chat-quote.svg"
            alt="img"
          />
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import { useMoviesStore } from "@/stores/formData/movies.js";
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
export default {
  components: { UserNavbar, MainHeader },
  mounted() {
    this.getUserMovies();
  },
  computed: {
    ...mapWritableState(useMoviesStore, ["userMovies", "userMoviesSearch"]),
    filteredUserMovies(){
      return this.userMovies.filter((movie) => {
        if(this.$i18n.locale === 'en')
        {
          return movie.title.en.match(this.userMoviesSearch)
        } else return movie.title.ka.match(this.userMoviesSearch)
      });
    },
  },
  methods: {
    getUserMovies() {
      axios
        .get("user-movies")
        .then((res) => {
          this.userMovies = res.data;
        })
        .catch((err) => { 
          console.log(err);
        });
    },
  },
};
</script>
