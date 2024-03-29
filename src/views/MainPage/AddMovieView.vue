<template>
  <form-panel
    class="h-screen absolute z-0 w-screen md:-mt-16 md:mt-0 md:h-fit md:flex md:w-full"
    :form-title="$t('message.add_movie')"
    link-to="movies"
  >
    <ValidationForm v-slot="{ meta }" @submit="onSubmit()">
      <div
        class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="title_en"
          name="title_en"
          placeholder="Movie name"
          class="bg-[#11101A] outline-0 w-full m-1.5 placeholder-white"
          rules="required|eng"
        />
        <p class="text-[#6C757D]">Eng</p>
      </div>
      <ErrorMessage name="title_en" class="text-red-500" />
      <div
        class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="title_ka"
          name="title_ka"
          placeholder="ფილმის სახელი"
          class="bg-[#11101A] outline-0 w-full m-1.5 placeholder-white"
          rules="required|geo"
        />
        <p class="text-[#6C757D]">ქარ</p>
      </div>
      <ErrorMessage name="title_ka" class="text-red-500" />
      <div
        class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <div
          v-for="(genres, index) in userSelectedGenres"
          :key="genres"
          class="flex"
        >
          <div class="flex bg-[#6C757D] mr-3 text-sm text-white rounded-md p-1">
            <p>{{ genres }}</p>
            <button class="ml-1.5" @click="removeTag(index)">x</button>
          </div>
        </div>
        <Field v-slot="{ resetField, field }" name="genres">
          <input
            class="bg-[#11101A] outline-0 w-full m-1.5 placeholder-white"
            v-bind="field"
            placeholder="Genres"
            @keydown.enter="resetField()"
            @keydown="addTag"
            @keydown.delete="removeLastTag"
          />
        </Field>
      </div>
      <p class="text-gray-400 text-[10px]">
        Choose from : Comedy, Horror, Action, Drama, Romantic, Thriller
      </p>
      <p class="text-red-500">{{ genresError }}</p>
      <div
        class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="director_en"
          name="director_en"
          placeholder="Director"
          class="bg-[#11101A] outline-0 w-full m-1.5 placeholder-white"
          rules="required|eng"
        />
        <p class="text-[#6C757D]">Eng</p>
      </div>
      <ErrorMessage name="director_en" class="text-red-500" />
      <div
        class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="director_ka"
          name="director_ka"
          placeholder="რეჟისორი"
          class="bg-[#11101A] outline-0 w-full m-1.5 placeholder-white"
          rules="required|geo"
        />
        <p class="text-[#6C757D]">ქარ</p>
      </div>
      <ErrorMessage name="director_ka" class="text-red-500" />
      <div
        class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="year"
          type="number"
          name="year"
          placeholder="Year"
          class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
          rules="max:4"
        />
        <p class="text-[#6C757D]">Eng</p>
      </div>
      <ErrorMessage name="year" class="text-red-500" />
      <div
        class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="budget"
          type="number"
          name="budget"
          placeholder="Movie Budget ($)"
          class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
          rules="required"
        />
        <p class="text-[#6C757D]">Eng</p>
      </div>
      <ErrorMessage name="budget" class="text-red-500" />
      <div
        class="py-2 overflow-auto resize-y my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="description_en"
          as="textarea"
          name="description_en"
          placeholder="Movie description"
          class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
          rules="required|eng"
        />
        <p class="text-[#6C757D]">Eng</p>
      </div>
      <ErrorMessage name="description_en" class="text-red-500" />
      <div
        class="py-2 overflow-auto resize-y my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
      >
        <Field
          v-model="description_ka"
          as="textarea"
          name="description_ka"
          placeholder="ფილმის აღწერა"
          class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
          rules="required|geo"
        />
        <p class="text-[#6C757D]">ქარ</p>
      </div>
      <ErrorMessage name="description_ka" class="text-red-500" />
      <ImageUpload @drop.prevent="drop" @change="selectedFile" />
      <p>{{ imageForMovie.name }}</p>
      <div class="flex justify-center mt-5">
        <movie-form-button
          :genres="userSelectedGenres.length"
          :is-disabled="!meta.valid"
          >{{ $t("message.add_movie") }}</movie-form-button
        >
      </div>
    </ValidationForm>
  </form-panel>
</template>

<script>
import { Form as ValidationForm, Field, ErrorMessage } from "vee-validate";
import ImageUpload from "@/components/UI/ImageUpload.vue";
import MovieFormButton from "@/components/UI/MovieFormButton.vue";
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import { mapWritableState, mapState, mapActions } from "pinia";
import FormPanel from "@/components/Main/MovieFormPanel.vue";
import axios from "@/config/axios/index.js";

export default {
  components: {
    ValidationForm,
    Field,
    ErrorMessage,
    ImageUpload,
    MovieFormButton,
    FormPanel,
  },
  computed: {
    ...mapWritableState(useMoviesStore, [
      "title_en",
      "title_ka",
      "director_en",
      "director_ka",
      "year",
      "budget",
      "description_en",
      "description_ka",
      "userMovies",
      "allGenres",
      "userSelectedGenres",
      "imageForMovie",
      "genresError",
    ]),
    ...mapState(useMoviesStore, ["movieYear", "movieBudget", "movieData"]),
  },
  mounted() {
    this.getGenre();
  },
  methods: {
    ...mapActions(useMoviesStore, ["movieResetFields"]),
    drop(e) {
      this.imageForMovie = e.dataTransfer.files[0];
    },
    selectedFile() {
      this.imageForMovie = document.querySelector(".image").files[0];
    },
    onSubmit() {
      axios
        .post("movies", this.movieData, {
          headers: {
            "Content-Type": "multipart/form-formData",
          },
        })
        .then((res) => {
          this.$router.push({ name: "movies" });
          this.userMovies.unshift(res.data.data);
          this.movieResetFields();
        })
        .catch((error) => {
          console.log(error);
        });

      const found = this.userSelectedGenres.filter(
        (item) => !this.allGenres.includes(item)
      );
      const founder = this.userSelectedGenres;
      if (found.length > 0 || !founder.length) {
        return (this.genresError =
          "Invalid genre. available: Comedy, Horror, Action, Drama, Romantic, Thriller");
      }
      if (found.length < 0 || founder.length) {
        return (this.genresError = "");
      }
    },
    addTag(event) {
      if (event.code === "Comma" || event.code === "Enter") {
        event.preventDefault();
        let genreTag = event.target.value.trim().toLowerCase();
        if (genreTag.length > 0) {
          if (this.userSelectedGenres.includes(genreTag)) {
            return (this.genresError = "Duplicate entry");
          } else
            this.userSelectedGenres.push(
              genreTag[0].toUpperCase() + genreTag.slice(1).split(" ")[0]
            );
          event.target.value = "";
        }
      }
    },
    removeTag(index) {
      this.userSelectedGenres.splice(index, 1);
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.userSelectedGenres.length - 1);
      }
    },
    getGenre() {
      axios.get("genres").then((res) => {
        this.allGenres = res.data.data.map((e) => e.name);
      });
    },
  },
};
</script>
