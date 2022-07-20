<template>
<div     class="flex mb-7 border-2 border-black p-3 mr-6 rounded-md" @click="addMovie()">
  <div>
    <img :src="`http://localhost:8000/${image}`" width="230" alt="image"/>
  </div>
  <div class="ml-3 flex flex-col h-32 justify-around">
    <div class="flex">
      <p>Movie name: {{$i18n.locale === 'en' ? name.en : name.ka}} </p>
      <p v-if="year" class="ml-3">({{year}})</p>
    </div>
    <p>Director: {{$i18n.locale === 'en' ? director.en : director.ka}}</p>
    <p class="text-xs">Posted By: {{userName}}</p>
    <p v-if="chosenMovie" class="text-green-500 text-xs">Selected :) (click again here to change)</p>
  </div>
</div>
</template>

<script>
import { useMoviesStore } from "@/stores/data/movies.js";
import { mapWritableState } from "pinia";
export default {
  computed: {
    ...mapWritableState(useMoviesStore, ["chosenMovieId", "chosenMovie"])
  },
  props: {
    movieId: {
      type: Number,
      required: false,
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
  methods: {
    addMovie(){
      this.chosenMovieId = this.movieId;
    }
  }
};
</script>
