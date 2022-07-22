<template >
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />
  <div v-if="isModalOpen" class="flex justify-center">
    <WriteNewQuote  class="fixed z-10"/>
  </div>
<div :class="isModalOpen ? 'opacity-20 pointer-events-none' : ''">
  <div class="text-white justify-center flex" @scroll="handleGetQuote">
    <div class="flex flex-col">
      <div class="flex mt-3">
        <div class="py-3 px-3 bg-[#24222F] rounded-md">
          <div class="flex w-[10rem] cursor-pointer" @click="showModal">
            <img class="mr-4" src="@/assets/icons/pencil.svg" />
            <p>Write new quote</p>
          </div>
        </div>
        <div class="w-full ml-10 flex items-center border-gray-700 border-b-4">
          <div class="mr-3">
            <img src="@/assets/icons/magnifying-glass.svg" />
          </div>
          <div class="w-full">
            <input
              v-model="search"
              class="focus:outline-0 bg-[#0d0b14] w-96"
              placeholder="Enter @ to search movies, Enter # to search quotes"
              @keydown.enter="handleGetQuote(false)"
              @keydown="resetPage()"
            />
          </div>
        </div>
      </div>
      <div  v-if="!filteredFeedView">
        <PostComponent
          v-for="quote in allQuotes"
          :key="quote"
          :movie-id="quote.movie.id"
          :movie-name="$i18n.locale === 'en' ? quote.movie.title.en : quote.movie.title.ka"
          :movie-image="quote.image"
          :year="quote.movie.year"
          :posted-by="quote.user.username"
          :user-avatar="quote.user.avatar"
          :quote-id="quote.id"
          :quote="quote"
        />
      </div>
      <div  v-if="filteredFeedView">
        <FilteredPostComponent
          v-for="quote in filteredFeedView"
          :key="quote"
          :movie-id="quote.movie.id"
          :movie-name="$i18n.locale === 'en' ? quote.movie.title.en : quote.movie.title.ka"
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
import { useQuotesStore } from "@/stores/formData/quotes.js";
import { mapWritableState, mapGetters } from "pinia";
import WriteNewQuote from "@/views/MainPage/WriteNewQuote.vue";
export default {
  components: {
    WriteNewQuote,
    MainHeader,
    UserNavbar,
    PostComponent,
    FilteredPostComponent,
  },
  computed: {
    ...mapWritableState(useQuotesStore, ["allQuotes","isModalOpen", "page", "lastPage", "search", "filteredQuotes"]),
    ...mapGetters(useQuotesStore, ["filteredFeedView", "searchIn"]),
  },
  created(){
    this.scroll();
  },
  methods: {
    resetPage(){
      this.page = 1;
      this.lastPage = 2;
    },
    handleGetQuote(scroll) {
      if(this.page > this.lastPage) { return }
      axios.get(`feed?page=${this.page}&search=${this.searchIn}`).then((res) => {
        console.log(this.page);
        if(this.search)
        {
          if(scroll){
           this.filteredQuotes.push(...res.data.data)
          }else {
            this.filteredQuotes = res.data.data
          };
          this.lastPage = res.data.meta.last_page;
          this.page++;
        } else {
          if(scroll){
            this.allQuotes.push(...res.data.data);
            this.lastPage = res.data.meta.last_page;
            this.page++;
          }else {
            this.allQuotes = res.data.data;
            this.lastPage = res.data.meta.last_page;
            this.page = 1;
          }
        }
        console.log(res, 'resers')
      })
        .catch((err) => {
          console.log(err);
        });
    },
    showModal(){
      this.isModalOpen = true;
    },
    scroll (){
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
          this.handleGetQuote(true);
        }
      }
    }
  },
};
</script>
