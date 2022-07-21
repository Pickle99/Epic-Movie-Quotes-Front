<template>
  <div class="mt-24">
    <UserNavbar class="absolute"/>
  </div>

 <form-panel form-title="Add Quote" link-to="movie-description" :route-param="$route.params.movie">
   <Form v-slot="{ meta }"  @submit="onSubmit()">
     <div
class="py-2 overflow-auto resize-y my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
     >
       <Field
         v-model="text_en"
         as="textarea"
         name="text_en"
         placeholder="Start create new quote"
         class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
         rules="required"
       />
       <p class="text-[#6C757D]">Eng</p>
     </div>
     <ErrorMessage name="text_en" class="text-red-500" />
     <div
       class="py-2 overflow-auto resize-y my-2 flex items-center border-gray-600 border-2 rounded-md justify-between px-4"
     >
       <Field
         v-model="text_ka"
         as="textarea"
         name="text_ka"
         placeholder="ახალი ციტატა"
         class="resize-none bg-[#11101A] outline-0 w-full placeholder-white"
         rules="required"
       />
       <p class="text-[#6C757D]">ქარ</p>
     </div>
     <ErrorMessage name="text_ka" class="text-red-500" />
     <div class="my-3">
       <ImageUploadAnother @drop.prevent="drop" @change="selectedFile"/>
       <p>{{currentImage.name}}</p>
     </div>
     <div v-for="movie in movies" :key="movie" class="bg-black text-white flex items-center">
         <img width="170" class="rounded-xl py-2.5" :src="`http://localhost:8000/${movie.image}`">
       <div class="ml-5">
         <div class="flex items-center">
           <img src="@/assets/icons/camera.svg" alt="icon"/>
           <h1 class="ml-3">{{$i18n.locale === 'en' ? movie.title.en : movie.title.ka}} ({{movie.year}})</h1>
         </div>
         <p class="mt-7">Director: {{$i18n.locale === 'en' ? movie.director.en : movie.director.ka}}</p>
       </div>
     </div>
     <div class="flex justify-center mt-5">
       <basic-button :is-disabled="!meta.valid">Add Quote</basic-button>
     </div>
   </Form>
 </form-panel>
</template>

<script>
import UserNavbar from '@/components/Main/UserNavbar.vue';
import {Field, ErrorMessage, Form} from "vee-validate";
import BasicButton from "@/components/UI/BasicButton.vue";
import FormPanel from '@/components/Main/FormPanel.vue';
import {useMoviesStore} from "@/stores/formData/movies.js";
import { mapWritableState } from "pinia";
import axios from "@/config/axios/index.js";
import ImageUploadAnother from "@/components/UI/ImageUploadAnother.vue";
export default {
  components: {
    ImageUploadAnother,
    UserNavbar,
    Field,
    ErrorMessage,
    Form,
    BasicButton,
    FormPanel,
  },
  computed: {
    ...mapWritableState(useMoviesStore, ["text_en", "text_ka"])
  },
  data(){
    return {
    movies: '',
    currentImage: "",
    }
  },
  mounted(){
    this.getMovie()
  },
  methods: {
    onSubmit(){
      const formData = new FormData();
      formData.append("text_en", this.text_en);
      formData.append("text_ka", this.text_ka);
      formData.append("image", this.currentImage);
      axios
        .post("movie/"+this.$route.params.movie+"/quote", formData, {
          headers: {
            "Content-Type": "multipart/form-formData",
          },
        })
        .then(() => {
          this.$router.push({ name: "movie-description" });
          this.text_en = "";
          this.text_ka = "";
          this.currentImage = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getMovie() {
      axios
        .get(`movie/`+this.$route.params.movie)
        .then((res) => {
          this.movies = res.data;
          console.log(res)
          console.log(this.movies)
        })
    },
    drop(e) {
      this.currentImage = e.dataTransfer.files[0];
    },
    selectedFile() {
      this.currentImage = document.querySelector(".image").files[0];
    },
  },
}
</script>