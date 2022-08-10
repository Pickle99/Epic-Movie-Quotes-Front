<template>
  <div class="mt-5 mb-5">
    <div class="md:w-[45rem] bg-[#11111A]">
      <div class="px-5 py-5">
        <div class="border-b border-gray-600">
          <header class="flex items-center">
            <img
              class="rounded-full"
              :src="back_url + userAvatar"
              width="48"
              alt="user-avatar"
            />
            <p class="ml-5">{{ postedBy }}</p>
          </header>
          <div class="flex mt-5">
            <p>"{{ $i18n.locale !== "en" ? quote.text.en : quote.text.ka }}"</p>
            <div class="flex items-center mx-2">
              <p>{{ $t("message.movie") }}-</p>
              <RouterLink
                :to="{ name: 'movie-description', params: { movie: movieId } }"
                class="cursor-pointer ml-1.5 text-[#DDCCAA] font-bold"
                >{{ movieName }}</RouterLink
              >
            </div>
            <p v-if="year">({{ year }})</p>
          </div>
          <div class="my-6">
            <img
              :src="back_url + movieImage"
              alt="movie-image"
              class="md:w-[50rem] w-[30rem]"
            />
          </div>
          <div class="flex justify-around w-32 items-center mb-3">
            <p>{{ quote.comments.length }}</p>
            <IconSquare class="cursor-pointer" @click="showHideComments()" />
            <p>{{ quote.likes.length }}</p>
            <IconHeart
              v-if="!isLiked"
              class="cursor-pointer"
              @click="handleAddOrRemoveLike()"
            />
            <IconHeartRed
              v-if="isLiked"
              class="cursor-pointer"
              @click="handleAddOrRemoveLike()"
            />
          </div>
        </div>
        <div v-if="isCommentsVisible" class="overflow-y-scroll max-h-[30rem]">
          <UserCommentComponent
            v-for="comment in quote.comments"
            :key="comment"
            :text="comment.text"
            :user="comment.comment_from"
            :avatar="comment.avatar"
          />
        </div>

        <div class="flex mt-10 items-center">
          <img
            class="rounded-full"
            width="64"
            :src="back_url + avatar"
            alt="user-avatar"
          />
          <div class="ml-5">
            <input
              v-model="commentText"
              class="bg-[#24222F] md:w-[37.5rem] pl-5 py-3 text-[#CED4DA] rounded-md"
              :placeholder="$t('message.write_a_comment')"
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
import { mapWritableState, mapState } from "pinia";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import UserCommentComponent from "@/components/Main/UserCommentComponent.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconHeartRed from "@/components/icons/IconHeartRed.vue";
import IconSquare from "@/components/icons/IconSquare.vue";
import { useEnvStore } from "@/stores/useEnvStore";
export default {
  components: { IconSquare, IconHeartRed, IconHeart, UserCommentComponent },
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
      default: null,
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
  data() {
    return {
      userLikedQuote: false,
      isCommentsVisible: false,
      commentText: "",
    };
  },
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
    ...mapWritableState(useQuotesStore, ["allQuotes", "comments"]),
    ...mapWritableState(useLocalStorageStore, ["userId", "avatar"]),
    isLiked() {
      const currentQuote = this.allQuotes.find(
        (quote) => quote.id === this.quoteId
      );
      const userLike = currentQuote.likes.find(
        (item) => item.user_id === parseInt(this.userId)
      );
      return !userLike ? this.userLikedQuote : !this.userLikedQuote;
    },
  },
  mounted() {
    window.Echo.channel("addLike." + this.quoteId).listen("AddLike", (like) => {
      const currentQuote = this.allQuotes.find(
        (quote) => quote.id === this.quoteId
      );
      currentQuote.likes.push(like);
    });
    window.Echo.channel("removeLike." + this.quoteId).listen(
      "RemoveLike",
      () => {
        const currentQuote = this.allQuotes.find(
          (quote) => quote.id === this.quoteId
        );
        currentQuote.likes.shift();
      }
    );
    window.Echo.channel("addComment." + this.quoteId).listen(
      "AddComment",
      ({ comment }) => {
        const currentQuote = this.allQuotes.find(
          (quote) => quote.id === this.quoteId
        );
        currentQuote.comments.push(comment);
      }
    );
  },
  unmounted() {
    window.Echo.channel("addLike." + this.quoteId).stopListening("AddLike");
    window.Echo.channel("removeLike." + this.quoteId).stopListening(
      "RemoveLike"
    );
    window.Echo.channel("addComment." + this.quoteId).stopListening(
      "AddComment"
    );
  },
  methods: {
    showHideComments() {
      this.isCommentsVisible = !this.isCommentsVisible;
    },
    handleAddOrRemoveLike() {
      !this.isLiked
        ? (this.userLikedQuote = true)
        : (this.userLikedQuote = false);
      axios.get("quote/" + this.quoteId + "/add-like").catch((err) => {
        console.log(err);
      });
    },
    handleAddComment() {
      axios
        .post("quote/" + this.quoteId + "/add-comment", {
          text: this.commentText,
        })
        .then(() => {
          this.commentText = "";
        });
    },
  },
};
</script>
