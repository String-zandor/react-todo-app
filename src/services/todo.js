import { http } from "./http";

export function fetchTodos() {
  return http.get("/tasks");
}

export function fetchAllTodos() {
  return http.get("/tasks/all");
}

export function updateTodo(todo) {
  return http.put(`/tasks/${todo.id}`, todo);
}

export function addTodo(newTodo) {
  return http.post("/tasks", newTodo);
}

export function deleteTodo(id) {
  return http.delete(`/tasks/${id}`);
}
