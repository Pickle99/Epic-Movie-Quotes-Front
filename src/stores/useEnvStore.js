import { defineStore } from "pinia";

export const useEnvStore = defineStore("environment", {
  state: () => {
    return {
    back_url: import.meta.env.VITE_IMAGES_URL,
    }
  }
});