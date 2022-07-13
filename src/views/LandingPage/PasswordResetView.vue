<template>
  <blur-panel>
    <div class="text-center mb-7">
      <h1 class="text-white text-4xl mb-5">
        {{ $t("message.reset_password") }}
      </h1>
    </div>
    <Form v-slot="{ meta }" @submit="onSubmit()">
      <p class="text-red-500 mb-3">{{ data.error }}</p>
      <div>
        <password-input
          name="password"
          placeholder="message.password"
          rules="required|min:8|max:15"
          label-name="message.password"
        />
        <password-input
          name="password_confirmation"
          placeholder="message.confirm_password"
          rules="required|confirmed:@password" 
          label-name="message.confirm_password"
        />
      </div>

      <basic-button :is-disabled="!meta.valid">{{
        $t("message.reset_password")
      }}</basic-button>
    </Form>
  </blur-panel>
</template>
<script>
import BlurPanel from "@/components/Landing/BlurPanel.vue";
import { Form } from "vee-validate";
import PasswordInput from "@/components/UI/PasswordInput.vue";
import BasicButton from "@/components/UI/BasicButton.vue";
import axios from "@/config/axios/index.js";
import { mapWritableState } from "pinia";
import { useDataStore } from "@/stores/data/data.js";

export default {
  components: {
    BlurPanel,
    Form,
    PasswordInput,
    BasicButton,
  },
  computed: {
    ...mapWritableState(useDataStore, ["data"]),
  },
  methods: {
    onSubmit() {
      axios
        .post(`reset-password/${this.$route.params.token}`, {
          email: this.$route.params.email,
          token: this.$route.params.token,
          password: this.data.password,
          password_confirmation: this.data.password_confirmation,
        })
        .then(() => {
          this.$router.push({ name: "reset-success" });
        })
        .catch(() => {
          this.data.error =
            "Sorry, you already reset your password, your token is expired";
          setTimeout(() => {
            this.data.error = "";
            this.$router.push({ name: "login" });
          }, 2000);
        });
    },
  },
};
</script>
