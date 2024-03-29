<template>
  <div class="text-white flex justify-center mb-32">
    <div class="bg-[#11101A] w-[43rem] z-10">
      <div class="flex items-center justify-center w-full p-4">
        <div
          v-if="quoteUserId === parseInt(localUserId)"
          class="flex justify-start w-1/4"
        >
          <div v-if="$route.name === 'edit-quote'" class="flex">
            <IconTrash class="cursor-pointer" @click="deleteQuote()" />
            <p class="ml-3 cursor-pointer" @click="deleteQuote()">
              {{ $t("message.delete") }}
            </p>
          </div>
          <div v-if="$route.name === 'show-quote'" class="flex">
            <div>
              <RouterLink
                :to="{
                  name: 'edit-quote',
                  params: { quote: $route.params.quote },
                }"
              >
                <IconPen class="cursor-pointer" />
              </RouterLink>
            </div>
            <div class="border-gray-500 border-r-2 mx-5 my-0.5"></div>
            <div>
              <IconTrash class="cursor-pointer" @click="deleteQuote()" />
            </div>
          </div>
        </div>
        <div v-if="quoteUserId !== parseInt(localUserId)" class="w-1/4"></div>
        <div class="flex justify-center w-2/4 font-bold">
          <p>{{ formTitle }}</p>
        </div>
        <div class="flex justify-end w-1/4">
          <RouterLink :to="{ name: linkTo, params: { movie: routeParam } }">
            <IconX @click="writeQuoteResetFields" />
          </RouterLink>
        </div>
      </div>
      <div class="border-gray-600 border-b-2 w-full"></div>
      <div class="flex p-4">
        <div class="flex items-center">
          <img
            width="48"
            :src="back_url + correctAuthorAvatar"
            alt="user-avatar"
          />
          <p class="ml-4">{{ correctAuthorUsername }}</p>
        </div>
      </div>
      <div class="flex flex-col p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapActions, mapState } from "pinia";
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import { useQuotesStore } from "@/stores/useQuotesStore.js";
import axios from "@/config/axios/index.js";
import IconPen from "@/components/icons/IconPen.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconX from "@/components/icons/IconX.vue";
import { useEnvStore } from "@/stores/useEnvStore";
export default {
  components: { IconX, IconTrash, IconPen },
  props: {
    authorAvatar: {
      type: String,
      required: false,
      default: null,
    },
    authorUsername: {
      type: String,
      required: false,
      default: null,
    },
    formTitle: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      required: true,
    },
    routeParam: {
      type: String,
      required: false,
      default: null,
    },
    quoteUserId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  computed: {
    ...mapState(useEnvStore, ["back_url"]),
    ...mapWritableState(useLocalStorageStore, {
      localUser: "username",
      localAvatar: "avatar",
      localUserId: "userId",
    }),
    correctAuthorUsername() {
      return this.authorUsername ?? this.localUser;
    },
    correctAuthorAvatar() {
      return this.authorAvatar ?? this.localAvatar;
    },
  },
  methods: {
    ...mapActions(useQuotesStore, ["writeQuoteResetFields"]),
    deleteQuote() {
      axios
        .delete(`quote/${this.$route.params.quote}`)
        .then(() => {
          this.$router.push({
            name: "movie-description",
            params: { movie: this.$route.params.movie },
          });
          this.writeQuoteResetFields();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
