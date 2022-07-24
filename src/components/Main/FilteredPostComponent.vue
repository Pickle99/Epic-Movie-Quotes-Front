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
            <p>"{{$i18n.locale === 'en' ? quote.text.en : quote.text.ka}}"</p>
            <div class="flex items-center mx-2">
              <p>movie-</p>
              <RouterLink :to="{name: 'movie-description', params: {movie: movieId}}" class="cursor-pointer ml-1.5 text-[#DDCCAA] font-bold">{{ movieName }}</RouterLink>
            </div>
            <p v-if="year">({{ year }})</p>
          </div>
          <div class="my-6">
            <img
              :src="`http://localhost:8000/${movieImage}`"
              alt="img"
              width="890"
            />
          </div>
          <div class="flex justify-around w-32 items-center mb-3">
            <p>{{quote.comments.length}}</p>
            <img class="cursor-pointer" src="@/assets/icons/square.svg" alt="img" @click="showHideComments()" />
            <p>{{quote.likes.length}}</p>
            <img v-if="!isLiked" class="cursor-pointer" src="@/assets/icons/heart.svg" alt="img" @click="handleAddOrRemoveLike()" />
            <img v-if="isLiked" class="cursor-pointer" src="@/assets/icons/heart-red.svg" alt="img" @click="handleAddOrRemoveLike()" />
          </div>
        </div>
        <div v-if="isCommentsVisible" class="overflow-y-scroll  max-h-[30rem] w-fit">
          <UserCommentComponent v-for="comment in quote.comments" :key="comment" :text="comment.text" :user="comment.comment_from" :avatar="comment.avatar"/>
        </div>

        <div class="flex mt-10 items-center">
          <img
            class="rounded-full"
            :src="null || 'https://ui-avatars.com/api/?name=jackrestler'"
            alt="img"
          />
          <div class="ml-5">
            <input
              v-model="commentText"
              class="bg-[#24222F] w-[37.5rem] pl-5 py-3 text-[#CED4DA] rounded-md"
              placeholder="Write a comment"
              @keydown.enter="handleAddComment"
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
import { useQuotesStore } from "@/stores/formData/quotes.js";
import { useLocalStorageStore } from "@/stores/localStorage.js";
import UserCommentComponent from '@/components/Main/UserCommentComponent.vue';
export default {
  components:{
    UserCommentComponent
  },
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
      isCommentsVisible:false,
    }
  },
  computed: {
    ...mapWritableState(useQuotesStore, ["comments", "filteredQuotes", "commentText"]),
    ...mapWritableState(useLocalStorageStore, ["userId"]),
    isLiked(){

      const currentQuote = this.filteredQuotes.find((quote) => quote.id == this.quoteId);
      const userLike = currentQuote.likes.find((item) => item.user_id == this.userId);
      if(!userLike)
      {
        return this.userLikedQuote;
      } else return !this.userLikedQuote;

    },
  },
  mounted()
  {
    window.Echo.channel('addLike.' + this.quoteId)
      .listen('AddLike', (like) => {
        this.userLikedQuote = true;
        const currentQuote =  this.filteredQuotes.find((quote) => quote.id == this.quoteId);
        currentQuote.likes.push(like);
      });
    window.Echo.channel('removeLike.' + this.quoteId)
      .listen('RemoveLike', () => {
        this.userLikedQuote = false;
        const currentQuote =  this.filteredQuotes.find((quote) => quote.id == this.quoteId);
        currentQuote.likes.shift();
      });
    window.Echo.channel('addComment.' + this.quoteId)
      .listen('AddComment', ({comment}) => {
        const currentQuote =  this.filteredQuotes.find((quote) => quote.id == this.quoteId);
        currentQuote.comments.push(comment);
      });
  },
  methods: {
    showHideComments(){
      this.isCommentsVisible = !this.isCommentsVisible
    },
    handleAddOrRemoveLike() {
      axios
        .get('quote/'+this.quoteId+'/add-like')
        .catch((err) => {
          console.log(err);
        });
    },
    handleAddComment() {
      axios
        .post('quote/'+this.quoteId+'/add-comment', {text: this.commentText})
        .then(() => {
          this.text = "";
        });
    },
  },
};
</script>