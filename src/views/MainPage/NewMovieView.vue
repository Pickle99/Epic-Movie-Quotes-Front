<template>
  <div class="text-white flex justify-center mb-32">
    <div class="bg-[#11101A]">
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
        <Form @submit="onSubmit()">
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="title_eng"
              placeholder="Movie name"
              class="bg-[#11101A] outline-0 w-full m-1.5 placeholder-white"
              rules="required"
            />
            <p class="text-[#6C757D]">Eng</p>
          </div>
          <ErrorMessage name="title_eng" class="text-red-500" />
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
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
              name="director_eng"
              placeholder="Director"
              class="bg-[#11101A] outline-0 w-full m-1.5 placeholder-white"
              rules="required"
            />
            <p class="text-[#6C757D]">Eng</p>
          </div>
          <ErrorMessage name="director_eng" class="text-red-500" />
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="director_ka"
              placeholder="რეჟისორი"
              class="bg-[#11101A] outline-0 w-full m-1.5 placeholder-white"
              rules="required"
            />
            <p class="text-[#6C757D]">ქარ</p>
          </div>
          <ErrorMessage name="director_ka" class="text-red-500" />
          <div
            class="py-2 overflow-auto resize-y my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              as="textarea"
              name="description_eng"
              placeholder="Movie description"
              class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
              rules="required"
            />
            <p class="text-[#6C757D]">Eng</p>
          </div>
          <ErrorMessage name="description_eng" class="text-red-500" />
          <div
            class="py-2 overflow-auto resize-y my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              as="textarea"
              name="description_ka"
              placeholder="ფილმის აღწერა"
              class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
              rules="required"
            />
            <p class="text-[#6C757D]">ქარ</p>
          </div>
          <ErrorMessage name="description_ka" class="text-red-500" />
          <div
            class="p-4 my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <img class="mr-4" src="@/assets/icons/photo.svg" alt="svg" />
            <p type="file" class="w-96">Drag & drop your image here or</p>
            <Field
              type="file"
              name="image"
              class="bg-[#11101A] outline-0 w-full placeholder-white"
              rules="required"
              placeholder="drag and drop"
            />
          </div>
          <ErrorMessage name="image" class="text-red-500" />
          <div class="flex justify-center mt-5">
            <button class="px-96 py-2 rounded-md bg-[#E31221]">
              Add Movie
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
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
      userSelectedGenres2: [],
      genresError: "",
    };
  },
  methods: {
    onSubmit() {
      const found = this.userSelectedGenres.filter(
        (item) => !this.allGenres.includes(item)
      );
      const founder = this.userSelectedGenres;
      if (found.length > 0 || !founder.length) {
        return (this.genresError =
          "Invalid genre. available: Comedy, Horror, Action, Drama, Romantic, Thriller");
      } else return (this.genresError = "");
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
