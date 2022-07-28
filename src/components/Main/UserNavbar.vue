<template>
    <nav class="text-white md:justify-around hidden flex-col w-[20.3rem] md:h-60 w-fit md:flex bg-[#0d0b14] bg-black md:flex">
      <RouterLink :to="{name: 'profile'}" class="flex items-center mt-10 md:mt-0">
        <div
          class="w-32 flex justify-center">
          <img
            :class="$route.name === 'profile' ? 'rounded-full border-2 border-[#E31221]' : 'rounded-full'"
            :src="`http://localhost:8000/${avatar}`"
            width="54"
            alt="img"
          />
        </div>
        <div>
          <p>{{ username }}</p>
          <p class="text-sm text-gray-400">{{$t('message.edit_your_profile')}}</p>
        </div>
      </RouterLink>

      <RouterLink :to="{ name: 'feed' }" class="flex items-center" @click="resetPages">
        <div class="w-32 flex justify-center">
          <IconHouse v-if="$route.name !== 'feed'"/>
          <IconHouseRed v-if="$route.name === 'feed'"/>
        </div>
        <div class="my-7">
          <p>{{$t('message.news_feed')}}</p>
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'movies' }" class="flex items-center">
        <div class="w-32 flex justify-center">
          <IconCamera v-if="$route.name !== 'movies'"/>
          <IconCameraRed v-if="$route.name === 'movies'" />
        </div>
        <div>
          <p>{{$t('message.list_of_movies')}}</p>
        </div>
      </RouterLink>
    </nav>
</template>

<script>
import { mapWritableState } from "pinia";
import { useLocalStorageStore } from "@/stores/localStorage.js";
import {useQuotesStore} from "@/stores/quotes.js";
import IconCamera from "@/components/icons/IconCamera.vue";
import IconCameraRed from "@/components/icons/IconCameraRed.vue";
import IconHouse from "@/components/icons/IconHouse.vue";
import IconHouseRed from "@/components/icons/IconHouseRed.vue";
export default {
  components: { IconHouseRed, IconHouse, IconCameraRed, IconCamera,},
  computed: {
  ...mapWritableState(useQuotesStore, ["page", "lastPage"]),
...mapWritableState(useLocalStorageStore, ["username", "avatar"]),
},
  methods: {
  resetPages(){
    this.page = 1;
    this.lastPage = 2;
   },
  }
}
</script>
