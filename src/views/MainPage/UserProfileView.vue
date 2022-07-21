<template>
  <div class="flex mb-24">
    <MainHeader />
  </div>
  <UserNavbar class="absolute" />
  <div class="mt-10 text-white flex justify-center">
   <div class="flex flex-col">
     <div class="w-[50rem] mt-5">
       <h1 class="text-2xl font-bold">My profile</h1>
     </div>

     <div class="bg-[#11101A] rounded-md mt-36 w-full pb-24 h-full flex flex-col justify-center items-center">
            <div class="absolute top-44 flex flex-col items-center">
              <img class="w-40 rounded-full"  :src="`http://localhost:8000/${avatar}`"  alt="img"/>
              <p class="mt-4">Upload new photo</p>
            </div>
      <div class="mt-24">
       <Form>
         <div class="w-[30rem]">
             <basic-input
               name="username"
               placeholder="message.at_least_3_max_15"
               rules="required|min:3|max:15|alpha_lower"
               label-name="message.username"
             />
             <basic-input
               name="email"
               placeholder="message.enter_your_email"
               rules="required|email"
               label-name="message.email"
             />
             <password-input
               name="password"
               placeholder="message.password"
               rules="required|min:8|max:15"
               label-name="message.password"
             />
         </div>
       </Form>
      </div>
     </div>


    <div class="flex justify-end w-full mt-7">
      <div>
        <basic-button class="p-5">Save changes</basic-button>
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import { useLocalStorageStore } from "@/stores/localStorage.js";
import BasicButton from "@/components/UI/BasicButton.vue";
import BasicInput from "@/components/UI/BasicInput.vue";
import {Form} from "vee-validate";
import { mapWritableState } from "pinia";
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import PasswordInput from "@/components/UI/PasswordInput.vue";
export default {
  components: {
    Form,
    PasswordInput,
    MainHeader,
    UserNavbar,
    BasicButton,
    BasicInput,
  },
  computed: {
    ...mapWritableState(useLocalStorageStore, ["avatar"])
  }
}
</script>