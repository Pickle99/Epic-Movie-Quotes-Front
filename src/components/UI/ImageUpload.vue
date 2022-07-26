<template>
  <div>
    <div
      class="p-4 my-2 flex items-center border-gray-600 border-2 rounded-md px-4"
      @drag.prevent
      @dragleave.prevent
      @dragover.prevent
      @drop.prevent="true"
    >
      <IconPhoto class="mr-4"/>
      <p>{{$t('message.drag_and_drop_or')}}</p>
      <label
        for="image"
        class="hover:cursor-pointer ml-5 bg-[#9747FF] outline-0 w-fit p-1.5 rounded-sm text-white"
        >{{$t('message.choose_file')}}</label
      >
      <Field
        id="image"
        type="file"
        name="image"
        class="image bg-[#11101A] outline-0 w-full placeholder-white hidden"
        :rules="$route.name === 'movies-add' ? 'required' : null"
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
