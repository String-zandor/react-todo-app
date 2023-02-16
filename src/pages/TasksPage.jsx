import { Grid } from "@mui/material";
import { CompletedTasks } from "../components/CompletedTasks";
import { PendingTasks } from "../components/PendingTasks";
import { TaskForm } from "../components/TaskForm";

export function TasksPage({ tasks, onTaskUpdate, onAddTask }) {
  return (
    <Grid
      container
      marginTop={9}
      justifyContent="center"
      width="40%"
      spacing={2}
    >
      <Grid item width="100%">
        <Grid item width="100%">
          <TaskForm onAddTask={onAddTask} />
        </Grid>
      </Grid>
      <Grid item>
        <PendingTasks
          tasks={tasks && tasks.filter((task) => !task.completed)}
          onTaskUpdate={onTaskUpdate}
        />
      </Grid>
      <Grid item width="100%">
        <CompletedTasks
          tasks={tasks && tasks.filter((task) => task.completed)}
          onTaskUpdate={onTaskUpdate}
        />
      </Grid>
    </Grid>
  );
}
