import { getJwtToken } from "@/helpers/jwt/index.js";

export function isAuthenticated() {
  if (!getJwtToken()) {
    return "/forbidden";
  }
}

export function Authenticated() {
  if (getJwtToken()) {
    return "/forbidden";
  }
}
