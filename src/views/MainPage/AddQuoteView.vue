<template>
  <div class="mt-24">
    <UserNavbar class="absolute" />
  </div>

  <form-panel
    :form-title="$t('message.add_quote')"
    link-to="movie-description"
    :route-param="$route.params.movie"
  >
    <ValidationForm v-slot="{ meta }" @submit="onSubmit()">
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
        <ImageUploadAnother @drop.prevent="drop" @change="selectedFile" />
        <p>{{ imageForQuote.name }}</p>
      </div>
      <div
        v-for="movie in movies"
        :key="movie"
        class="bg-black text-white flex items-center"
      >
        <img
          width="170"
          class="rounded-xl py-2.5"
          :src="back_url + movie.image"
          alt="movie-image"
        />
        <div class="ml-5">
          <div class="flex items-center">
            <IconCamera />
            <h1 class="ml-3">
              {{ $i18n.locale !== "en" ? movie.title.en : movie.title.ka }} ({{
                movie.year
              }})
            </h1>
          </div>
          <p class="mt-7">
            Director:
            {{ $i18n.locale !== "en" ? movie.director.en : movie.director.ka }}
          </p>
        </div>
      </div>
      <div class="flex justify-center mt-5">
        <basic-button class="w-full" :is-disabled="!meta.valid">{{
          $t("message.add_quote")
        }}</basic-button>
      </div>
    </ValidationForm>
  </form-panel>
</template>

<script>
import UserNavbar from "@/components/Main/UserNavbar.vue";
import { Field, ErrorMessage, Form as ValidationForm } from "vee-validate";
import BasicButton from "@/components/UI/BasicButton.vue";
import FormPanel from "@/components/Main/QuoteFormPanel.vue";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import { mapWritableState, mapActions, mapState } from "pinia";
import axios from "@/config/axios/index.js";
import ImageUploadAnother from "@/components/UI/ImageUploadAnother.vue";
import IconCamera from "@/components/icons/IconCamera.vue";
import { useEnvStore } from "@/stores/useEnvStore";
export default {
  components: {
    IconCamera,
    ImageUploadAnother,
    UserNavbar,
    Field,
    ErrorMessage,
    ValidationForm,
    BasicButton,
    FormPanel,
  },
  data() {
    return {
      movies: [],
    };
  },
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
    ...mapWritableState(useQuotesStore, [
      "text_en",
      "text_ka",
      "imageForQuote",
    ]),
    ...mapState(useQuotesStore, ["addQuoteData"]),
  },
  mounted() {
    this.getMovie();
  },
  methods: {
    ...mapActions(useQuotesStore, ["writeQuoteResetFields"]),
    onSubmit() {
      axios
        .post(
          "movie/" + this.$route.params.movie + "/quote",
          this.addQuoteData,
          {
            headers: {
              "Content-Type": "multipart/form-formData",
            },
          }
        )
        .then(() => {
          this.$router.push({ name: "movie-description" });
          this.writeQuoteResetFields();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getMovie() {
      axios.get(`movie/` + this.$route.params.movie).then((res) => {
        this.movies = res.data;
      });
    },
    drop(e) {
      this.imageForQuote = e.dataTransfer.files[0];
    },
    selectedFile() {
      this.imageForQuote = document.querySelector(".image").files[0];
    },
  },
};
</script>
