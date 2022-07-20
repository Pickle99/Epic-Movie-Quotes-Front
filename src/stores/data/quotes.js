import { defineStore } from "pinia";

export const useQuotesStore = defineStore("quotes", {
  state: () => {
    return {
      isModalOpen:false,
      text_en: "",
      text_ka: "",
    };
  },
  actions: {
    resetFields() {
      this.text_en = "";
      this.text_ka = "";
    },
  }
});
