import { getJwtToken } from "@/helpers/jwt/index.js";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
window.Pusher = Pusher;

const Broadcast = (window.Echo = new Echo({
  authEndpoint: import.meta.env.VITE_API_BASE_URL+"broadcasting/auth",
  broadcaster: "pusher",
  key: "925b3e9ebffdef5e1e1d",
  forceTLS: true,
  cluster: ["eu"],
  auth: {
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  },
}));

export default Broadcast;
