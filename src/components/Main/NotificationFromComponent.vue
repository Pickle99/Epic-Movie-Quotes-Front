<template>
  <div class="cursor-pointer flex border-opacity-30 justify-between border-[1px] border-[#6C757D] p-5 rounded-md mb-3" @click="showCurrentQuote">
    <div class="flex items-center">
      <div :class="phase ? 'border-[3px] border-[#198754] rounded-full' : ''">
        <img width="72"   :src="`http://localhost:8000/${avatar}`" alt="image"/>
      </div>
      <div class="ml-5">
        <p class="mb-3 text-[18px]">{{ username }}</p>
        <div class="flex items-center">
          <div>
            <img v-if="commentOrLike === Liked" src="@/assets/icons/heart-red.svg" alt="icon"/>
            <img v-if="commentOrLike === Commented" src="@/assets/icons/chat-quote.svg" alt="icon"/>
          </div>
          <p class="ml-3 text-[16px]">{{commentOrLike}}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col  justify-between">
      <p>{{reactionTimestamp}}</p>
      <div v-if="SingleOrAllRead" class="flex justify-end"><p class="text-sm text-[#198754]">{{phase}}</p></div>
    </div>
  </div>
</template>

<script>
import { useLocalStorageStore } from "@/stores/localStorage.js";
import { useNotificationsStore } from '@/stores/notifications.js';
import { useQuotesStore } from "@/stores/data/quotes.js";
import { mapWritableState } from "pinia";
import axios from "@/config/axios/index.js";
export default {
  data()
  {
    return {
      Liked: 'Reacted to your quote',
      Commented: 'Commented to your movie quote',
      visited: true,
      movieId: '',
    }
  },
  methods: {
    showCurrentQuote() {
      const currentQuoteOfNotification = this.allQuotes.find((quote) => quote.id == this.quoteId);
      this.movieId = currentQuoteOfNotification.movie.id;
      this.$router.push({name: 'show-quote', params: {movie: this.movieId, quote: this.quoteId}});
      axios.get(`notification/${this.notificationId}/mark-single-as-read`).then(() => {
        this.visited = true;
      })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapWritableState(useLocalStorageStore, ["userId"]),
    ...mapWritableState(useNotificationsStore, ["markedAsAllRead"]),
    ...mapWritableState(useQuotesStore, ["allQuotes"]),
    SingleOrAllRead(){
      if(this.markedAsAllRead)
      {
        return false;
      } else {
        if(this.visited){
          return true;
        } else return false;
      }
    },
    reactionTimestamp()
    {
      if(this.timestamp.endsWith('000000Z'))
      {
        return 'now'
      } else return this.timestamp;
    },
    commentOrLike()
    {
      if(this.reaction === 'like')
      {
        return this.Liked;
      } else return this.Commented;
    },
  },
  props: {
    notificationId: {
      type: Number,
      required: true,
    },
    phase: {
      type: [String, null],
      required: true,
    },
    quoteId: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    reaction: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
};
</script>