<template>
  <img src="@/assets/icons/dots.svg" class="hover:cursor-pointer p-2" alt="icon" @click="setVisible()" />
  <div v-if="visible" class="bg-[#24222F] w-44 h-36 absolute rounded-md -ml-4 flex flex-col justify-around">
    <RouterLink :to="{name: 'show-quote', params: {movie: $route.params.movie, quote:quoteId }}" class="flex items-center ml-5">
        <img class="hover:cursor-pointer" src="@/assets/icons/eye.svg" alt="icon"/>
      <div>
      <p class="text-sm ml-3 hover:cursor-pointer">View Post</p>
      </div>
    </RouterLink>
    <RouterLink :to="{name: 'edit-quote', params: {movie: $route.params.movie, quote:quoteId }}" class="flex items-center ml-5 w-fit">
      <img src="@/assets/icons/pen.svg" alt="icon"/>
      <p :to="{name: 'edit-quote', params: {movie: $route.params.movie, quote:quoteId }}" class="text-sm ml-3">Edit</p>
    </RouterLink>
    <div class="flex items-center ml-5 w-fit cursor-pointer" @click="deleteQuote()">
      <img src="@/assets/icons/trash.svg" alt="icon"/>
      <p class="text-sm ml-3">Delete</p>
    </div>
  </div>
</template>

<script>
import axios from "@/config/axios/index.js";
export default {
  props:{
    quoteId: {
      type: Number,
      required:true,
    }
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
      axios.post(`quote/${this.quoteId}/delete`)
        .then(() => {
          this.$router.push({name: 'movie-description', params: {movie: this.$route.params.movie}})
        })
        .catch((err) => {
          console.log(err)
        });
    },
  }
}
</script>