<template>
  <div class="p-2 cursor-pointer"  @click="showMenu()">
    <IconDots />
  </div>
  <OnClickOutside class="w-fit" @trigger="hideMenu()">
    <div v-if="isQuoteMenuVisible" class="bg-[#24222F] w-44 h-fit absolute rounded-md -mt-32 md:mt-0 -ml-32 md:-ml-4 flex flex-col">
      <div class="my-3">
        <RouterLink :to="{name: 'show-quote', params: {movie: $route.params.movie, quote:quoteId }}" class="flex items-center ml-5">
          <IconEyeOpen class="hover:cursor-pointer"/>
          <div>
            <p class="text-sm ml-3 hover:cursor-pointer">{{$t('message.view_post')}}</p>
          </div>
        </RouterLink>

        <div v-if="quoteUserId == userId">
          <RouterLink  :to="{name: 'edit-quote', params: {movie: $route.params.movie, quote:quoteId }}" class="flex items-center ml-5 my-7 w-fit">
            <IconPen/>
            <p :to="{name: 'edit-quote', params: {movie: $route.params.movie, quote:quoteId }}" class="text-sm ml-3">{{$t('message.edit')}}</p>
          </RouterLink>
          <div  class="flex items-center ml-5 w-fit cursor-pointer" @click="deleteQuote()">
            <IconTrash/>
            <p class="text-sm ml-3">{{$t('message.delete')}}</p>
          </div>
        </div>
      </div>
    </div>
  </OnClickOutside>

</template>

<script>
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useLocalStorageStore } from "@/stores/localStorage.js";
import { useMoviesStore } from "@/stores/formData/movies.js";
import IconDots from "@/components/icons/IconDots.vue";
import IconEyeOpen from "@/components/icons/IconEyeOpen.vue";
import IconPen from "@/components/icons/IconPen.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import { OnClickOutside } from "@vueuse/components";
export default {
  components: { IconTrash, IconPen, IconEyeOpen, IconDots, OnClickOutside },
  props:{
    quoteUserId: {
      type: Number,
      required: true,
    },
    quoteId: {
      type: Number,
      required:true,
    },
  },
  computed: {
    ...mapWritableState(useMoviesStore, ["movieDescriptionQuoteData"]),
      ...mapWritableState(useLocalStorageStore, ["userId"]),
  },
  data() {
    return {
      isQuoteMenuVisible: false,
    }
  },
  methods: {
    hideMenu(){
      this.isQuoteMenuVisible = false;
    },
    showMenu() {
      this.isQuoteMenuVisible = true;
    },
    deleteQuote() {
      axios.delete(`quote/${this.quoteId}/delete`).then(() => {
        this.movieDescriptionQuoteData = this.movieDescriptionQuoteData.filter((item) => {
          return item.id !== this.quoteId;
        });
      })
        .catch((err) => {
          console.log(err)
        });
    },
  }
}
</script>