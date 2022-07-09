<template>
  <div class="mt-28 text-white flex justify-center">
    <div class="bg-[#11101A]">
      <div
        class="p-4 w-[55rem] grid justify-items-end grid-cols-2 items-center"
      >
        <div><h1 class="font-bold">Add Movie</h1></div>
        <div><img src="@/assets/icons/x-icon.svg" alt="img" /></div>
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
              class="bg-[#11101A] outline-0 w-full outline-0"
            />
            <p>Eng</p>
          </div>
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="title_ka"
              placeholder="ფილმის სახელი"
              class="bg-[#11101A] outline-0 w-full outline-0"
            />
            <p>ქარ</p>
          </div>
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="genres"
              placeholder="Genres"
              class="bg-[#11101A] outline-0 w-full outline-0"
            />
          </div>
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="director_eng"
              placeholder="Director"
              class="bg-[#11101A] outline-0 w-full outline-0"
            />
            <p>Eng</p>
          </div>
          <div
            class="my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
          >
            <Field
              name="director_ka"
              placeholder="რეჟისორი"
              class="bg-[#11101A] outline-0 w-full outline-0"
            />
            <p>ქარ</p>
          </div>

          <Field
            as="textarea"
            name="description_eng"
            placeholder="Movie description"
            class="px-4 bg-[#11101A] border-gray-600 rounded-md border-2 outline-0 w-full outline-0"
          />
          <p class="absolute top-[40rem] right-[34.4rem]">Eng</p>

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
        </Form>
      </div>
      <div class="flex">
        <div class="flex" v-for="(tag, index) in tags" :key="tag">
          <div class="flex border-gray-800 border-4 mx-4">
            <p class="text-red-500">asd{{ tag }}</p>
            <button @click="removeTag(index)">x</button>
          </div>
        </div>
        <input
          class="text-black"
          @keydown="addTag"
          @keydown.delete="removeLastTag"
        />
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
      tags: [],
    };
  },
  methods: {
    addTag(event) {
      if (event.code === "Comma" || event.code === "Enter") {
        event.preventDefault();
        let val = event.target.value.trim();

        if (val.length > 0) {
          this.tags.push(val);
          event.target.value = "";
        }
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1);
      }
    },
  },
};
</script>
