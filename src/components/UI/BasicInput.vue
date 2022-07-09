<template>
  <div class="flex flex-row">
    <label class="text-white mb-2" :for="name">{{ $t(labelName) }}</label>
    <p class="text-[#DC3545]">*</p>
  </div>
  <Field
    v-slot="{ meta, field, resetField }"
    @input="updateField(name, $event.target.value)"
    :name="name"
    :rules="rules"
    :value="data.name"
  >
    <div
      @mouseleave="this.focused = false"
      @mouseenter="this.focused = true"
      class="bg-[#CED4DA] mb-2 flex items-center w-fit rounded-md"
    >
      <input
        :class="
          meta.touched
            ? meta.valid && !error
              ? 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none focus:outline-none focus:border-gray-400 w-96 border-green-500 border-2'
              : 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none focus:outline-none  focus:border-gray-400 w-96 border-red-500 border-2'
            : 'px-3 py-2 rounded-md bg-[#CED4DA] appearance-none focus:outline-none focus:border-gray-400 focus:border-2  w-96'
        "
        :placeholder="$t(placeholder)"
        type="text"
        v-bind="field"
      />
      <div class="-ml-10 mr-3">
        <img
          @click="resetField()"
          v-if="focused"
          src="@/assets/icons/close.svg"
          alt="img"
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
import { useDataStore } from "@/stores/data/data.js";
import { mapActions } from "pinia";
import { mapWritableState } from "pinia";
export default {
  data() {
    return {
      focused: false,
    };
  },
  components: {
    Field,
    ErrorMessage,
  },
  methods: {
    ...mapActions(useDataStore, ["updateField"]),
  },
  computed: {
    ...mapWritableState(useDataStore, ["data"]),
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
