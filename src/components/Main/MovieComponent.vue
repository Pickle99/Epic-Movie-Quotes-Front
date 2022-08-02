<template>
  <div
    class="flex mb-7 border-2 border-black p-3 mr-6 rounded-md"
    @click="addMovie()"
  >
    <div>
      <img :src="back_url + image" width="230" alt="movie-image" />
    </div>
    <div class="ml-3 flex flex-col h-32 justify-around">
      <div class="flex">
        <p>
          {{ $t("message.movie_name") }}:
          {{ $i18n.locale !== "en" ? name.en : name.ka }}
        </p>
        <p v-if="year" class="ml-3">({{ year }})</p>
      </div>
      <p>Director: {{ $i18n.locale !== "en" ? director.en : director.ka }}</p>
      <p class="text-xs">Posted By: {{ userName }}</p>
      <p v-if="chosenMovie" class="text-green-500 text-xs">
        {{ $t("message.selected") }}
      </p>
    </div>
  </div>
</template>

<script>
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { mapWritableState, mapState } from "pinia";
import { useEnvStore } from "@/stores/useEnvStore";
export default {
  props: {
    movieId: {
      type: Number,
      required: false,
      default: null,
    },
    name: {
      type: Object,
      required: true,
    },
    director: {
      type: Object,
      required: true,
    },
    year: {
      type: Number,
      required: false,
      default: null,
    },
    userName: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
    ...mapWritableState(useQuotesStore, [
      "chosenMovieId",
      "chosenMovie",
      "allUsersMovies",
    ]),
  },
  methods: {
    addMovie() {
      this.chosenMovieId = this.movieId;
      this.chosenMovie = this.allUsersMovies.find(
        (movie) => movie.id === this.movieId
      );
    },
  },
};
</script>
