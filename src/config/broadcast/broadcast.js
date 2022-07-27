import { getJwtToken } from "@/helpers/jwt/index.js";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;




const Broadcast = window.Echo = new Echo({
  authEndpoint: "http://localhost:8000/api/broadcasting/auth",
  broadcaster: "pusher",
  key: '925b3e9ebffdef5e1e1d',
  wsHost: "localhost",
  wsPort: 443,
  forceTLS: true,
  cluster: ["eu"],
  auth: {
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  },
});

export default Broadcast;