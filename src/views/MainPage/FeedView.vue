<template>
  <div class="flex md:mb-24 z-0 mb-24">
    <MainHeader />
    <UserNavbarMobile class="absolute z-10" />
    <div class="fixed z-20">
      <SearchComponentMobile v-if="isSearchVisible" />
    </div>
  </div>
  <UserNavbar class="fixed" />
  <div v-if="isModalOpen" class="flex justify-center">
    <WriteNewQuote class="fixed z-10" />
  </div>
  <div :class="isModalOpen ? 'opacity-20 pointer-events-none' : ''">
    <div class="text-white justify-center flex" @scroll="handleGetQuote">
      <div class="flex flex-col">
        <div class="flex mt-3">
          <div class="ml-10 md:ml-0 md:py-3 md:px-3 md:bg-[#24222F] rounded-md">
            <div class="flex w-[10rem] cursor-pointer" @click="showModal">
              <IconPencil class="mr-4" />
              <p>{{ $t("message.write_new_quote") }}</p>
            </div>
          </div>
          <div
            class="hidden md:flex w-full ml-10 items-center border-gray-700 border-b-4"
          >
            <div class="mr-3">
              <IconMagnifyingGlass />
            </div>
            <div>
              <input
                v-model="search"
                class="focus:outline-0 bg-[#0d0b14] w-96"
                :placeholder="$t('message.enter_to_search_in')"
                @keydown.enter="handleGetQuote(false)"
                @keydown="resetPage()"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <NotificationComponent
            :class="
              !isNotificationVisible
                ? 'hidden'
                : 'md:-mr-[90rem] md:-mt-20 -mt-12 fixed'
            "
          />
        </div>
        <div v-if="!filteredFeedView">
          <PostComponent
            v-for="quote in allQuotes"
            :key="quote"
            :movie-id="quote.movie.id"
            :movie-name="
              $i18n.locale !== 'en'
                ? quote.movie.title.en
                : quote.movie.title.ka
            "
            :movie-image="quote.image"
            :year="quote.movie.year"
            :posted-by="quote.user.username"
            :user-avatar="quote.user.avatar"
            :quote-id="quote.id"
            :quote="quote"
          />
        </div>
        <div v-if="filteredFeedView">
          <FilteredPostComponent
            v-for="quote in filteredFeedView"
            :key="quote"
            :movie-id="quote.movie.id"
            :movie-name="
              $i18n.locale !== 'en'
                ? quote.movie.title.en
                : quote.movie.title.ka
            "
            :movie-image="quote.image"
            :year="quote.movie.year"
            :posted-by="quote.user.username"
            :user-avatar="quote.user.avatar"
            :quote-id="quote.id"
            :quote="quote"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
import PostComponent from "@/components/Main/PostComponent.vue";
import FilteredPostComponent from "@/components/Main/FilteredPostComponent.vue";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { mapWritableState, mapState, mapActions } from "pinia";
import WriteNewQuote from "@/views/MainPage/WriteNewQuote.vue";
import IconMagnifyingGlass from "@/components/icons/IconMagnifyingGlass.vue";
import IconPencil from "@/components/icons/IconPencil.vue";
import UserNavbarMobile from "@/components/Main/UserNavbarMobile.vue";
import SearchComponentMobile from "@/components/Main/SearchComponentMobile.vue";
import NotificationComponent from "@/components/Main/NotificationComponent.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import { useNotificationsStore } from "@/stores/useNotificationsStore.js";
export default {
  components: {
    SearchComponentMobile,
    UserNavbarMobile,
    IconPencil,
    IconMagnifyingGlass,
    WriteNewQuote,
    MainHeader,
    UserNavbar,
    PostComponent,
    FilteredPostComponent,
    NotificationComponent,
  },
  computed: {
    ...mapWritableState(useNotificationsStore, ["isNotificationVisible"]),
    ...mapWritableState(useUserStore, ["isSearchVisible"]),
    ...mapWritableState(useQuotesStore, [
      "allQuotes",
      "isModalOpen",
      "page",
      "lastPage",
      "search",
      "filteredQuotes",
    ]),
    ...mapState(useQuotesStore, ["filteredFeedView", "searchIn"]),
  },
  created() {
    this.scroll();
  },
  methods: {
    ...mapActions(useQuotesStore, ["resetPage"]),
    handleGetQuote(scroll) {
      if (this.page > this.lastPage) {
        return;
      }
      if (this.page === 1 && scroll === true) {
        this.page = 2;
        this.lastPage = 3;
      }
      axios
        .post(`feed?page=${this.page}&search=${this.searchIn}`)
        .then((res) => {
          this.page++;
          if (this.search) {
            scroll
              ? this.filteredQuotes.push(...res.data.data)
              : (this.filteredQuotes = res.data.data);
            this.lastPage = res.data.meta.last_page;
          } else {
            if (scroll) {
              this.allQuotes.push(...res.data.data);
              this.lastPage = res.data.meta.last_page;
            } else {
              this.allQuotes = res.data.data;
              this.lastPage = res.data.meta.last_page;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showModal() {
      this.isModalOpen = true;
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.handleGetQuote(true);
        }
      };
    },
  },
};
</script>
