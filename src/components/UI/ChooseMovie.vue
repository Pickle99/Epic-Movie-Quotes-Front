<template>
  <div>
    <div
      class="p-4 cursor-pointer my-2 bg-black flex items-center px-4 justify-between"
      @click="showHideMovieSelector"
    >
      <div class="flex items-center">
        <IconCamera class="mr-4" />
        <p for="image" class="text-white">{{ $t("message.choose_movie") }}</p>
      </div>
      <div>
        <IconArrowDown />
      </div>
    </div>
    <div
      v-if="isMovieSelectorOpen && !chosenMovie"
      class="flex flex-col overflow-y-scroll h-56"
    >
      <MovieComponent
        v-for="movie in allUsersMovies"
        :key="movie"
        class="hover:bg-gray-700 cursor-pointer"
        :name="movie.title"
        :director="movie.director"
        :year="movie.year"
        :image="movie.image"
        :user-name="movie.user.username"
        :user-avatar="movie.user.avatar"
        :movie-id="movie.id"
      />
    </div>
    <div v-if="chosenMovie">
      <MovieComponent
        :name="chosenMovie.title"
        :director="chosenMovie.director"
        :year="chosenMovie.year"
        :image="chosenMovie.image"
        :user-name="chosenMovie.user.username"
        :user-avatar="chosenMovie.user.avatar"
      />
    </div>
  </div>
</template>
<script>
import MovieComponent from "@/components/Main/MovieComponent.vue";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { mapWritableState } from "pinia";
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import IconCamera from "@/components/icons/IconCamera.vue";
export default {
  components: {
    IconCamera,
    MovieComponent,
    IconArrowDown,
  },
  data() {
    return {
      isMovieSelectorOpen: false,
    };
  },
  methods: {
    showHideMovieSelector() {
      this.isMovieSelectorOpen = true;
    },
    addMovie() {
      this.isMovieSelectorOpen = false;
    },
  },
  computed: {
    ...mapWritableState(useQuotesStore, [
      "allUsersMovies",
      "chosenMovieId",
      "chosenMovie",
    ]),
  },
};
</script>
