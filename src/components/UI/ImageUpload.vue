<template>
  <div>
    <div
      class="p-4 my-2 flex items-center border-gray-600 border-2 rounded-md px-4"
      @drag.prevent
      @dragleave.prevent
      @dragover.prevent
      @drop.prevent="true"
    >
      <img class="mr-4" src="@/assets/icons/photo.svg" alt="svg" />
      <p>Drag & drop your image here or</p>
      <label
        for="image"
        class="hover:cursor-pointer ml-5 bg-[#9747FF] outline-0 w-fit p-1.5 rounded-sm text-white"
        >Choose file</label
      >
      <Field
        id="image"
        type="file"
        name="image"
        class="image bg-[#11101A] outline-0 w-full placeholder-white hidden"
        :rules="$route.name === 'movies-add' ? 'required' : null"
        placeholder="drag and drop"
      />
    </div>
    <ErrorMessage name="image" class="text-red-500" />
  </div>
</template>
<script>
import { Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Field,
    ErrorMessage,
  },
};
</script>
