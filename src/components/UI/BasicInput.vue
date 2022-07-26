<template>
  <div class="flex flex-row">
    <label class="text-white mb-2" :for="name">{{ $t(labelName) }}</label>
    <p class="text-[#DC3545]">*</p>
  </div>
  <Field
    v-slot="{ meta, field}"
    v-model="data[name]"
    :name="name"
    :rules="rules"
  >
    <div
      class="bg-[#CED4DA] mb-2 flex items-center w-full rounded-md"
      @mouseleave="focused = false"
      @mouseenter="focused = true"
    >
      <input
        :disabled="!isDisabled"
        :class="
          meta.touched
            ? meta.valid && !error
              ? 'px-3 py-2 rounded-md outline-none bg-[#CED4DA] appearance-none focus:border-gray-400 w-full border-green-500 border-2'
              : 'px-3 py-2 rounded-md outline-none bg-[#CED4DA] appearance-none focus:border-gray-400 w-full border-red-500 border-2'
            : 'px-3 py-2 rounded-md outline-none bg-[#CED4DA] appearance-none focus:border-gray-400 w-full focus:border-2'
        "
        :placeholder="$t(placeholder)"
        type="text"
        v-bind="field"
      />
      <div class="-ml-10 mr-3">
        <img
          v-if="focused && isDisabled"
          src="@/assets/icons/close.svg"
          alt="img"
          @click="resetField()"
        />

        <div v-if="meta.touched">
          <img
            v-if="meta.valid && !error && !focused"
            src="@/assets/icons/valid.svg"
            alt="img"
          />
          <img
            v-if="(!meta.valid && !focused) || (error && !focused)"
            src="@/assets/icons/invalid.svg"
            alt="img"
          />
        </div>
      </div>
    </div>
  </Field>
  <div class="mb-5 w-72">
    <ErrorMessage class="text-red-500" :name="name" />
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
import { useUserDataStore } from "@/stores/formData/user.js";
import { mapWritableState } from "pinia";
export default {
  components: {
    Field,
    ErrorMessage,
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    ...mapWritableState(useUserDataStore, ["data", "username"]),
  },
  methods: {
    resetField(){
      this.data[this.name] = "";
    },
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
    error: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
};
</script>
