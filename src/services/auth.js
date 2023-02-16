import jwtDecode from "jwt-decode";
import { http } from "./http";

export function register(username, password) {
  return http.post("/users", { username, password });
}

export function login(username, password) {
  return http.post("/auth", { username, password });
}

export function getCurrentUser() {
  const accessToken = localStorage.getItem("JWT");
  console.log(accessToken);
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    console.log(decoded);
    return decoded;
  }
  return null;
}
