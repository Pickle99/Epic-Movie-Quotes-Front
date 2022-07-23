<template>
  <div class="text-white flex justify-center mb-32">
    <div class="bg-[#11101A] w-[43rem] z-10">
      <div class="flex items-center justify-center w-full p-4">
        <div class="flex justify-start w-1/4">
         <div v-if="$route.name === 'edit-quote'" class="flex">
           <img class="cursor-pointer" src="@/assets/icons/trash.svg" alt="icon" @click="deleteQuote()"/>
           <p class="ml-3 cursor-pointer" @click="deleteQuote()">Delete</p>
         </div>
          <div v-if="$route.name === 'show-quote'" class="flex">
            <div>
              <RouterLink :to="{name: 'edit-quote', params: {quote: $route.params.quote}}">
                <img class="cursor-pointer" src="@/assets/icons/pen.svg" alt="icon"/>
              </RouterLink>
            </div>
            <div class="border-gray-500 border-r-2 mx-5 my-0.5"></div>
            <div><img class="cursor-pointer" src="@/assets/icons/trash.svg" alt="icon" @click="deleteQuote()"/>
            </div>
          </div>
        </div>
        <div class="flex justify-center w-2/4 font-bold">
          <p>{{formTitle}}</p>
        </div>
        <div class="flex justify-end w-1/4">
          <RouterLink :to="{ name: linkTo, params: {movie: routeParam} }" >
            <img src="@/assets/icons/x-icon.svg" alt="img" @click="writeQuoteResetFields" />
          </RouterLink>
        </div>
      </div>
      <div class="border-gray-600 border-b-2 w-full"></div>
      <div class="flex p-4">
        <div class="flex items-center">
            <img width="48" :src="`http://localhost:8000/${avatar || localAvatar}`" alt="img" />
          <p class="ml-4">{{username || localUser}}</p>
        </div>
      </div>
      <div class="flex flex-col p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapActions } from "pinia";
import { useLocalStorageStore } from "@/stores/localStorage.js";
import axios from "@/config/axios/index.js";
import { useQuotesStore } from "@/stores/formData/quotes.js";
export default {
  props: {
    avatar: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    formTitle: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      required: true,
    },
    routeParam: {
      type: String,
      required: false,
    },
  },
  computed:{
    ...mapWritableState(useLocalStorageStore, {
      localUser: "username",
      localAvatar: "avatar",
      localUserId: "userId",
    }),
    ...mapActions(useQuotesStore, ["writeQuoteResetFields"]),
  },
  methods: {
    deleteQuote() {
      axios.delete(`quote/${this.$route.params.quote}/delete`)
        .then(() => {
          this.$router.push({name: 'movie-description', params: {movie: this.$route.params.movie}})
          this.writeQuoteResetFields;
        })
        .catch((err) => {
          console.log(err)
        });
    },
  },
}

</script>