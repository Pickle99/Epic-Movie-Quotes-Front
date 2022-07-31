<template>
  <OnClickOutside class="w-fit md:hidden" @trigger="hideDropdown()">
    <nav
      v-if="isDropdownVisible"
      class="fixed text-white md:justify-around h-[30rem] flex-col w-[20.3rem] md:h-60 w-fit flex bg-[#0d0b14] bg-black md:flex"
    >
      <RouterLink
        :to="{ name: 'profile' }"
        class="flex items-center mt-10 md:mt-0"
        @click="resetPages"
      >
        <div class="w-32 flex justify-center">
          <img
            :class="
              $route.name === 'profile'
                ? 'rounded-full border-2 border-[#E31221]'
                : 'rounded-full'
            "
            :src="`http://localhost:8000/${avatar}`"
            width="54"
            alt="user-avatar"
          />
        </div>
        <div>
          <p>{{ username }}</p>
          <p class="text-sm text-gray-400">
            {{ $t("message.edit_your_profile") }}
          </p>
        </div>
      </RouterLink>

      <RouterLink :to="{ name: 'feed' }" class="flex items-center">
        <div class="w-32 flex justify-center">
          <IconHouse v-if="$route.name !== 'feed'" />
          <IconHouseRed v-if="$route.name === 'feed'" />
        </div>
        <div class="my-7">
          <p>{{ $t("message.news_feed") }}</p>
        </div>
      </RouterLink>
      <RouterLink
        :to="{ name: 'movies' }"
        class="flex items-center"
        @click="resetPages"
      >
        <div class="w-32 flex justify-center">
          <IconCamera v-if="$route.name !== 'movies'" />
          <IconCameraRed v-if="$route.name === 'movies'" />
        </div>
        <div>
          <p>{{ $t("message.list_of_movies") }}</p>
        </div>
      </RouterLink>
    </nav>
  </OnClickOutside>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import IconCamera from "@/components/icons/IconCamera.vue";
import IconCameraRed from "@/components/icons/IconCameraRed.vue";
import IconHouse from "@/components/icons/IconHouse.vue";
import IconHouseRed from "@/components/icons/IconHouseRed.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import { OnClickOutside } from "@vueuse/components";
export default {
  components: {
    IconHouseRed,
    IconHouse,
    IconCameraRed,
    IconCamera,
    OnClickOutside,
  },
  computed: {
    ...mapWritableState(useQuotesStore, ["page", "lastPage"]),
    ...mapWritableState(useLocalStorageStore, ["username", "avatar"]),
    ...mapWritableState(useUserStore, ["isDropdownVisible"]),
  },
  methods: {
    ...mapActions(useUserStore, ["hideDropdown"]),
    resetPages() {
      this.page = 0;
      this.lastPage = 1;
    },
  },
};
</script>
