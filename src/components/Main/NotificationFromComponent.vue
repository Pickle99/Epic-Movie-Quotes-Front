<template>
  <div
    class="cursor-pointer flex border-opacity-30 justify-between border-[1px] border-[#6C757D] p-5 rounded-md mb-3"
    @click="showCurrentQuote"
  >
    <div class="flex items-center">
      <div class="flex flex-col items-center">
        <div :class="phase ? 'border-[3px] border-[#198754] rounded-full' : ''">
          <img
            width="72"
            :src="back_url + avatar"
            alt="user-avatar"
          />
        </div>
        <div v-if="SingleOrAllRead" class="md:hidden mt-2 flex justify-end">
          <p class="text-sm text-[#198754]">{{ phase }}</p>
        </div>
      </div>
      <div class="ml-5">
        <p class="mb-3 text-[18px]">{{ username }}</p>
        <div class="flex items-center">
          <div>
            <IconHeartRed v-if="commentOrLike === Liked" />
            <IconChatQuote v-if="commentOrLike === Commented" />
          </div>
          <p class="ml-3 text-[16px] truncate md:w-full w-32">
            {{ commentOrLike }}
          </p>
        </div>
        <p class="mt-5 md:hidden">{{ reactionTimestamp }}</p>
      </div>
    </div>
    <div class="flex flex-col justify-between">
      <p class="hidden md:block">{{ reactionTimestamp }}</p>
      <div v-if="SingleOrAllRead" class="hidden md:flex justify-end">
        <p class="text-sm text-[#198754]">{{ phase }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import { useNotificationsStore } from "@/stores/useNotificationsStore.js";
import { mapWritableState, mapState } from "pinia";
import axios from "@/config/axios/index.js";
import { useRequestsStore } from "@/stores/useRequestsStore.js";
import IconHeartRed from "@/components/icons/IconHeartRed.vue";
import IconChatQuote from "@/components/icons/IconChatQuote.vue";
import { useEnvStore } from "@/stores/useEnvStore";
export default {
  components: { IconChatQuote, IconHeartRed },
  data() {
    return {
      Liked: "Reacted to your quote",
      Commented: "Commented to your movie quote",
      visited: true,
      movieId: "",
    };
  },
  methods: {
    showCurrentQuote() {
      const currentQuoteOfNotification = this.quotesForNotifications.find(
        (quote) => quote.id == this.quoteId
      );
      this.movieId = currentQuoteOfNotification.movie.id;
      this.$router.push({
        name: "show-quote",
        params: { movie: this.movieId, quote: this.quoteId },
      });
      axios
        .post(`notification/${this.notificationId}/mark-single-as-read`)
        .then(() => {
          this.visited = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
    ...mapWritableState(useLocalStorageStore, ["userId"]),
    ...mapWritableState(useNotificationsStore, ["markedAsAllRead"]),
    ...mapWritableState(useRequestsStore, ["quotesForNotifications"]),
    SingleOrAllRead() {
      if (this.markedAsAllRead) {
        return false;
      } else {
        if (this.visited) {
          return true;
        } else return false;
      }
    },
    reactionTimestamp() {
      if (this.timestamp.endsWith("000000Z")) {
        return "now";
      } else return this.timestamp;
    },
    commentOrLike() {
      if (this.reaction === "like") {
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
