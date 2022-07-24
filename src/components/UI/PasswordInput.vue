<template>
  <div class="flex flex-row">
    <label class="text-white mb-2" :for="name">{{ $t(labelName) }}</label>
    <p class="text-[#DC3545]">*</p>
  </div>
  <Field
    v-slot="{ meta, field }"
    v-model="data[name]"
    :name="name"
    :rules="rules"
  >
    <div class="bg-[#CED4DA] mb-2 flex items-center w-full rounded-md">
      <input
        :class="
          meta.touched
            ? meta.valid && !error
              ? 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none outline-none focus:border-gray-400 w-full border-green-500 border-2'
              : 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none outline-none  focus:border-gray-400 w-full border-red-500 border-2'
            : 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none outline-none focus:border-gray-400 focus:border-2  w-full'
        "
        :placeholder="$t(placeholder)"
        :type="PasswordType"
        v-bind="field"
      />
      <div class="-ml-10 mr-3">
        <img
          class="hover:cursor-pointer"
          src="@/assets/icons/eye.svg"
          alt="img"
          @click="setPasswordType()"
        />
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
import { mapActions, mapWritableState } from "pinia";
export default {
  components: {
    Field,
    ErrorMessage,
  },
  data() {
    return {
      isPasswordVisible: false,
    };
  },
  computed: {
    ...mapWritableState(useUserDataStore, ["data"]),
    PasswordType() {
      if (this.isPasswordVisible) {
        return "text";
      } else return "password";
    },
  },
  methods: {
    ...mapActions(useUserDataStore, ["updateField"]),
    setPasswordType() {
      this.isPasswordVisible = !this.isPasswordVisible;
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
  },
};
</script>
