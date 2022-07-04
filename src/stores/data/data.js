import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => {
    return {
      data: {
        username: "",
        user: "",
        email: "",
        password: "",
        password_confirmation: "",
        forgot_password: "",
        error: "",
      },
      isPasswordVisible: false,
    };
  },
  getters: {
    PasswordType(state) {
      if (state.isPasswordVisible === true) {
        return "text";
      }
      if (state.isPasswordVisible === false) {
        return "password";
      }
    },
  },
  actions: {
    updateField(state, payload) {
      this.data[state] = payload;
    },
    setPasswordFieldType() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },
});
