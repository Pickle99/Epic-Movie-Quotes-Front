<template>
  <modal-form-panel>
    <Form v-slot="{ meta }" @submit="onSubmit()">
      <div
        class="py-2 overflow-auto resize-y my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="text_en"
          as="textarea"
          name="text_en"
          placeholder="Start create new quote"
          class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
          rules="required|eng"
        />
        <p class="text-[#6C757D]">Eng</p>
      </div>
      <ErrorMessage name="text_en" class="text-red-500" />
     <Field v-model="chosenMovieId" name="movieId" class="hidden" rules="required"/>
      <div
        class="py-2 overflow-auto resize-y my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="text_ka"
          as="textarea"
          name="text_ka"
          placeholder="ახალი ციტატა"
          class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
          rules="required|geo"
        />
        <p class="text-[#6C757D]">ქარ</p>
      </div>
      <ErrorMessage name="text_ka" class="text-red-500" />
      <div class="my-3">
        <ImageUploadAnother class="mt-4" @drop.prevent="drop" @change="selectedFile"/>
        <p>{{imageForQuote.name}}</p>
        <ChooseMovie class="mt-4"/>
        <ErrorMessage class="text-red-500 text-xs" name="movieId"/>
      </div>
      <div class="flex justify-center mt-5">
        <basic-button class="w-full" :is-disabled="!meta.valid">Post</basic-button>
      </div>
    </Form>
  </modal-form-panel>
</template>

<script>
import {Field, ErrorMessage, Form} from "vee-validate";
import BasicButton from "@/components/UI/BasicButton.vue";
import ModalFormPanel from '@/components/Main/ModalFormPanel.vue';
import {useQuotesStore} from "@/stores/formData/quotes.js";
import { mapGetters, mapWritableState, mapActions } from "pinia";
import ChooseMovie from "@/components/UI/ChooseMovie.vue";
import axios from "@/config/axios/index.js";
import ImageUploadAnother from "@/components/UI/ImageUploadAnother.vue";
export default {
  components: {
    ImageUploadAnother,
    Field,
    ErrorMessage,
    Form,
    BasicButton,
    ModalFormPanel,
    ChooseMovie,
  },
  computed: {
    ...mapWritableState(useQuotesStore, ["text_en", "text_ka", "allUsersMovies", "chosenMovieId", "imageForQuote"]),
    ...mapGetters(useQuotesStore, ["writeQuoteData"]),
  },
  mounted(){
    this.handleGetMovies();
  },
  methods: {
    ...mapActions(useQuotesStore, ["writeQuoteResetFields"]),
    handleGetMovies(){
      axios.get('user-movies')
        .then((res) => {
          this.allUsersMovies = res.data.data;
        })
        .catch((err) => {
          console.log(err)
        });
    },
    onSubmit(){
      axios.post(`add-quote`, this.writeQuoteData, {
        headers: {
          "Content-Type": "multipart/form-formData",
        },
      })
        .then((res) => {
          this.$router.push({ name:'show-quote', params: {movie: this.chosenMovieId, quote: res.data } })
          this.writeQuoteResetFields();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    drop(e) {
      this.imageForQuote = e.dataTransfer.files[0];
    },
    selectedFile() {
      this.imageForQuote = document.querySelector(".image").files[0];
    },
  },
}
</script>