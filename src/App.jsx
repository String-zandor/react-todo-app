import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { RegisterAdminPage } from "./pages/RegisterAdminPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TodosPage } from "./pages/TodosPage";
import * as authSvc from "./services/auth";
import * as todoSvc from "./services/todo";
import * as userSvc from "./services/user";
import { AdminPage } from "./pages/AdminPage";

function App() {
  const [todos, setTodos] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const currentUser = authSvc.getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      if (currentUser && currentUser.isAdmin) {
        todoSvc.fetchAllTodos().then(({ data: allTodos }) => {
          setTodos(allTodos);
        });
      } else {
        todoSvc.fetchTodos().then(({ data: todos }) => {
          setTodos(todos);
        });
      }
    }
    return () => {
      setTodos(null);
    };
  }, [authToken]);

  async function handleAddTodo({ title }) {
    const { data: todo } = await todoSvc.addTodo({ title });
    const nextTodos = todos.slice();
    nextTodos.splice(0, 0, todo);
    setTodos(nextTodos);
  }

  async function handleTodoUpdate(todo) {
    const { data: updateTodo } = await todoSvc.updateTodo(todo);
    const nextTodos = todos.map((t) => {
      return t.id === updateTodo.id ? { ...t, ...updateTodo } : t;
    });
    setTodos(nextTodos);
  }

  async function handleDeleteTodo(id) {
    const { data: todo } = await todoSvc.deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== todo.id));
  }

  async function handleLogin(username, password) {
    try {
      const res = await authSvc.login(username, password);
      localStorage.setItem("JWT", res.data.accessToken);
      setAuthToken(res.data.accessToken);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem("JWT");
    setAuthToken(null);
    navigate("/login");
  }

  async function handleRegister(userDetails) {
    await userSvc.register(userDetails);
    navigate("/login");
  }

  async function handleRegisterAdmin(username) {
    if (username === currentUser.username) {
      const res = await userSvc.makeAdmin(currentUser.sub, true);
      handleLogout();
    } else {
      alert("Invalid username");
    }
  }

  return (
    <Grid container justifyContent="center">
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route index element={<Navigate to="/tasks" />} />
        <Route
          path="/tasks"
          element={
            !authToken ? (
              <Navigate to="/login" />
            ) : currentUser.isAdmin ? (
              <Navigate to="/admin" />
            ) : (
              <TodosPage
                todos={todos}
                onTodoUpdate={handleTodoUpdate}
                onAddTodo={handleAddTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            )
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<RegisterPage onRegister={handleRegister} />}
        />
        <Route
          path="/register/admin"
          element={
            authToken ? (
              <RegisterAdminPage onRegisterAdmin={handleRegisterAdmin} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            currentUser && currentUser.isAdmin ? (
              <AdminPage todos={todos} />
            ) : (
              <Navigate to="/tasks" />
            )
          }
        />
      </Routes>
    </Grid>
  );
}

export default App;
