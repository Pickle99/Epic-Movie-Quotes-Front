<template>
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />
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
              class="focus:outline-0 bg-[#0d0b14] w-96"
              placeholder="Enter @ to search movies, Enter # to search quotes"
            />
          </div>
        </div>
      </div>
      <PostComponent
        v-for="movie in allMovies"
        :key="movie"
        :movieName="
          this.$i18n.locale === 'en' ? movie.title.en : movie.title.ka
        "
        :movieImage="movie.image"
        :year="movie.year"
        :postedBy="movie.user.username"
        :userAvatar="movie.user.avatar"
      />
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
import { useRequestsStore } from "@/stores/requests.js";
import { mapWritableState } from "pinia";
import PostComponent from "@/components/Main/PostComponent.vue";

export default {
  components: {
    MainHeader,
    UserNavbar,
    PostComponent,
  },
  computed: {
    ...mapWritableState(useRequestsStore, ["allMovies"]),
  },
  methods: {
    getMovie() {
      axios.get("feed").then((res) => {
        this.allMovies = res.data.movies;
      });
    },
  },
  mounted() {
    this.getMovie();
  },
};
</script>
