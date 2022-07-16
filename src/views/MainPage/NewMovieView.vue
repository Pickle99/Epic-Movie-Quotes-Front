<template>
 <form-panel form-title="Add Movie" link-to="movies">
   <Form v-slot="{ meta }" @submit="onSubmit()">
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
         v-for="(genres, index) in userSelectedGenres"
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
     <p>{{ currentImage.name }}</p>
     <div class="flex justify-center mt-5">
       <movie-form-button :genres="userSelectedGenres.length" :is-disabled="!meta.valid">Add Movie</movie-form-button>
     </div>
   </Form>
 </form-panel>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import ImageUpload from "@/components/UI/ImageUpload.vue";
import MovieFormButton from "@/components/UI/MovieFormButton.vue";
import { useMoviesStore } from "@/stores/data/movies.js";
import { mapWritableState, mapGetters } from "pinia";
import FormPanel from "@/components/Main/FormPanel.vue";
import axios from "@/config/axios/index.js";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    ImageUpload,
    MovieFormButton,
    FormPanel,
  },
  data() {
    return {
      allGenres: [],
      data: [],
      userSelectedGenres: [],
      genresError: "",
      currentImage: "",
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
  mounted() {
    this.getGenre();
  },
  methods: {
    drop(e) {
      this.currentImage = e.dataTransfer.files[0];
    },
    selectedFile() {
      this.currentImage = document.querySelector(".image").files[0];
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
      formData.append("image", this.currentImage);
      for (var i = 0; i < arr.length; i++) {
        formData.append("genres[" + i + "]", arr[i]);
      }
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
          this.currentImage = "";
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
    getGenre() {
      axios.get("genres").then((res) => {
        this.allGenres = res.data.map((e) => e.name);
      });
    },
  },
};
</script>
