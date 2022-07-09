<template>
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />
  <UserPost />
</template>

<script>
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import UserPost from "@/components/Main/UserPost.vue";
export default {
  components: {
    MainHeader,
    UserNavbar,
    UserPost,
  },
};
</script>
