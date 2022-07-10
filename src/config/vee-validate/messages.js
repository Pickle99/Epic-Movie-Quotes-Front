import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    en: {
      names: {
        username: "Name",
        email: "Email",
        password: "Password",
        password_confirmation: "Password Confirmation",
        user: "User",
        forgot_password: "Forgot Password",
        title_eng: "Movie name",
        director_eng: "Director",
        description_eng: "Movie description",
        image: "Image",
        title_ka: "Movie name",
        director_ka: "Director",
        description_ka: "Movie description",
      },
      messages: {
        required: "{field} field is required",
        min: "{field} must contain at least 0:{min} symbols",
        max: "{field} can contain maximum of 0:{max} symbols",
        email: "{field} field must be email format",
        confirmed: "Passwords don't match",
      },
    },
    ka: {
      names: {
        username: "სახელი",
        email: "მეილი",
        password: "პაროლი",
        password_confirmation: "გაიმეორეთ პაროლი",
        user: "მომხმარებელი",
        forgot_password: "პარლის აღდგენა",
        title_ka: "ფილმის სახელი",
        director_ka: "რეჟისორი",
        description_ka: "აღწერა",
        image: "სურათი",
        title_eng: "ფილმის სახელი",
        director_eng: "რეჟისორი",
        description_eng: "ფილმის აღწერი",
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
