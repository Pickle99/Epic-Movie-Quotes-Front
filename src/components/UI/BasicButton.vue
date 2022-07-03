<template>
  <button
    :class="
      !meta.valid
        ? 'text-white bg-[#E31221] py-2 rounded-md opacity-50'
        : 'opacity-100 text-white bg-[#E31221] py-2 rounded-md'
    "
    :disabled="isDisabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
