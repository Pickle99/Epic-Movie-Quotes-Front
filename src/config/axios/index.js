import axios from "axios";
import { getJwtToken } from "@/helpers/jwt/index.js";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 3500,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: "Bearer " + getJwtToken(),
  },
});

export default axiosInstance;
