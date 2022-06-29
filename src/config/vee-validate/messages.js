import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    en: {
      names: {
        username: "Name",
        email: "Email",
        password: "Password",
        password_confirm: "Password Confirmation",
      },
      messages: {
        required: "The {field} field is required",
        min: "The {field} must contain at least 0:{min} symbols",
        max: "The {field} can contain maximum of 0:{max} symbols",
        email: "The {field} field must be email format",
        confirmed: "Passwords don't match",
      },
    },
    ka: {
      names: {
        username: "სახელი",
        email: "მეილი",
        password: "პაროლი",
        password_confirm: "Password confirmation",
      },
      messages: {
        required: "{field}ს ველი სავალდებულოა",
        min: "{field}ს ველი უნდა შედგებოდეს მინიმუმ 0:{min} სიმბოლოსგან",
        max: "{field}ს ველი უნდა შედგებოდეს მაქსიმუმ 0:{max} სიმბოლოსგან",
        email: "თქვენ მიერ შეყვანილი {field} არასწორია",
        confirmed: "პაროლები არ ემთხვევა",
      },
    },
  }),
});
