<template>
  <div class="flex flex-row">
    <label class="text-white mb-2" :for="name">{{ $t(labelName) }}</label>
    <p class="text-[#DC3545]">*</p>
  </div>
  <Field :name="name" v-slot="{ meta, field }" :rules="rules">
    <div class="bg-[#CED4DA] mb-2 flex items-center w-fit rounded-md">
      <input
        :class="
          meta.dirty || meta.touched
            ? meta.valid
              ? 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none focus:outline-none  w-96 border-green-500 border-2'
              : 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none focus:outline-none   w-96 border-red-500 border-2'
            : 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none focus:outline-none focus:border-gray-400 focus:border-2  w-96'
        "
        :placeholder="$t(placeholder)"
        v-bind="field"
      />
      <div v-if="meta.dirty || meta.touched" class="-ml-10 mr-3">
        <img v-if="meta.valid" src="@/assets/images/correct.png" alt="img" />
        <img v-if="!meta.valid" src="@/assets/images/invalid.png" alt="img" />
      </div>
    </div>
  </Field>
  <div class="mb-5 w-72">
    <ErrorMessage class="text-red-500" :name="name" />
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
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      required: true,
    },
    labelName: {
      type: String,
      required: true,
    },
  },
};
</script>