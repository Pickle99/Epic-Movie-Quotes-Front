<template>
  <div class="flex justify-center items-center">
    <img  class="rounded-xl py-2.5 w-full" :src="previewImage ||`http://localhost:8000/${quote.image}`">
    <label for="image" class="cursor-pointer flex items-center flex-col absolute bg-[#191725] w-fit p-3 rounded-md bg-opacity-70">
      <img src="@/assets/icons/photo.svg" alt="svg"/>
      <Field id="image" type="file" name="image" class="hidden image" @change="fileChange"/>
      <p>Change Photo</p>
    </label>
  </div>
</template>

<script>
import {Field} from "vee-validate";

export default {
  components: {Field},
  props: {
    quote: {
      type: Object,
      required:true,
    }
  },
  data(){
    return {
      previewImage: null,
    }
  },
  methods: {

    fileChange(e) {
      let reader, files = e.target.files

      reader = new FileReader()

      reader.onload = (e) => {
        this.previewImage = e.target.result
      }

      reader.readAsDataURL(files[0])
    }
  }
}
</script>