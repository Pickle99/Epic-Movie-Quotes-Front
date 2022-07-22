<template>
  <div class="mt-24">
    <UserNavbar class="absolute"/>
  </div>

  <form-panel :username="username" :avatar="avatar"   form-title="View Quote" link-to="movie-description" :route-param="$route.params.movie">
    <Form @submit="onSubmit()">
      <div
        class="py-2 my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="text_en"
          name="text_en"
          disabled
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
          class="italic font-serif bg-[#11101A] outline-0 w-full placeholder-white"
          rules="required"
        />
        <p class="text-[#6C757D]">ქარ</p>
      </div>
      <ErrorMessage name="text_ka" class="text-red-500" />
      <div class="my-3">
        <p></p>
      </div>
      <img class="rounded-xl py-2.5 w-full" :src="`http://localhost:8000/${quote.image}`">
    </Form>
  </form-panel>
</template>
<script>
import FormPanel from "@/components/Main/QuoteFormPanel.vue";
import {Form, Field, ErrorMessage} from "vee-validate";
import { useMoviesStore } from "@/stores/formData/movies.js";
import {mapWritableState} from "pinia";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
export default {
  components: {FormPanel, Form, Field, ErrorMessage, UserNavbar},
  data(){
    return {
      quote: [],
      username: '',
      avatar: '',
      quoteUserId: "",
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
          this.quote = res.data.data;
          console.log(res);
          this.text_en = `"${this.quote.text.en}"`;
          this.text_ka = `"${this.quote.text.ka}"`;
          this.username = this.quote.user.username;
          this.avatar = this.quote.user.avatar;
          this.quoteUserId = this.quote.user.id;
        })
        .catch((err)=> {
          console.log(err)
        })
    },
  }
}
</script>
