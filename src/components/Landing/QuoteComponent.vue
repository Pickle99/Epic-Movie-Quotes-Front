<template>
  <img src="@/assets/icons/dots.svg" class="hover:cursor-pointer p-2" alt="icon" @click="setVisible()" />
  <div v-if="visible" class="bg-[#24222F] w-44 h-36 absolute rounded-md -ml-4 flex flex-col justify-around">
    <div class="flex items-center ml-5">
      <img class="hover:cursor-pointer" src="@/assets/icons/eye.svg" alt="icon"/>
      <p class="text-sm ml-3 hover:cursor-pointer">View Post</p>
    </div>
    <div class="flex items-center ml-5">
      <img class="hover:cursor-pointer" src="@/assets/icons/pen.svg" alt="icon"/>
      <RouterLink :to="{name: 'edit-quote', params: {movie: $route.params.movie, quote:quoteId }}" class="text-sm ml-3 hover:cursor-pointer">Edit</RouterLink>
    </div>
    <div class="flex items-center ml-5">
      <img class="hover:cursor-pointer" src="@/assets/icons/trash.svg" alt="icon"/>
      <p class="text-sm ml-3 hover:cursor-pointer">Delete</p>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    quoteId: {
      type: Number,
      required:true,
    }
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    setVisible() {
      this.visible = !this.visible
    }
  }
}
</script>