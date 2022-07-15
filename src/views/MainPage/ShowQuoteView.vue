<template>
  <div class="mt-24">
    <UserNavbar class="absolute"/>
  </div>

  <form-panel form-title="View Quote" link-to="movie-description" :route-param="$route.params.movie">
    <Form v-slot="{ meta }"  @submit="onSubmit()">
      <div
        class="py-2 my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="text_en"
          name="text_en"
          disabled
          placeholder="Start create new quote"
          class="italic font-serif bg-[#11101A] outline-0 w-full placeholder-white"
          rules="required"
        />
        <p class="text-[#6C757D]">Eng</p>
      </div>
      <ErrorMessage name="text_en" class="text-red-500" />
      <div
        class="py-2 my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="text_ka"
          name="text_ka"
          disabled
          placeholder="ახალი ციტატა"
          class="italic font-serif bg-[#11101A] outline-0 w-full placeholder-white"
          rules="required"
        />
        <p class="text-[#6C757D]">ქარ</p>
      </div>
      <ErrorMessage name="text_ka" class="text-red-500" />
      <div class="my-3">
        <p></p>
      </div>
      <img v-for="quote in quotes" :key="quote" class="rounded-xl py-2.5 w-full" :src="`http://localhost:8000/${quote.image}`">
      <div class="flex justify-center mt-5">
        <basic-button :is-disabled="!meta.valid">Add Quote</basic-button>
      </div>
    </Form>
  </form-panel>
</template>
<script>
import FormPanel from "@/components/Main/FormPanel.vue";
import BasicButton from "@/components/UI/BasicButton.vue";
import {Form, Field, ErrorMessage} from "vee-validate";
import { useMoviesStore } from "@/stores/data/movies.js";
import {mapWritableState} from "pinia";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
export default {
  components: {FormPanel, BasicButton, Form, Field, ErrorMessage, UserNavbar},
  data(){
    return {
      quotes: [],
    }
  },
  computed: {
    ...mapWritableState(useMoviesStore, ["text_en", "text_ka"])
  },
  mounted(){
    this.handleGetQuoteRequest()
  },
  methods: {
    handleGetQuoteRequest(){
      axios
        .get(`quote/`+this.$route.params.quote)
        .then((res) => {
          this.quotes = res.data;
          this.text_en = `"${this.quotes[0].text.en}"`;
          this.text_ka = `"${this.quotes[0].text.ka}"`;
          console.log(res.data);
          console.log(this.quotes[0].image)
        })
        .catch((err)=> {
          console.log(err)
        })
    },
  }
}
</script>
