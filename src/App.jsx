import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Task } from "./components/Task";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";
import * as authSvc from "./services/auth";
import * as taskSvc from "./services/task";

function App() {
  const [tasks, setTasks] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    taskSvc.fetchTasks().then(({ data: tasks }) => setTasks(tasks));
  }, []);

  async function handleAddTask({ title }) {
    console.log(title);
    const user = authSvc.getCurrentUser();
    console.log(user);
    const res = await taskSvc.addTask({ title, user });
    console.log(res);
  }

  function handleTaskUpdate(task) {
    // taskSvc.updateTask(task.id).then(({ data: task }) => console.log(task));
    const updatedTasks = tasks.map((t) => {
      return t.id === task.id ? { ...t, ...task } : t;
    });
    setTasks(updatedTasks);
  }

  async function handleLogin(username, password) {
    const res = await authSvc.login(username, password);
    localStorage.setItem("JWT", res.data.accessToken);
    setAuthToken(res.data.accessToken);
    navigate("/");
  }

  function handleLogout() {
    localStorage.removeItem("JWT");
    setAuthToken(null);
    navigate("/login");
  }

  return (
    <Grid container justifyContent="center">
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route index element={<Navigate to="/tasks" />} />
        <Route
          path="/tasks"
          element={
            <TasksPage
              tasks={tasks}
              onTaskUpdate={handleTaskUpdate}
              onAddTask={handleAddTask}
            />
          }
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<></>} />
      </Routes>
    </Grid>
  );
}

export default App;
