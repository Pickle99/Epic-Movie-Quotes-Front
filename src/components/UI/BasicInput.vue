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
        <IconClose v-if="focused && isDisabled" @click="resetField()" />

        <div v-if="meta.touched">
          <IconValid v-if="meta.valid && !error && !focused" />
          <IconInvalid
            v-if="(!meta.valid && !focused) || (error && !focused)"
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
import { useUserStore } from "@/stores/useUserStore.js";
import { mapWritableState } from "pinia";
import IconClose from "@/components/icons/IconClose.vue";
import IconInvalid from "@/components/icons/IconInvalid.vue";
import IconValid from "@/components/icons/IconValid.vue";
export default {
  components: {
    IconValid,
    IconInvalid,
    IconClose,
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
    error: {
      type: String,
      required: false,
      default: "",
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    ...mapWritableState(useUserStore, ["data", "username"]),
  },
  methods: {
    resetField() {
      this.data[this.name] = "";
    },
  },
};
</script>
