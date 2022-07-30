<template>
  <div class="text-white flex justify-center mb-32">
    <div class="bg-[#11101A] w-[43rem] z-10">
      <div class="flex items-center justify-center w-full p-4">
        <div class="flex justify-start w-1/4">
          <div v-if="$route.name === 'edit-quote'" class="flex">
            <IconTrash class="cursor-pointer" @click="deleteQuote()"/>
            <p class="ml-3 cursor-pointer" @click="deleteQuote()">{{$t('message.delete')}}</p>
          </div>
          <div v-if="$route.name === 'show-quote'" class="flex">
            <div>
              <RouterLink :to="{name: 'edit-quote', params: {quote: $route.params.quote}}">
                <IconPen class="cursor-pointer"/>
              </RouterLink>
            </div>
            <div class="border-gray-500 border-r-2 mx-5 my-0.5"></div>
            <div>
              <IconTrash class="cursor-pointer"  @click="deleteQuote()"/>
            </div>
          </div>
        </div>
        <div class="flex justify-center w-2/4 font-bold">
          <p>{{formTitle}}</p>
        </div>
        <div class="flex justify-end w-1/4">
          <RouterLink :to="{ name: linkTo, params: {movie: routeParam} }">
            <IconX @click="movieResetFields"/>
          </RouterLink>
        </div>
      </div>
      <div class="border-gray-600 border-b-2 w-full"></div>
      <div class="flex p-4">
        <div class="flex items-center">
          <img width="48" :src="`http://localhost:8000/${avatar || localAvatar}`" alt="user-avatar" />
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
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import axios from "@/config/axios/index.js";
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import IconPen from "@/components/icons/IconPen.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconX from "@/components/icons/IconX.vue";
export default {
  components: { IconX, IconTrash, IconPen },
  props: {
    avatar: {
      type: String,
      required: false,
      default: ""
    },
    username: {
      type: String,
      required: false,
      default: "",
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
      default: "",
    },
  },
  computed:{
    ...mapWritableState(useLocalStorageStore, {
      localUser: "username",
      localAvatar: "avatar",
      localUserId: "userId",
    }),
    ...mapActions(useMoviesStore, ["movieResetFields"]),
  },
  methods: {
    deleteQuote() {
      axios.delete(`quote/${this.$route.params.quote}/delete`)
        .then(() => {
          this.$router.push({name: 'movie-description', params: {movie: this.$route.params.movie}})
          this.movieResetFields;
        })
        .catch((err) => {
          console.log(err)
        });
    },
  },
}

</script>