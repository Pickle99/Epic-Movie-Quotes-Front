<template>
  <div>
    <div
      class="p-4 my-2 bg-black flex items-center px-4"
      @drag.prevent
      @dragleave.prevent
      @dragover.prevent
      @drop.prevent="true"
    >
      <IconPhoto class="mr-4" />
      <label for="image" class="text-white cursor-pointer">{{
        $t("message.upload_photo")
      }}</label>
      <Field
        id="image"
        type="file"
        name="image"
        class="image bg-[#11101A] outline-0 w-full placeholder-white hidden"
        rules="required"
        :placeholder="$t('message.drag_and_drop')"
      />
    </div>
    <ErrorMessage name="image" class="text-red-500" />
  </div>
</template>
<script>
import { Field, ErrorMessage } from "vee-validate";
import IconPhoto from "@/components/icons/IconPhoto.vue";
export default {
  components: {
    IconPhoto,
    Field,
    ErrorMessage,
  },
};
</script>
