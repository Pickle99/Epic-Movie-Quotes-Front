<template>
  <div class="flex md:mb-24 z-0 mb-24">
    <MainHeader
      :class="$route.name !== 'movies-add' ? '' : 'hidden md:block'"
    />
    <UserNavbarMobile class="absolute z-10" />
  </div>
  <UserNavbar class="absolute" />
  <div class="flex justify-center -mt-12">
    <NotificationComponent
      :class="!isNotificationVisible ? 'hidden' : 'fixed md:hidden'"
    />
  </div>
  <div
    :class="
      $route.name !== 'movies-add'
        ? 'mt-28'
        : 'mt-28 pointer-events-none opacity-40 hidden md:block'
    "
  >
    <div
      class="text-white flex-col md:flex-row flex justify-between ml-8 md:ml-0 md:ml-96 md:mr-28"
    >
      <div class="w-32 md:w-fit">
        <p>
          {{ $t("message.my_list_of_movies") }} ({{ $t("message.total") }}
          {{ userMovies.length }})
        </p>
      </div>
      <div class="flex">
        <div class="flex items-center">
          <IconMagnifyingGlass class="mr-3" />
          <input
            v-model="userMoviesSearch"
            class="focus:outline-0 bg-[#0d0b14] w-20"
            :placeholder="$t('message.search')"
          />
        </div>
        <RouterLink
          :to="{ name: 'movies-add' }"
          class="flex mt-3 md:mt-0 items-center bg-[#E31221] p-3 rounded-md"
        >
          <IconPlus class="mr-2" />
          <p>{{ $t("message.add_movie") }}</p>
        </RouterLink>
      </div>
    </div>
    <div
      :class="
        $route.name === 'movies-add'
          ? 'absolute justify-center w-screen md:w-fit px-7 flex md:ml-96 md:mr-28 md:grid md:grid-cols-3 text-white mt-10 gap-y-5 gap-x-12'
          : 'flex justify-center flex-col md:mx-32 md:w-fit w-screen px-7 md:px-0 md:ml-96 md:mr-28 md:grid md:grid-cols-3 text-white mt-10 gap-y-5 gap-x-12'
      "
    >
      <article v-for="movie in filteredUserMovies" :key="movie">
        <RouterLink
          :to="{ name: 'movie-description', params: { movie: movie.id } }"
          class="hover:cursor-pointer"
        >
          <img
            :src="back_url + movie.image"
            alt="movie-image"
            class="rounded-xl h-96 w-[30rem] hover:cursor-pointer mb-4"
          />
          <div class="font-bold uppercase flex">
            <p>
              {{ $i18n.locale === "en" ? movie.title.en : movie.title.ka }}
            </p>
            <p v-if="movie.year" class="ml-3">({{ movie.year }})</p>
          </div>
        </RouterLink>
        <div class="flex items-center mt-3">
          <p v-if="movie.quotes">{{ movie.quotes.length }}</p>
          <p v-if="!movie.quotes">0</p>
          <IconChatQuote class="ml-3" width="20" />
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
import { mapWritableState, mapState } from "pinia";
import IconChatQuote from "@/components/icons/IconChatQuote.vue";
import IconMagnifyingGlass from "@/components/icons/IconMagnifyingGlass.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import UserNavbarMobile from "@/components/Main/UserNavbarMobile.vue";
import NotificationComponent from "@/components/Main/NotificationComponent.vue";
import { useNotificationsStore } from "@/stores/useNotificationsStore.js";
import { useEnvStore } from "@/stores/useEnvStore";
export default {
  components: {
    IconPlus,
    IconMagnifyingGlass,
    IconChatQuote,
    UserNavbar,
    NotificationComponent,
    MainHeader,
    UserNavbarMobile,
  },
  mounted() {
    this.getUserMovies();
  },
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
    ...mapWritableState(useNotificationsStore, ["isNotificationVisible"]),
    ...mapWritableState(useMoviesStore, ["userMovies", "userMoviesSearch"]),
    filteredUserMovies() {
      return this.userMovies.filter((movie) => {
        if (this.$i18n.locale === "en") {
          return movie.title.en
            .toLowerCase()
            .match(this.userMoviesSearch.toLowerCase());
        } else
          return movie.title.ka
            .toLowerCase()
            .match(this.userMoviesSearch.toLowerCase());
      });
    },
  },
  methods: {
    getUserMovies() {
      axios
        .get("user-movies")
        .then((res) => {
          this.userMovies = res.data.data;
          this.userMovies.sort((a, b) => {
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
