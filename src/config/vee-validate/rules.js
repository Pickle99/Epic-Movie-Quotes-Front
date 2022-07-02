import { defineRule } from "vee-validate"; // npm install vee-validate --save
import { required, email, min, max, confirmed } from "@vee-validate/rules"; // npm install @vee-validate/rules

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);

defineRule("alpha_lower", (value, _, name) => {
  if (!(/^[A-Za-z0-9]+$/.test(value) && value === value.toLowerCase())) {
    return `${name.field} must contain only lower case chars and must be english`;
  }
  return true;
});
