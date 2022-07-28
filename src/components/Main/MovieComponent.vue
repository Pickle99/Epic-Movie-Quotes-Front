<template>
<div     class="flex mb-7 border-2 border-black p-3 mr-6 rounded-md" @click="addMovie()">
  <div>
    <img :src="`http://localhost:8000/${image}`" width="230" alt="image"/>
  </div>
  <div class="ml-3 flex flex-col h-32 justify-around">
    <div class="flex">
      <p>{{$t('message.movie_name')}}: {{$i18n.locale === 'en' ? name.en : name.ka}} </p>
      <p v-if="year" class="ml-3">({{year}})</p>
    </div>
    <p>Director: {{$i18n.locale === 'en' ? director.en : director.ka}}</p>
    <p class="text-xs">Posted By: {{userName}}</p>
    <p v-if="chosenMovie" class="text-green-500 text-xs">{{$t('message.selected')}}</p>
  </div>
</div>
</template>

<script>
import { useQuotesStore } from "@/stores/quotes.js";
import { mapWritableState } from "pinia";
export default {
  computed: {
    ...mapWritableState(useQuotesStore, ["chosenMovieId", "chosenMovie", "allUsersMovies"])
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
      this.chosenMovie =  this.allUsersMovies.find((movie) => movie.id === this.movieId);
    },
  }
};
</script>
