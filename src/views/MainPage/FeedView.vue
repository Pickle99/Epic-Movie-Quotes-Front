<template>
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />
<!--  <div>-->
<!--    <div class="text-white flex justify-center items-center">-->
<!--      <article>-->
<!--        <div class="flex">-->
<!--          <div class="rounded-md bg-[#24222F] px-2 pr-[6.8rem] py-2">-->
<!--            <div class="flex">-->
<!--              <button class="ml-4 flex">-->
<!--                <img class="mr-3" src="@/assets/icons/pencil.svg" alt="img" />-->
<!--                Write new quote-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </article>-->
<!--      <main class="flex items-center">-->
<!--        <div class="w-[20rem]">-->
<!--          <div>-->
<!--            <img-->
<!--              class="ml-5"-->
<!--              src="@/assets/icons/magnifying-glass.svg"-->
<!--              alt="img"-->
<!--            />-->
<!--          </div>-->
<!--          <div class="ml-3">-->
<!--            <input class="bg-[#0d0b14] w-24" placeholder="Search by" />-->
<!--          </div>-->
<!--        </div>-->
<!--      </main>-->
<!--    </div>-->
<!--  </div>-->

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
