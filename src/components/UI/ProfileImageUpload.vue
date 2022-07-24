<template>
    <div class="flex justify-center items-center">
      <img  class="rounded-full" width="128" :src="avatar">
      <label for="image" class="cursor-pointer flex items-center absolute mt-52 flex-col bg-[#191725] w-fit p-3 rounded-md bg-opacity-70">
        <Field id="image" type="file" name="image" class="hidden image" @change="fileChange"/>
        <div>
          <p class="text-sm">Change Photo</p>
        </div>
      </label>
    </div>
</template>

<script>
import {Field} from "vee-validate";
import { mapWritableState } from "pinia";
import { useUserDataStore } from "@/stores/formData/user.js";
export default {
  components: {Field},
  data(){
    return {
      previewAvatar: null,
    }
  },
  computed: {
    ...mapWritableState(useUserDataStore, ["data"]),
    avatar(){
      if(this.previewAvatar){
        return this.previewAvatar;
      }else return 'http://localhost:8000/'+this.data.avatar;
    }
  },
  methods: {
    fileChange(e) {
      let reader, files = e.target.files

      reader = new FileReader()

      reader.onload = (e) => {
        this.previewAvatar = e.target.result
      }

      reader.readAsDataURL(files[0])
    }
  }
}
</script>