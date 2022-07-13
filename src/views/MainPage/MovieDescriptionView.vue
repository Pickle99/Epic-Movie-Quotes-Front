<template>
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />
  <div class="ml-96 text-white">
    <h1 class="mt-28 font-bold">Movie description</h1>
    <div class="mt-8 flex">
      <div>
        <img
          class="rounded-xl"
          :src="`http://localhost:8000/images/${movie.image}`"
          alt="img"
          width="800"
        />
      </div>
      <div class="ml-5">
        <h1 class="text-[#DDCCAA] font-bold">
          {{ movie.title }}
          ({{ movie.year }})
        </h1>
        <div class="font-bold flex mt-5">
          <p
            v-for="genre in movie.genres"
            :key="genre"
            class="py-1 px-3 mr-3 rounded-md bg-gray-500 w-fit"
          >
            {{ genre.name }}
          </p>
        </div>
        <div class="ml-3">
          <article class="flex font-bold">
            <div>
              <p class="text-sm mt-5">Director:</p>
              <p class="text-sm mt-5">Budget:</p>
            </div>
            <div class="ml-3">
              <p class="text-sm mt-5">
                {{
                  this.$i18n.locale == "en"
                    ? movie.director.en
                    : movie.director.ka
                }}
              </p>
              <p class="text-sm mt-5">{{ movie.budget }}</p>
            </div>
          </article>
          <p class="text-[#CED4DA] w-[30rem] mt-5">
            {{
              this.$i18n.locale === "en"
                ? movie.description.en
                : movie.description.ka
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="text-white ml-96 mt-8 flex items-center">
    <p class="border-r-2 pr-5 py-1 border-gray-800 mr-5">Quotes (total 7)</p>
    <RouterLink
      :to="{ name: 'movies-add' }"
      class="flex items-center bg-[#E31221] p-2 rounded-md"
    >
      <img class="mr-2" src="@/assets/icons/plus.svg" alt="img" />
      <p>Add Quote</p>
    </RouterLink>
  </div>
</template>

<script>
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import axios from "@/config/axios/index.js";
export default {
  components: { MainHeader, UserNavbar },
  data() {
    return {
      movie: [],
    };
  },
  methods: {
    getMovieDescription() {
      axios
        .post(`movie/${this.$route.params.id}`)
        .then((res) => {
          this.movie = res.data;
          console.log(res);
          console.log(this.movie, "movie");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getMovieDescription();
  },
};
</script>
