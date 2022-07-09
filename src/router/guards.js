import { getJwtToken } from "@/helpers/jwt/index.js";

export function Guest() {
  if (!getJwtToken()) {
    return "/forbidden";
  }
}

export function Authorized() {
  if (getJwtToken()) {
    return "/feed";
  }
}
