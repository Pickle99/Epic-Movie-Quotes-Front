<template>
  <div class="flex flex-row">
    <label class="text-white mb-2" :for="name">{{ $t(labelName) }}</label>
    <p class="text-[#DC3545]">*</p>
  </div>
  <Field
    @input="updateField(name, $event.target.value)"
    :value="data.name"
    :name="name"
    v-slot="{ meta, field }"
    :rules="rules"
  >
    <div class="bg-[#CED4DA] mb-2 flex items-center w-fit rounded-md">
      <input
        :class="
          meta.touched
            ? meta.valid && !data.error
              ? 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none focus:outline-none focus:border-gray-400 w-96 border-green-500 border-2'
              : 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none focus:outline-none  focus:border-gray-400 w-96 border-red-500 border-2'
            : 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none focus:outline-none focus:border-gray-400 focus:border-2  w-96'
        "
        :placeholder="$t(placeholder)"
        :type="type"
        v-bind="field"
      />
      <div class="-ml-10 mr-3">
        <img
          class="hover:cursor-pointer"
          @click="click"
          src="@/assets/images/eye.png"
          alt="img"
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
import { useDataStore } from "@/stores/data/data.js";
import { mapActions, mapWritableState, mapGetters } from "pinia";
export default {
  components: {
    Field,
    ErrorMessage,
  },
  computed: {
    ...mapGetters(useDataStore, ["PasswordType", "PasswordConfirmationType"]),
    ...mapWritableState(useDataStore, ["data"]),
  },
  methods: {
    ...mapActions(useDataStore, [
      "updateField",
      "setPasswordFieldType",
      "setPasswordConfirmationFieldType",
    ]),
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
    type: {
      type: String,
      required: true,
    },
    click: {
      type: Function,
      required: true,
    },
  },
};
</script>
