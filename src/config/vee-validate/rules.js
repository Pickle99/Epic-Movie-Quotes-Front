import { defineRule } from "vee-validate"; // npm install vee-validate --save
import { required, email, min, max, confirmed } from "@vee-validate/rules"; // npm install @vee-validate/rules

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);
