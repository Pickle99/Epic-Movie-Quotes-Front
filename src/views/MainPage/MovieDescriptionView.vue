<template>
  <div class="flex md:mb-24 z-0 mb-24">
    <MainHeader />
    <UserNavbarMobile class="absolute z-10" />
  </div>
  <UserNavbar class="fixed" />
  <div class="flex justify-center -mt-12">
    <NotificationComponent
      :class="!isNotificationVisible ? 'hidden' : 'fixed md:hidden'"
    />
  </div>

  <div v-for="movie in movieDescriptionData" :key="movie">
    <div class="md:ml-96 text-white">
      <h1 class="mt-28 font-bold hidden md:block">
        {{ $t("message.movie_description") }}
      </h1>
      <div class="mt-8 flex flex-col md:flex-row mx-5 md:mx-0">
        <div>
          <img
            class="rounded-xl md:w-[60rem]"
            :src="back_url + movie.image"
            alt="movie-image"
          />
        </div>
        <div class="ml-5">
          <div class="flex items-center justify-between">
            <div class="flex text-[#DDCCAA] font-bold">
              <h1>
                {{ $i18n.locale !== "en" ? movie.title.en : movie.title.ka }}
              </h1>
              <p v-if="movie.year" class="ml-3">({{ movie.year }})</p>
            </div>
            <div
              v-if="movie.user_id === parseInt(userId)"
              class="mt-5 md:mt-0 flex px-7 py-3 rounded-md bg-[#24222F]"
            >
              <RouterLink :to="{ name: 'edit-movie' }">
                <IconPen class="cursor-pointer" />
              </RouterLink>
              <div class="border-r-2 border-gray-500 mx-7"></div>
              <IconTrash class="cursor-pointer" @click="deleteMovie()" />
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
                <p class="text-sm mt-5">{{ $t("message.director") }}:</p>
                <p class="text-sm mt-5">{{ $t("message.budget") }}:</p>
              </div>
              <div class="ml-3">
                <p class="text-sm mt-5">
                  {{
                    $i18n.locale !== "en"
                      ? movie.director.en
                      : movie.director.ka
                  }}
                </p>
                <p class="text-sm mt-5">{{ movie.budget.toLocaleString() }}</p>
              </div>
            </article>
            <p class="text-[#CED4DA] md:w-[30rem] mt-5">
              {{
                $i18n.locale !== "en"
                  ? movie.description.en
                  : movie.description.ka
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-white md:ml-96 mt-8 flex items-center">
      <p
        :class="
          movie.user_id === parseInt(userId)
            ? 'md:block hidden border-r-2 pr-5 py-1 border-gray-800 mr-5'
            : 'md:block hidden pr-5 py-1 mr-5'
        "
      >
        {{ $t("message.quotes") }} ({{ movie.quotes.length }})
      </p>
      <RouterLink
        v-if="movie.user_id === parseInt(userId)"
        :to="{ name: 'add-quote' }"
        class="flex ml-7 md:ml-0 items-center bg-[#E31221] p-2 rounded-md"
      >
        <IconPlus class="mr-2" />
        <p>{{ $t("message.add_quote") }}</p>
      </RouterLink>
    </div>
    <div
      class="md:hidden border-b-2 border-gray-700 mt-5 mx-7 flex justify-center"
    ></div>
    <div class="text-white my-7 ml-7 md:hidden">
      <p class="font-bold">
        {{ $t("message.all_quotes") }}
      </p>
      <p>({{ $t("message.total") }} {{ movie.quotes.length }})</p>
    </div>
    <div
      v-for="quote in movieDescriptionQuoteData"
      :key="quote"
      class="text-white mx-5 md:mx-0 md:ml-96 mt-10 md:w-[60rem] bg-[#07060b] p-4 mb-7 rounded-md"
    >
      <div class="flex justify-between">
        <div class="flex flex-col md:flex-row w-full items-center">
          <img
            class="md:w-[15rem] md:h-auto h-[8rem] w-[19rem] object-center"
            :src="back_url + quote.image"
            alt="quote-image"
          />
          <div class="md:w-[32rem]">
            <p
              class="md:ml-7 mt-2 md:mt-0 break-words italic text-[#CED4DA] font-sans"
            >
              "{{ $i18n.locale !== "en" ? quote.text.en : quote.text.ka }}"
            </p>
          </div>
        </div>
        <div class="hidden md:block">
          <QuoteComponent :quote-user-id="quote.user_id" :quote-id="quote.id" />
        </div>
      </div>
      <div class="my-5 border-gray-700 border-b-2"></div>
      <div class="flex mt-3 flex justify-between">
        <div class="flex">
          <div class="flex items-center mr-3">
            <p class="mr-3">{{ quote.comments.length }}</p>
            <IconSquare />
          </div>
          <div class="flex items-center">
            <p class="mr-2">{{ quote.likes.length }}</p>
            <IconHeart />
          </div>
        </div>
        <div class="md:hidden">
          <QuoteComponent :quote-user-id="quote.user_id" :quote-id="quote.id" />
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
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import { mapWritableState, mapState } from "pinia";
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import IconSquare from "@/components/icons/IconSquare.vue";
import IconHeart from "@/components/icons/IconHeart.vue";
import IconPen from "@/components/icons/IconPen.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import UserNavbarMobile from "@/components/Main/UserNavbarMobile.vue";
import { useNotificationsStore } from "@/stores/useNotificationsStore.js";
import NotificationComponent from "@/components/Main/NotificationComponent.vue";
import { useEnvStore } from "@/stores/useEnvStore";
export default {
  components: {
    IconPlus,
    NotificationComponent,
    IconTrash,
    IconPen,
    IconHeart,
    IconSquare,
    UserNavbarMobile,
    MainHeader,
    UserNavbar,
    QuoteComponent,
  },
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
    ...mapWritableState(useNotificationsStore, ["isNotificationVisible"]),
    ...mapWritableState(useMoviesStore, [
      "movieDescriptionData",
      "movieDescriptionQuoteData",
    ]),
    ...mapWritableState(useLocalStorageStore, ["userId"]),
  },
  mounted() {
    this.getMovieDescription();
  },
  methods: {
    deleteMovie() {
      axios
        .delete(`movie/${this.$route.params.movie}`)
        .then(() => {
          this.$router.push({ name: "movies" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMovieDescription() {
      axios
        .get(`movie-description/${this.$route.params.movie}`)
        .then((res) => {
          this.movieDescriptionData = res.data;
          this.movieDescriptionQuoteData =
            this.movieDescriptionData.data.quotes;
          this.movieDescriptionQuoteData.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
