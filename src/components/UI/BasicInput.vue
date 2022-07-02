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
    :placeholder="placeholder"
    type="text"
  >
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
        type="text"
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
import { Field, ErrorMessage } from "vee-validate";
import { useDataStore } from "@/stores/data/data.js";
import { mapActions } from "pinia";
import { mapWritableState } from "pinia";
export default {
  components: {
    Field,
    ErrorMessage,
  },
  computed: {
    ...mapWritableState(useDataStore, ["data"]),
  },
  methods: {
    ...mapActions(useDataStore, ["updateField"]),
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
