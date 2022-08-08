<template>
  <div class="mt-24">
    <UserNavbar class="absolute" />
    <form-panel
      :form-title="$t('message.edit_movie')"
      link-to="movie-description"
      :route-param="route.params.movie"
    >
      <ValidationForm v-slot="{ meta }" @submit="onSubmit()">
        <div
          class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
        >
          <Field
            v-model="MoviesStore.title_en"
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
            v-model="MoviesStore.title_ka"
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
            v-for="(genres, index) in MoviesStore.userSelectedGenres"
            :key="genres"
            class="flex"
          >
            <div
              class="flex bg-[#6C757D] mr-3 text-sm text-white rounded-md p-1"
            >
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
        <p class="text-red-500">{{ MoviesStore.genresError }}</p>
        <div
          class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
        >
          <Field
            v-model="MoviesStore.director_en"
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
            v-model="MoviesStore.director_ka"
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
            v-model="MoviesStore.year"
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
            v-model="MoviesStore.budget"
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
            v-model="MoviesStore.description_en"
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
            v-model="MoviesStore.description_ka"
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
        <p>{{ MoviesStore.imageForMovie.name || movie.image }}</p>
        <div class="flex justify-center mt-5">
          <movie-form-button
            :genres="MoviesStore.userSelectedGenres.length"
            :is-disabled="!meta.valid"
            >{{ $t("message.edit_movie") }}</movie-form-button
          >
        </div>
      </ValidationForm>
    </form-panel>
  </div>
</template>

<script setup>
import { Form as ValidationForm, Field, ErrorMessage } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import ImageUpload from "@/components/UI/ImageUpload.vue";
import MovieFormButton from "@/components/UI/MovieFormButton.vue";
import FormPanel from "@/components/Main/MovieFormPanel.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import { useMoviesStore } from "@/stores/useMoviesStore.js";
import axios from "@/config/axios/index.js";
import { ref, onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const MoviesStore = useMoviesStore();

const movie = ref([]);

function drop(e) {
  MoviesStore.imageForMovie = e.dataTransfer.files[0];
}

function selectedFile() {
  MoviesStore.imageForMovie = document.querySelector(".image").files[0];
}

function getMovie() {
  axios.get(`movie/` + route.params.movie).then((res) => {
    movie.value = res.data.data;
    MoviesStore.title_en = movie.value.title.en;
    MoviesStore.title_ka = movie.value.title.ka;
    MoviesStore.userSelectedGenres = movie.value.genres.map(
      (genre) => genre.name
    );
    MoviesStore.director_en = movie.value.director.en;
    MoviesStore.director_ka = movie.value.director.ka;
    MoviesStore.year = movie.value.year;
    MoviesStore.budget = movie.value.budget;
    MoviesStore.description_en = movie.value.description.en;
    MoviesStore.description_ka = movie.value.description.ka;
  });
}

function onSubmit() {
  axios
    .post("movie/" + route.params.movie + "/update", MoviesStore.movieData, {
      headers: {
        "Content-Type": "multipart/form-formData",
      },
    })
    .then(() => {
      router.push({
        name: "movie-description",
        params: { movie: route.params.movie },
      });
      MoviesStore.movieResetFields();
    })
    .catch((error) => {
      console.log(error);
    });

  const found = MoviesStore.userSelectedGenres.filter(
    (item) => !MoviesStore.allGenres.includes(item)
  );

  const founder = MoviesStore.userSelectedGenres;
  if (found.length > 0 || !founder.length) {
    return (MoviesStore.genresError =
      "Invalid genre. available: Comedy, Horror, Action, Drama, Romantic, Thriller");
  }

  if (found.length < 0 || founder.length) {
    return (MoviesStore.genresError = "");
  }
}

function addTag(event) {
  if (event.code === "Comma" || event.code === "Enter") {
    event.preventDefault();
    let genreTag = event.target.value.trim().toLowerCase();
    if (genreTag.length > 0) {
      if (MoviesStore.userSelectedGenres.includes(genreTag)) {
        return (MoviesStore.genresError = "Duplicate entry");
      } else
        MoviesStore.userSelectedGenres.push(
          genreTag[0].toUpperCase() + val.slice(1).split(" ")[0]
        );
      event.target.value = "";
    }
  }
}

function removeTag(index) {
  MoviesStore.userSelectedGenres.splice(index, 1);
}

function removeLastTag(event) {
  if (event.target.value.length === 0) {
    this.removeTag(MoviesStore.userSelectedGenres.length - 1);
  }
}

function getGenre() {
  axios.get("genres").then((res) => {
    MoviesStore.allGenres = res.data.data.map((e) => e.name);
  });
}

onMounted(() => {
  getGenre();
  getMovie();
});
</script>
