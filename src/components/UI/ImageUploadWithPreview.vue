<template>
  <div class="flex justify-center items-center">
    <img
      class="rounded-xl py-2.5 w-full"
      :src="previewImage || back_url + quote.image"
      alt="quote-image"
    />
    <label
      for="image"
      class="cursor-pointer flex items-center flex-col absolute bg-[#191725] w-fit p-3 rounded-md bg-opacity-70"
    >
      <IconPhoto />
      <Field
        id="image"
        type="file"
        name="image"
        class="hidden image"
        @change="fileChange"
      />
      <p>{{ $t("message.change_photo") }}</p>
    </label>
  </div>
</template>

<script>
import { mapState} from "pinia";
import { Field } from "vee-validate";
import IconPhoto from "@/components/icons/IconPhoto.vue";
import { useEnvStore } from "@/stores/useEnvStore";

export default {
  components: { IconPhoto, Field },
  props: {
    quote: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      previewImage: null,
    };
  },
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
  },
  methods: {
    fileChange(e) {
      let reader,
        files = e.target.files;

      reader = new FileReader();

      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };

      reader.readAsDataURL(files[0]);
    },
  },
};
</script>
