<template>
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />
  <div v-for="movie in movieDescriptionData" :key="movie">
  <div class="ml-96 text-white">
    <h1 class="mt-28 font-bold">{{$t('message.movie_description')}}</h1>
    <div class="mt-8 flex">
      <div>
        <img
          class="rounded-xl"
          :src="`http://localhost:8000/${movie.image}`"
          alt="img"
          width="800"
        />
      </div>
      <div class="ml-5">
        <div class="flex items-center justify-between">
          <div class="flex text-[#DDCCAA] font-bold">
            <h1>
              {{$i18n.locale === 'en' ? movie.title.en : movie.title.ka}}
            </h1>
            <p v-if="movie.year" class="ml-3">({{ movie.year }})</p>
          </div>
          <div v-if="movie.user_id == userId" class="flex px-7 py-3 rounded-md bg-[#24222F] ">
            <RouterLink :to="{name: 'edit-movie'}">
              <IconPen class="cursor-pointer"/>
            </RouterLink>
            <div class="border-r-2 border-gray-500 mx-7"></div>
            <IconTrash class="cursor-pointer" @click="deleteMovie()"/>
          </div>
        </div>
        <div class="font-bold flex mt-5">
          <p
            v-for="genre in movie.genres"
            :key="genre"
            class="py-1 px-3 mr-3 rounded-md bg-gray-500 w-fit"
          >
            {{ genre.name }}
          </p>
        </div>
        <div class="ml-3">
          <article class="flex font-bold">
            <div>
              <p class="text-sm mt-5">{{$t('message.director')}}:</p>
              <p class="text-sm mt-5">{{$t('message.budget')}}:</p>
            </div>
            <div class="ml-3">
              <p class="text-sm mt-5">
                {{
                  $i18n.locale == "en"
                    ? movie.director.en
                    : movie.director.ka
                }}
              </p>
              <p class="text-sm mt-5">{{ movie.budget.toLocaleString() }}</p>
            </div>
          </article>
          <p class="text-[#CED4DA] w-[30rem] mt-5">
            {{
              $i18n.locale === "en"
                ? movie.description.en
                : movie.description.ka
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="text-white ml-96 mt-8 flex items-center">
    <p :class="movie.user_id == userId ? 'border-r-2 pr-5 py-1 border-gray-800 mr-5' : 'pr-5 py-1 mr-5'">{{$t('message.quotes')}} ({{movie.quotes.length}})</p>
    <RouterLink
v-if="movie.user_id == userId"
      :to="{ name: 'add-quote' }"
      class="flex items-center bg-[#E31221] p-2 rounded-md"
    >
      <IconPlus class="mr-2"/>
      <p>{{$t('message.add_quote')}}</p>
    </RouterLink>
  </div>
  <div v-for="quote in movieDescriptionQuoteData" :key="quote" class="text-white ml-96 mt-10 w-full w-[50rem] bg-[#07060b] p-4 mb-7 rounded-md">
<div class="flex justify-between">
  <div class="flex items-center">
    <img width="200" :src="`http://localhost:8000/${quote.image}`" alt="img"/>
  <div class="w-[32rem]">
    <p class="ml-7 break-words italic text-[#CED4DA] font-sans">"{{$i18n.locale === 'en' ? quote.text.en : quote.text.ka}}"</p>
  </div>
  </div>
  <div>
     <QuoteComponent :quote-user-id="quote.user_id" :quote-id="quote.id"/>
  </div>
</div>
    <div class="my-5 border-gray-700 border-b-2"></div>
    <div class="flex mt-3">
      <div class="flex items-center mr-3">
         <p class="mr-3">{{quote.comments.length}}</p>
        <IconSquare/>
      </div>
      <div class="flex items-center">
        <p class="mr-2">{{quote.likes.length}}</p>
        <IconHeart/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
import QuoteComponent from "@/components/Main/QuoteComponent.vue";
import {useMoviesStore} from '@/stores/formData/movies.js'
import { mapWritableState } from "pinia";
import { useLocalStorageStore } from "@/stores/localStorage.js";
import IconSquare from "@/components/icons/IconSquare.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconPen from "@/components/icons/IconPen.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
export default {
  components: { IconPlus, IconTrash, IconPen, IconHeart, IconSquare, MainHeader, UserNavbar, QuoteComponent },
  mounted() {
    this.getMovieDescription();
  },
  computed: {
    ...mapWritableState(useMoviesStore, ["movieDescriptionData", "movieDescriptionQuoteData"]),
    ...mapWritableState(useLocalStorageStore, ["userId"]),
  },
  methods: {
    deleteMovie() {
      axios.delete(`movie/${this.$route.params.movie}/delete`)
        .then(() => {
          this.$router.push({name: 'movies'})
        })
        .catch((err) => {
          console.log(err)
        });
    },
    getMovieDescription() {
      axios
        .get(`movie-description/${this.$route.params.movie}`)
        .then((res) => {
          this.movieDescriptionData = res.data;
          this.movieDescriptionQuoteData = this.movieDescriptionData.data.quotes;
          this.movieDescriptionQuoteData.sort((a,b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>
