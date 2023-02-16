import { http } from "./http";

export function register(userDetails) {
  return http.post("/users", userDetails);
}

export function makeAdmin(id, isAdmin) {
  return http.put(`/users/${id}`, { isAdmin });
}
