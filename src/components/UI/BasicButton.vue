<template>
  <button
    :class="
      isDisabled
        ? 'text-white bg-[#E31221] w-full py-2 rounded-md opacity-50'
        : 'text-white bg-[#E31221] w-full py-2 rounded-md'
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
      required: false,
    },
  },
};
</script>
