import { http } from "./http";

export function fetchTasks() {
  return http.get("/tasks");
}

// export function updateTask(task) {
//   return http.put(`/tasks/${task.id}`, task);
// }

export function addTask({ title, user }) {
  return http.post("/tasks", { title, user });
}
