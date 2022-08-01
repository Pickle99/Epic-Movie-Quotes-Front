<template>
  <div class="flex justify-center items-center">
    <img class="rounded-full" width="128" :src="avatar" alt="avatar"/>
    <label
      for="image"
      class="cursor-pointer flex items-center absolute mt-52 flex-col bg-[#191725] w-fit p-3 rounded-md bg-opacity-70"
    >
      <Field
        id="image"
        type="file"
        name="image"
        class="hidden image"
        @change="fileChange"
      />

      <div>
        <p class="text-smt">{{ $t("message.change_photo") }}</p>
      </div>
    </label>
  </div>
</template>

<script>
import { Field } from "vee-validate";
import { mapWritableState } from "pinia";
import { useUserStore } from "@/stores/useUserStore.js";
export default {
  components: { Field },
  data() {
    return {
      previewAvatar: null,
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ["data"]),
    avatar() {
      if (this.previewAvatar) {
        return this.previewAvatar;
      } else return import.meta.env.VITE_IMAGES_URL + this.data.avatar;
    },
  },
  methods: {
    fileChange(e) {
      let reader,
        files = e.target.files;

      reader = new FileReader();

      reader.onload = (e) => {
        this.previewAvatar = e.target.result;
      };

      reader.readAsDataURL(files[0]);
    },
  },
};
</script>
