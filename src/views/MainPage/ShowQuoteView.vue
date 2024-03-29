<template>
  <div class="mt-24">
    <UserNavbar class="absolute" />
  </div>

  <div v-if="quote.image">
    <form-panel
      :quote-user-id="quoteUserId"
      :author-username="authorUsername"
      :author-avatar="authorAvatar"
      form-title="View Quote"
      link-to="movie-description"
      :route-param="$route.params.movie"
    >
      <ValidationForm>
        <div
          class="py-2 my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
        >
          <Field
            v-model="text_en"
            name="text_en"
            disabled
            class="italic font-serif bg-[#11101A] outline-0 w-full placeholder-white"
            rules="required"
          />
          <p class="text-[#6C757D]">Eng</p>
        </div>
        <ErrorMessage name="text_en" class="text-red-500" />
        <div
          class="py-2 my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
        >
          <Field
            v-model="text_ka"
            name="text_ka"
            disabled
            class="italic font-serif bg-[#11101A] outline-0 w-full placeholder-white"
            rules="required"
          />
          <p class="text-[#6C757D]">ქარ</p>
        </div>
        <ErrorMessage name="text_ka" class="text-red-500" />
        <div class="my-3">
          <p></p>
        </div>
        <img
          class="rounded-xl py-2.5 w-[25rem] md:w-full"
          :src="back_url + quoteImage"
          alt="quote-image"
        />
      </ValidationForm>
      <div class="mt-4">
        <div class="flex justify-around w-32 items-center">
          <p>{{ comments.length }}</p>
          <IconSquare class="cursor-pointer" @click="showHideComments()" />
          <p>{{ likes.length }}</p>
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

      <div
        v-if="isCommentsVisible"
        class="overflow-y-scroll max-h-[30rem] w-fit"
      >
        <UserCommentComponent
          v-for="comment in comments"
          :key="comment"
          :text="comment.text"
          :user="comment.comment_from"
          :avatar="comment.avatar"
        />
      </div>

      <div class="flex mt-4 items-center">
        <img
          class="rounded-full"
          width="64"
          :src="back_url + currentUserAvatar"
          alt="user-avatar"
        />
        <div class="ml-5">
          <input
            v-model="commentText"
            class="bg-[#24222F] md:w-[37.5rem] pl-5 py-3 text-[#CED4DA] rounded-md"
            placeholder="Write a comment"
            @keydown.enter="handleAddComment"
          />
        </div>
      </div>
    </form-panel>
  </div>
</template>
<script>
import FormPanel from "@/components/Main/QuoteFormPanel.vue";
import { Form as ValidationForm, Field, ErrorMessage } from "vee-validate";
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import { mapWritableState, mapState } from "pinia";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import UserCommentComponent from "@/components/Main/UserCommentComponent.vue";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconHeartRed from "@/components/icons/IconHeartRed.vue";
import IconSquare from "@/components/icons/IconSquare.vue";
import { useEnvStore } from "@/stores/useEnvStore";
export default {
  components: {
    IconSquare,
    IconHeartRed,
    IconHeart,
    FormPanel,
    ValidationForm,
    Field,
    ErrorMessage,
    UserNavbar,
    UserCommentComponent,
  },
  data() {
    return {
      quote: [],
      authorUsername: "",
      authorAvatar: "",
      quoteUserId: "",
      userLikedQuote: false,
      likes: [],
      comments: [],
      isCommentsVisible: false,
    };
  },
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
    ...mapWritableState(useMoviesStore, ["text_en", "text_ka"]),
    ...mapWritableState(useLocalStorageStore, ["userId", "avatar"]),
    currentUserAvatar() {
      return localStorage.getItem("avatar");
    },
    quoteImage() {
      return this.quote.image;
    },
    isLiked() {
      const userLike = this.likes.find(
        (item) => item.user_id === parseInt(this.userId)
      );
      return !userLike ? this.userLikedQuote : !this.userLikedQuote;
    },
  },
  created() {
    this.handleGetQuoteRequest();
    window.Echo.channel("addLike." + this.$route.params.quote).listen(
      "AddLike",
      (like) => {
        this.userLikedQuote = true;
        this.likes.push(like);
      }
    );
    window.Echo.channel("removeLike." + this.$route.params.quote).listen(
      "RemoveLike",
      () => {
        this.userLikedQuote = false;
        this.likes.shift();
      }
    );
    window.Echo.channel("addComment." + this.$route.params.quote).listen(
      "AddComment",
      ({ comment }) => {
        this.comments.push(comment);
      }
    );
  },
  methods: {
    handleGetQuoteRequest() {
      axios
        .get(`quote/` + this.$route.params.quote)
        .then((res) => {
          this.quote = res.data.data;
          this.likes = res.data.data.likes;
          this.comments = res.data.data.comments;
          this.text_en = `"${this.quote.text.en}"`;
          this.text_ka = `"${this.quote.text.ka}"`;
          this.authorUsername = this.quote.user.username;
          this.authorAvatar = this.quote.user.avatar;
          this.quoteUserId = this.quote.user.id;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showHideComments() {
      this.isCommentsVisible = !this.isCommentsVisible;
    },
    handleAddOrRemoveLike() {
      this.isUserLiked = this.isLiked;
      this.isUserLiked = !this.isUserLiked;
      axios
        .get("quote/" + this.$route.params.quote + "/add-like")
        .catch((err) => {
          console.log(err);
        });
    },
    handleAddComment() {
      axios
        .post("quote/" + this.$route.params.quote + "/add-comment", {
          text: this.commentText,
        })
        .then(() => {
          this.commentText = "";
        });
    },
  },
};
</script>
