import jwtDecode from "jwt-decode";
import { http } from "./http";

export function login(username, password) {
  return http.post("/auth", { username, password });
}

export function getCurrentUser() {
  const accessToken = localStorage.getItem("JWT");
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    return decoded;
  }
  return null;
}
