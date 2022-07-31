<template>
  <div class="flex md:mb-24 z-0 mb-24">
    <MainHeader />
    <UserNavbarMobile class="absolute z-10" />
  </div>
  <UserNavbar class="fixed" />
  <div class="flex justify-center -mt-12">
    <NotificationComponent
      :class="!isNotificationVisible ? 'hidden' : 'fixed md:hidden'"
    />
  </div>

  <div v-if="created_at">
    <div class="mt-10 text-white flex justify-center">
      <Form class="flex flex-col" @submit="onSubmit()">
        <div class="w-[50rem] mt-5 hidden md:block">
          <h1 class="text-2xl font-bold">{{ $t("message.my_profile") }}</h1>
        </div>

        <div
          class="bg-[#11101A] rounded-md mt-36 w-full pb-24 h-full flex flex-col justify-center items-center"
        >
          <div class="absolute top-52 flex flex-col items-center">
            <ProfileImageUpload
              v-if="!isNotificationVisible"
              @change="selectedFile"
            />
          </div>
          <div class="md:mt-36 mt-56">
            <div class="md:w-[30rem] mx-12 md:mx-0 text-black">
              <basic-input
                name="username"
                placeholder="message.at_least_3_max_15"
                rules="min:3|max:15|alpha_lower"
                label-name="message.username"
              />
              <basic-input
                :is-disabled="provider === null ? true : false"
                name="email"
                placeholder="message.enter_your_email"
                rules="email"
                label-name="message.email"
              />

              <p
                class="mb-4 text-[#0D6EFD] underline cursor-pointer w-fit"
                @click="showHidePasswordChange"
              >
                {{ $t("message.change_password") }}
              </p>

              <div v-if="provider === null && isChangePasswordVisible">
                <password-input
                  name="password"
                  placeholder="message.password"
                  rules="min:8|max:15"
                  label-name="message.password"
                />
                <password-input
                  name="password_confirmation"
                  placeholder="message.confirm_password"
                  rules="confirmed:@password"
                  label-name="message.confirm_password"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center md:justify-end w-full mt-7">
          <div>
            <basic-button class="p-5 mb-16">{{
              $t("message.save_changes")
            }}</basic-button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { useLocalStorageStore } from "@/stores/useLocalStorage.js";
import BasicButton from "@/components/UI/BasicButton.vue";
import BasicInput from "@/components/UI/BasicInput.vue";
import { Form } from "vee-validate";
import { mapWritableState, mapGetters } from "pinia";
import MainHeader from "@/components/Main/MainHeader.vue";
import UserNavbar from "@/components/Main/UserNavbar.vue";
import PasswordInput from "@/components/UI/PasswordInput.vue";
import { useUserStore } from "@/stores/useUserStore.js";
import axios from "@/config/axios/index.js";
import ProfileImageUpload from "@/components/UI/ProfileImageUpload.vue";
import UserNavbarMobile from "@/components/Main/UserNavbarMobile.vue";
import NotificationComponent from "@/components/Main/NotificationComponent.vue";
import { useNotificationsStore } from "@/stores/useNotificationsStore.js";
export default {
  components: {
    ProfileImageUpload,
    Form,
    PasswordInput,
    MainHeader,
    UserNavbar,
    BasicButton,
    BasicInput,
    UserNavbarMobile,
    NotificationComponent,
  },
  data() {
    return {
      isChangePasswordVisible: false,
    };
  },
  created() {
    this.handleGetUserData();
  },
  computed: {
    ...mapWritableState(useNotificationsStore, ["isNotificationVisible"]),
    ...mapWritableState(useLocalStorageStore, {
      localAvatar: "avatar",
      localUserId: "userId",
    }),
    ...mapWritableState(useUserStore, [
      "data",
      "provider",
      "created_at",
      "selectedAvatar",
    ]),
    ...mapGetters(useUserStore, ["profileUpdateData"]),
  },
  methods: {
    selectedFile() {
      this.selectedAvatar = document.querySelector(".image").files[0];
    },
    handleGetUserData() {
      axios
        .get("user/" + this.localUserId)
        .then((res) => {
          console.log(res);
          this.data.username = res.data.data.username;
          this.data.email = res.data.data.email;
          this.data.avatar = res.data.data.avatar;
          this.provider = res.data.data.provider;
          this.created_at = res.data.data.created_at;
        })
        .catch((err) => console.log(err));
    },
    showHidePasswordChange() {
      this.isChangePasswordVisible = !this.isChangePasswordVisible;
    },
    onSubmit() {
      axios
        .post("user/" + this.localUserId + "/update", this.profileUpdateData)
        .then((res) => {
          this.user = res.data.data;
          localStorage.setItem("username", this.user.username);
          localStorage.setItem("avatar", this.user.avatar);
          window.location.href = "http://localhost:3000/profile";
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
