<template>
  <div class="mt-28 text-white flex justify-center">
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
        <Form>
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="title_eng"
              placeholder="Movie name"
              class="bg-[#11101A] outline-0 w-full outline-0 m-1.5"
            />
            <p>Eng</p>
          </div>
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="title_ka"
              placeholder="ფილმის სახელი"
              class="bg-[#11101A] outline-0 w-full outline-0 m-1.5"
            />
            <p>ქარ</p>
          </div>
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
            <Field v-slot="{ resetField, field }" name="genres" rules="genres">
              <input
                class="bg-[#11101A] outline-0 w-full outline-0 m-1.5"
                @keydown.enter="resetField()"
                @keydown="addTag"
                @keydown.delete="removeLastTag"
                v-bind="field"
                placeholder="Genres"
              />
            </Field>
          </div>
          <ErrorMessage name="genres" class="text-red-500" />
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="director_eng"
              placeholder="Director"
              class="bg-[#11101A] outline-0 w-full outline-0 m-1.5"
            />
            <p>Eng</p>
          </div>
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="director_ka"
              placeholder="რეჟისორი"
              class="bg-[#11101A] outline-0 w-full outline-0 m-1.5"
            />
            <p>ქარ</p>
          </div>

          <Field
            as="textarea"
            name="description_eng"
            placeholder="Movie description"
            class="px-4 bg-[#11101A] border-gray-600 rounded-md border-2 outline-0 w-full outline-0"
          />
          <p class="absolute top-[43.6rem] right-[34.4rem]">Eng</p>

          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              as="textarea"
              name="description_ka"
              placeholder="ფილმის აღწერა"
              class="bg-[#11101A] outline-0 w-full outline-0e"
            />
            <p>ქარ</p>
          </div>
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="image_upload"
              class="bg-[#11101A] outline-0 w-full outline-0"
            />
          </div>
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
import { mapState, mapGetters } from "pinia";
import { useDataStore } from "@/stores/data/data.js";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    ...mapState(useDataStore, ["allGenres", "userSelectedGenres"]),
    ...mapGetters(useDataStore, ["check"]),
  },
  methods: {
    addTag(event) {
      if (event.code === "Comma" || event.code === "Enter") {
        event.preventDefault();
        let val = event.target.value.trim();
        if (val.length > 0) {
          this.userSelectedGenres.push(val.split(" ")[0]);
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
    check() {
      const found = this.userSelectedGenres.filter(
        (item) => !this.allGenres.includes(item)
      );
      if (found.length > 0) {
        return false;
      } else return true;
    },
  },
};
</script>
