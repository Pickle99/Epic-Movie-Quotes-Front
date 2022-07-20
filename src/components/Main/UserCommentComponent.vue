<template>
  <article class="mt-10">
    <div class="flex items-center">
      <div>
        <img
          class="rounded-full"
          :src="`http://localhost:8000/${avatar}`"
          alt="img"
          width="64"
        />
      </div>
      <div>
        <p class="ml-5">{{user}}</p>
      </div>
    </div>
    <div class="border-b border-gray-600 w-[37.5rem] ml-20">
      <p class="mb-5">
      {{text}}
      </p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  }
}
</script>