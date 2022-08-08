import { getJwtToken } from "@/helpers/jwt/index.js";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
window.Pusher = Pusher;

const Broadcast = (window.Echo = new Echo({
  authEndpoint: import.meta.env.VITE_API_BASE_URL + "broadcasting/auth",
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_KEY,
  forceTLS: true,
  cluster: ["eu"],
  auth: {
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  },
}));

export default Broadcast;
