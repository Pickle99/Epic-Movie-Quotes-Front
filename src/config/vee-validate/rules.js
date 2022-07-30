import { defineRule } from "vee-validate";
import { required, email, min, max, confirmed } from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);

defineRule("alpha_lower", (value, _, name) => {
  if (!(/^[A-Za-z0-9]+$/.test(value) && value === value.toLowerCase())) {
    return `${name.field} must contain only lower case chars and must be English`;
  }
  return true;
});

defineRule("geo", (value) => {
  if (!(/^[ა-ჰ ]+$/.test(value))) {
    return `This field must contain only Georgian letters`;
  }
  return true;
});

defineRule("eng", (value) => {
  if (!(/^[A-Za-z ]+$/.test(value))) {
    return `This field must contain only English letters`;
  }
  return true;
});