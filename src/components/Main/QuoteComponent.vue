<template>
  <div class="p-2 cursor-pointer"  @click="setVisible()">
    <IconDots />
  </div>
  <div v-if="visible" class="bg-[#24222F] w-44 h-fit absolute rounded-md -ml-4 flex flex-col">
<div class="my-3">
  <RouterLink :to="{name: 'show-quote', params: {movie: $route.params.movie, quote:quoteId }}" class="flex items-center ml-5">
    <IconEye class="hover:cursor-pointer" alt="icon"/>
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

</template>

<script>
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useLocalStorageStore } from "@/stores/localStorage.js";
import { useMoviesStore } from "@/stores/formData/movies.js";
import IconDots from "@/components/icons/IconDots.vue";
import IconEye from "@/components/icons/IconEye.vue";
import IconPen from "@/components/icons/IconPen.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
export default {
  components: { IconTrash, IconPen, IconEye, IconDots },
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
      visible: false,
    }
  },
  methods: {
    setVisible() {
      this.visible = !this.visible
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