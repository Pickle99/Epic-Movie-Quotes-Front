<template>
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />
  <div v-for="movie in movies" :key="movie">
    
  
  <div class="ml-96 text-white">
    <h1 class="mt-28 font-bold">Movie description</h1>
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
          <h1 class="text-[#DDCCAA] font-bold">
            {{$i18n.locale === 'en' ? movie.title.en : movie.title.ka}}
            ({{ movie.year }})
          </h1>
          <div class="flex px-7 py-3 rounded-md bg-[#24222F] ">
            <RouterLink :to="{name: 'edit-movie'}">
              <img class="cursor-pointer" src="@/assets/icons/pen.svg" alt="icon"/>
            </RouterLink>
            <div class="border-r-2 border-gray-500 mx-7"></div>
            <img class="cursor-pointer" src="@/assets/icons/trash.svg" alt="icon"/>
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
              <p class="text-sm mt-5">Director:</p>
              <p class="text-sm mt-5">Budget:</p>
            </div>
            <div class="ml-3">
              <p class="text-sm mt-5">
                {{
                  $i18n.locale == "en"
                    ? movie.director.en
                    : movie.director.ka
                }}
              </p>
              <p class="text-sm mt-5">{{ movie.budget }}</p>
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
    <p class="border-r-2 pr-5 py-1 border-gray-800 mr-5">Quotes ({{movie.quotes.length}})</p>
    <RouterLink
      :to="{ name: 'add-quote' }"
      class="flex items-center bg-[#E31221] p-2 rounded-md"
    >
      <img class="mr-2" src="@/assets/icons/plus.svg" alt="img" />
      <p>Add Quote</p>
    </RouterLink>
  </div>
  <div v-for="quote in movie.quotes" :key="quote" class="text-white ml-96 mt-10 w-full w-[50rem] bg-[#07060b] p-4 mb-7 rounded-md">
<div class="flex justify-between">
  <div class="flex items-center">
    <img width="200" :src="`http://localhost:8000/${quote.image}`" alt="img"/>
    <p class="ml-7 italic text-[#CED4DA] font-sans">"{{$i18n.locale === 'en' ? quote.text.en : quote.text.ka}}"</p>
  </div>
  <div>
     <QuoteComponent :quote-id="quote.id"/>
  </div>
</div>
    <div class="my-5 border-gray-700 border-b-2"></div>
    <div class="flex mt-3">
      <div class="flex items-center mr-3">
         <p class="mr-3">3</p>
        <img src="@/assets/icons/square.svg" alt="icon"/>
      </div>
      <div class="flex items-center">
        <p class="mr-2">10</p>
        <img src="@/assets/icons/heart.svg" alt="icon"/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
import QuoteComponent from "@/components/Landing/QuoteComponent.vue";
export default {
  components: { MainHeader, UserNavbar, QuoteComponent },
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.getMovieDescription();
  },
  methods: {
    getMovieDescription() {
      axios
        .post(`movie/${this.$route.params.movie}`)
        .then((res) => {
          this.movies = res.data;
          console.log(res);
          console.log(this.movies, "movie");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>
