<template>
<OnClickOutside class="w-fit" @trigger="hideSearch()">
  <div class="md:hidden absolute z-10 bg-[#0d0b14] py-6 text-white flex items-center border-b-2 border-gray-700">
    <IconArrowLeft class="mr-3 ml-4" @click="hideSearch"/>
    <input
      v-model="search"
      class="focus:outline-0 bg-[#0d0b14] w-96"
      placeholder="Search"
      @keydown.enter="handleGetQuote(false)"
      @keydown="resetPage()"
    />
  </div>
  <div class="bg-[#0d0b14] h-[35rem] w-screen md:hidden absolute">
    <div class="text-gray-400 mt-24 ml-16 h-24 flex justify-around flex-col">
      <div class="flex">
        <p>Enter</p> <p class="text-white mx-2">@</p> <p>to search in movies</p>
      </div>
      <div class="flex">
        <p>Enter</p> <p class="text-white mx-2">#</p> <p>to search in quotes</p>
      </div>
    </div>
  </div>
</OnClickOutside>
</template>

<script>
import IconArrowLeft from "@/components/icons/IconArrowLeft.vue";
import { mapActions } from "pinia/dist/pinia";
import { useQuotesStore } from "@/stores/formData/quotes.js";
import axios from "@/config/axios/index.js";
import { mapGetters, mapWritableState } from "pinia";
import { OnClickOutside } from "@vueuse/components";
import { useUserDataStore } from "@/stores/formData/user.js";
export default {
  components: {
    IconArrowLeft,
    OnClickOutside,
  },
  computed: {
    ...mapWritableState(useQuotesStore, ["page, lastPage", "filteredQuotes", "allQuotes", "search"]),
    ...mapGetters(useQuotesStore, ["searchIn"]),
  },
  methods: {
    ...mapActions(useUserDataStore, ["hideSearch"]),
    ...mapActions(useQuotesStore, ["resetPage"]),
    handleGetQuote(scroll) {
      if(this.page > this.lastPage) { return }
      axios.get(`feed?page=${this.page}&search=${this.searchIn}`).then((res) => {
        if(this.search)
        {
          if(scroll){
            this.filteredQuotes.push(...res.data.data);
            this.page++;
          }else {
            this.filteredQuotes = res.data.data
            this.page++;
          };
          this.lastPage = res.data.meta.last_page;
        } else {
          if(scroll){
            this.allQuotes.push(...res.data.data);
            this.lastPage = res.data.meta.last_page;
            this.page++;
          }else {
            this.allQuotes = res.data.data;
            this.lastPage = res.data.meta.last_page;
            this.page++;
          }
        }
      })
        .catch((err) => {
          console.log(err);
        });
    },
  }

}
</script>