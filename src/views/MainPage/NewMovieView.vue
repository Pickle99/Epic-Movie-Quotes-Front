<template>
  <div class="text-white flex justify-center mb-32">
    <div class="bg-[#11101A] w-[43rem]">
      <div class="flex items-center justify-center w-full p-4">
        <div class="flex justify-start w-1/4"></div>
        <div class="flex justify-center w-2/4 font-bold">
          <p>Add Movie</p>
        </div>
        <div class="flex justify-end w-1/4">
          <img src="@/assets/icons/x-icon.svg" alt="img" />
        </div>
      </div>
      <div class="border-gray-600 border-b-2 w-full"></div>
      <div class="flex p-4">
        <div class="flex items-center">
          <img src="@/assets/images/user.png" alt="img" />
          <p class="ml-4">Nino Tabagari</p>
        </div>
      </div>
      <div class="flex flex-col p-4">
        <Form @submit="onSubmit()" v-slot="{ meta }">
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              v-model="title_en"
              name="title_en"
              placeholder="Movie name"
              class="bg-[#11101A] outline-0 w-full m-1.5 placeholder-white"
              rules="required"
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
              rules="required"
            />
            <p class="text-[#6C757D]">ქარ</p>
          </div>
          <ErrorMessage name="title_ka" class="text-red-500" />
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <div
              class="flex"
              v-for="(genres, index) in userSelectedGenres"
              :key="genres"
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
                @keydown.enter="resetField()"
                @keydown="addTag"
                @keydown.delete="removeLastTag"
                v-bind="field"
                placeholder="Genres"
              />
            </Field>
          </div>
          <p class="text-red-500">{{ genresError }}</p>
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              v-model="director_en"
              name="director_en"
              placeholder="Director"
              class="bg-[#11101A] outline-0 w-full m-1.5 placeholder-white"
              rules="required"
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
              rules="required"
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
              rules="required"
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
              rules="required"
            />
            <p class="text-[#6C757D]">ქარ</p>
          </div>
          <ErrorMessage name="description_ka" class="text-red-500" />
          <ImageUpload @drop.prevent="drop" @change="selectedFile" />
          <p>{{ dropFile.name }}</p>
          <div class="flex justify-center mt-5">
            <basic-button :isDisabled="!meta.valid">Add Movie</basic-button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import ImageUpload from "@/components/UI/ImageUpload.vue";
import BasicButton from "@/components/UI/BasicButton.vue";
import { useMoviesStore } from "@/stores/data/movies.js";
import { mapWritableState, mapGetters } from "pinia";
import axios from "@/config/axios/index.js";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    ImageUpload,
    BasicButton,
  },
  data() {
    return {
      allGenres: [
        "Comedy",
        "Horror",
        "Action",
        "Drama",
        "Romantic",
        "Thriller",
      ],
      userSelectedGenres: [],
      genresError: "",
      dropFile: "",
    };
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
    ]),
    ...mapGetters(useMoviesStore, ["movieYear", "movieBudget"]),
  },
  methods: {
    drop(e) {
      this.dropFile = e.dataTransfer.files[0];
    },
    selectedFile() {
      this.dropFile = document.querySelector(".image").files[0];
    },
    onSubmit() {
      const formData = new FormData();
      const arr = this.userSelectedGenres;
      formData.append("title_en", this.title_en);
      formData.append("title_ka", this.title_ka);
      formData.append("director_en", this.director_en);
      formData.append("director_ka", this.director_ka);
      formData.append("description_en", this.description_en);
      formData.append("description_ka", this.description_ka);
      if (this.year) {
        formData.append("year", this.movieYear);
      }
      formData.append("budget", this.movieBudget);
      formData.append("image", this.dropFile);
      for (var i = 0; i < arr.length; i++) {
        formData.append("genres", arr[i]);
      }
      console.log(Array.from(formData));
      axios
        .post("http://localhost:8000/api/movies", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.$router.push({ name: "feed" });
          this.title_en = "";
          this.title_ka = "";
          this.director_en = "";
          this.director_ka = "";
          this.year = "";
          this.budget = "";
          this.description_en = "";
          this.description_ka = "";
          this.dropFile = "";
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
        let val = event.target.value.trim();
        if (val.length > 0) {
          if (this.userSelectedGenres.includes(val)) {
            return (this.genresError = "Duplicate entry");
          } else
            this.userSelectedGenres.push(
              val[0].toUpperCase() + val.slice(1).split(" ")[0]
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
  },
};
</script>
