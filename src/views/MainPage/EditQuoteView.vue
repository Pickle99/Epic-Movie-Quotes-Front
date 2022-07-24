<template>
  <div class="mt-24">
    <UserNavbar class="absolute"/>
  </div>

  <form-panel v-if="quoteUserId" :quote-user-id="quoteUserId" form-title="Edit Quote" link-to="movie-description" :route-param="$route.params.movie">
    <Form v-slot="{ meta }"  @submit="onSubmit()">
      <div
        class="py-2 overflow-auto resize-y my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="text_en"
          as="textarea"
          name="text_en"
          placeholder="Start create new quote"
          class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
          rules="required"
        />
        <p class="text-[#6C757D]">Eng</p>
      </div>
      <ErrorMessage name="text_en" class="text-red-500" />
      <div
        class="py-2 overflow-auto resize-y my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="text_ka"
          as="textarea"
          name="text_ka"
          placeholder="ახალი ციტატა"
          class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
          rules="required"
        />
        <p class="text-[#6C757D]">ქარ</p>
      </div>
      <ErrorMessage name="text_ka" class="text-red-500" />
      <div class="my-3">
        <p></p>
      </div>
      <ImageUploadWithPreview v-for="quote in quotes" :key="quote" :quote="quote" @change="selectedFile"/>
      <div class="flex justify-center mt-5">
        <basic-button :is-disabled="!meta.valid">Edit Quote</basic-button>
      </div>
    </Form>
  </form-panel>
</template>
<script>
import FormPanel from "@/components/Main/QuoteFormPanel.vue";
import BasicButton from "@/components/UI/BasicButton.vue";
import {Form, Field, ErrorMessage} from "vee-validate";
import { useQuotesStore } from "@/stores/formData/quotes.js";
import {mapWritableState, mapActions, mapGetters} from "pinia";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
import ImageUploadWithPreview from "@/components/UI/ImageUploadWithPreview.vue";
export default {
  components: {FormPanel, BasicButton, Form, Field, ErrorMessage, UserNavbar, ImageUploadWithPreview},
  data(){
    return {
    quotes: [],
      quoteUserId: "",
    }
  },
  computed: {
    ...mapWritableState(useQuotesStore, ["text_en", "text_ka", "imageForQuote"]),
    ...mapActions(useQuotesStore, ["writeQuoteResetFields"]),
    ...mapGetters(useQuotesStore, ["editQuoteData"]),
  },
  mounted(){
    this.handleGetQuoteRequest()
  },
  methods: {
    selectedFile() {
      this.imageForQuote = document.querySelector(".image").files[0];
    },
    onSubmit()
    {

      axios
        .post("quote/"+this.$route.params.quote+"/update", this.editQuoteData, {
          headers: { 
            "Content-Type": "multipart/form-formData",
          },
        })
        .then(() => {
          this.$router.push({name: 'movie-description', params: {movie: this.$route.params.movie} });
          this.writeQuoteResetFields;
        })
        .catch((err) => {
          console.log(err)
        });

    },

    handleGetQuoteRequest(){
      axios
        .get(`quote/`+this.$route.params.quote)
        .then((res) => {
          this.quotes = res.data;
          this.text_en = this.quotes.data.text.en;
          this.text_ka = this.quotes.data.text.ka;
          this.quoteUserId = this.quotes.data.user.id;
        })
        .catch((err)=> {
          console.log(err)
        })
    },
  }
}
</script>
