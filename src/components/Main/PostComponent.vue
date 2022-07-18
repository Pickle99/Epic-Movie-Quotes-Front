<template>
  <div class="mt-5 mb-5">
    <div class="w-[45rem] bg-[#11111A]">
      <div class="px-5 py-5">
        <div class="border-b border-gray-600">
          <header class="flex items-center">
            <img
              class="rounded-full"
              :src="`http://localhost:8000/${userAvatar}`"
              width="48"
              alt="img"
            />
            <p class="ml-5">{{ postedBy }}</p>
          </header>
          <div class="flex mt-5">
            <p>"{{quoteText}}"</p>
            <div class="flex items-center mx-2">
              <p>movie-</p>
              <RouterLink :to="{name: 'movie-description', params: {movie: movieId}}" class="cursor-pointer ml-1.5 text-[#DDCCAA] font-bold">{{ movieName }}</RouterLink>
            </div>
            <p>({{ year }})</p>
          </div>
          <div class="my-6">
            <img
              :src="`http://localhost:8000/${movieImage}`"
              alt="img"
              width="890"
            />
          </div>
          <div class="flex justify-around w-32 items-center mb-3">
            <p>{{quote.likes.length}}</p>
            <img v-if="!isLiked" src="@/assets/icons/heart.svg" alt="img" @click="addOrRemoveLike()" />
            <img v-if="isLiked" src="@/assets/icons/heart-red.svg" alt="img" @click="addOrRemoveLike()" />
            <p>10</p>
            <img src="@/assets/icons/square.svg" alt="img" />
          </div>
        </div>
        <article class="mt-10">
          <div class="flex items-center">
            <div>
              <img
                class="rounded-full"
                :src="'https://ui-avatars.com/api/?name=jackrestler'"
                alt="img"
              />
            </div>
            <div>
              <p class="ml-5">Some random guy comment</p>
            </div>
          </div>
          <div class="border-b border-gray-600 w-[37.5rem] ml-20">
            <p class="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque nunc vel massa facilisis consequat elit morbi
              convallis convallis. Volutpat vitae et nisl et. Adipiscing enim
              integer mi leo nisl. Arcu vitae mauris odio eget.
            </p>
          </div>
        </article>
        <article class="mt-10">
          <div class="flex items-center">
            <div>
              <img
                class="rounded-full"
                :src="'https://ui-avatars.com/api/?name=jackrestler'"
                alt="img"
              />
            </div>
            <div>
              <p class="ml-5">Nikoloz</p>
            </div>
          </div>
          <div class="border-b border-gray-600 w-[37.5rem] ml-20">
            <p class="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </article>
        <div class="flex mt-10 items-center">
          <img
            class="rounded-full"
            :src="null || 'https://ui-avatars.com/api/?name=jackrestler'"
            alt="img"
          />
          <div class="ml-5">
            <input
              class="bg-[#24222F] w-[37.5rem] pl-5 py-3 text-[#CED4DA] rounded-md"
              placeholder="Write a comment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useRequestsStore } from "@/stores/requests.js";
import { useLocalStorageStore } from "@/stores/localStorage.js";
export default {
  props: {
    quoteId: {
      type: Number,
      required: true,
    },
    quote: {
      type: Object,
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    movieName: {
      type: String,
      required: true,
    },
    quoteText: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: false,
    },
    movieImage: {
      type: String,
      required: true,
    },
    postedBy: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      required: true,
    },
  },
  data(){
    return{
    userLikedQuote: false,
    }
  },
  computed: {
    ...mapWritableState(useRequestsStore, ["allQuotes"]),
    ...mapWritableState(useLocalStorageStore, ["userId"]),
    isLiked(){
      const currentQuote =  this.allQuotes.find((quote) => quote.id == this.quoteId);
      const userLike = currentQuote.likes.find((item) => item.user_id == this.userId);
      if(!userLike)
      {
        return this.userLikedQuote;
      } else return !this.userLikedQuote;

    },
  },
  created()
  {
    window.Echo.channel('addLike.' + this.quoteId)
      .listen('AddLike', (like) => {
        const currentQuote =  this.allQuotes.find((quote) => quote.id == this.quoteId);
          currentQuote.likes.push(like)
          this.userLikedQuote = true;
      });
    window.Echo.channel('removeLike.' + this.quoteId)
      .listen('RemoveLike', () => {
        const currentQuote =  this.allQuotes.find((quote) => quote.id == this.quoteId);
        currentQuote.likes.shift();
        this.userLikedQuote = false;
      });
  },
  methods: {
   addOrRemoveLike()
   {
     axios
       .get('quote/'+this.quoteId+'/add-like')
       .then((res) => {
         console.log(res);
       });
   },
  },
};
</script>
