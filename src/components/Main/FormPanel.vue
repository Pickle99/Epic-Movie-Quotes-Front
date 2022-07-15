<template>
  <div class="text-white flex justify-center mb-32">
    <div class="bg-[#11101A] w-[43rem] z-10">
      <div class="flex items-center justify-center w-full p-4">
        <div class="flex justify-start w-1/4"></div>
        <div class="flex justify-center w-2/4 font-bold">
          <p>{{formTitle}}</p>
        </div>
        <div class="flex justify-end w-1/4">
          <RouterLink :to="{ name: linkTo, params: {movie: routeParam} }" @click="resetFields()">
            <img src="@/assets/icons/x-icon.svg" alt="img" />
          </RouterLink>
        </div>
      </div>
      <div class="border-gray-600 border-b-2 w-full"></div>
      <div class="flex p-4">
        <div class="flex items-center">
            <img width="48" :src="`http://localhost:8000/${avatar}`" alt="img" />
          <p class="ml-4">{{username}}</p>
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
import { useMoviesStore } from "@/stores/data/movies.js";
import { Form, Field } from 'vee-validate'
export default {
  components: { Form, Field },
  computed: {
    ...mapWritableState(useLocalStorageStore, ["username", "avatar"])
  },
  props: {
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
  methods: {
    ...mapActions(useMoviesStore, ["resetFields"])
  }
}

</script>