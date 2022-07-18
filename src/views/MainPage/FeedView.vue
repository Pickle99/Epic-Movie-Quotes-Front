<template>
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />
  <div class="text-white justify-center flex">
    <div class="flex flex-col">
      <div class="flex mt-3">
        <div class="py-3 px-3 bg-[#24222F] rounded-md">
          <RouterLink class="flex w-[10rem]" to="'/hi'">
            <img class="mr-4" src="@/assets/icons/pencil.svg" />
            <p>Write new quote</p>
          </RouterLink>
        </div> 
        <div class="w-full ml-10 flex items-center border-gray-700 border-b-4">
          <div class="mr-3">
            <img src="@/assets/icons/magnifying-glass.svg" />
          </div>
          <div class="w-full">
            <input
              class="focus:outline-0 bg-[#0d0b14] w-96"
              placeholder="Enter @ to search movies, Enter # to search quotes"
            />
          </div>
        </div>
      </div>
      <PostComponent
        v-for="quote in allQuotes"
        :key="quote"
        :movie-id="quote.movie.id"
        :quote-text="
          $i18n.locale === 'en' ? quote.text.en : quote.text.en
        "
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
</template>

<script>
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
import PostComponent from "@/components/Main/PostComponent.vue";
import { useRequestsStore } from "@/stores/requests.js";
import { mapWritableState } from "pinia";
export default {
  components: {
    MainHeader,
    UserNavbar,
    PostComponent,
  },
  computed: {
    ...mapWritableState(useRequestsStore, ["allQuotes"]),
  },
  created() {
    this.getMovie();
  },
  methods: {
    getMovie() {
      axios.get("feed").then((res) => {
        this.allQuotes = res.data;
        this.allQuotes.sort(function (a,b){
          return new Date(b.created_at) - new Date(a.created_at)
        });
        console.log(this.allQuotes);
      })
        .catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>
