import { defineStore } from "pinia";

export const useUserDataStore = defineStore("user", {
  state: () => {
    return {
      data: {
        username: "",
        user: "",
        email: "",
        password: "",
        password_confirmation: "",
        forgot_password: "",
        avatar: "",
      },
      provider: "",
      created_at: "",
      selectedAvatar: "",
    };
  },
  getters: {
    profileUpdateData(){
      const formData = new FormData();
      formData.append("username", this.data.username);
      if(this.data.email)
      {
        formData.append("email", this.data.email);
      }
      if(this.data.password)
      {
        formData.append("password", this.data.password);
      }
      if(this.data.password_confirmation)
      {
        formData.append("password", this.data.password_confirmation);
      }
      if(this.selectedAvatar)
      {
        formData.append('avatar', this.selectedAvatar)
      }
      return formData;
    }
  }
});
