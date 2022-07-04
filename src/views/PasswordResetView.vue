<template>
  <blur-panel>
    <div class="text-center mb-7">
      <h1 class="text-white text-4xl mb-5">
        {{ $t("message.reset_password") }}
      </h1>
    </div>
    <Form v-slot="{ meta }" @submit="onSubmit()">
      <div>
        <password-input
          name="password"
          placeholder="message.password"
          rules="required|min:8|max:15"
          labelName="message.password"
          :type="PasswordType"
          :click="setPasswordFieldType"
        />
        <password-input
          name="password_confirmation"
          placeholder="message.confirm_password"
          rules="required|confirmed:@password"
          labelName="message.confirm_password"
          :type="PasswordConfirmationType"
          :click="setPasswordConfirmationFieldType"
        />
      </div>
      <div class="flex justify-center flex-col">
        <button
          :class="
            !meta.valid
              ? 'text-white bg-[#E31221] py-2 rounded-md opacity-50 mt-5'
              : 'opacity-100 text-white bg-[#E31221] py-2 rounded-md mt-5'
          "
          :disabled="!meta.valid"
        >
          {{ $t("message.reset_password") }}
        </button>
      </div>
    </Form>
  </blur-panel>
</template>
<script>
import BlurPanel from "@/components/BlurPanel.vue";
import { Form } from "vee-validate";
import BasicInput from "@/components/UI/BasicInput.vue";
import PasswordInput from "@/components/UI/PasswordInput.vue";
import axios from "@/config/axios/index.js";
import { mapWritableState, mapActions, mapGetters } from "pinia";
import { useDataStore } from "@/stores/data/data.js";

export default {
  components: {
    BlurPanel,
    Form,
    BasicInput,
    PasswordInput,
  },
  computed: {
    ...mapWritableState(useDataStore, ["data"]),
    ...mapGetters(useDataStore, ["PasswordType", "PasswordConfirmationType"]),
  },
  methods: {
    ...mapActions(useDataStore, [
      "setPasswordFieldType",
      "setPasswordConfirmationFieldType",
    ]),
    onSubmit() {
      axios.post(`reset-password/${this.$route.params.token}`, {
        email: this.$route.params.email,
        token: this.$route.params.token,
        password: this.data.password,
        password_confirmation: this.data.password_confirmation,
      });
      this.$router.push({ name: "reset-success" });
    },
  },
};
</script>
