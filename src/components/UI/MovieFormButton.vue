<template>
  <button
    :class="
      !genres || isDisabled
        ? 'text-white bg-[#E31221] w-full py-2 rounded-md opacity-50'
        : 'text-white bg-[#E31221] w-full py-2 rounded-md'
    "
    :disabled="!genres || isDisabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    genres: {
      type: [Array, Number],
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
