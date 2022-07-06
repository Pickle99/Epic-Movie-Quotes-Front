<template>
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />

  <div class="text-white justify-center flex mt-60">
    <div class="w-[45rem] bg-black">
      <div class="mx-5 my-5">
        <header class="flex items-center">
          <img src="@/assets/images/icons/user.png" alt="img" />
          <p class="ml-5">Maia Nakashidze</p>
        </header>
        <p class="mt-5">"Follow your dream. movie quote"</p>
        <div class="my-6">
          <img
            src="@/assets/images/movies/Interstellar.png"
            alt="img"
            width="890"
          />
        </div>
        <div class="flex justify-around w-32 items-center">
          <p>3</p>
          <img src="@/assets/images/icons/heart.png" alt="img" />
          <p>10</p>
          <img src="@/assets/images/icons/square.png" alt="img" />
        </div>
        <div class="mt-10">
          <div class="flex items-center">
            <div><img src="@/assets/images/icons/user.png" alt="img" /></div>
            <div>
              <p class="ml-5">Nina Baidadze</p>
            </div>
          </div>
          <p class="ml-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque nunc vel massa facilisis consequat elit morbi convallis
            convallis. Volutpat vitae et nisl et. Adipiscing enim integer mi leo
            nisl. Arcu vitae mauris odio eget.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
export default {
  components: {
    MainHeader,
    UserNavbar,
  },
};
</script>
