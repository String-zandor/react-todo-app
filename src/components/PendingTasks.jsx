import { Grid } from "@mui/material";
import { Task } from "./Task";

export function PendingTasks({ tasks, onTaskUpdate }) {
  return (
    <Grid container spacing={1}>
      {tasks &&
        tasks.map((task) => (
          <Grid item key={task.id} width="100%">
            <Task task={task} onTaskUpdate={onTaskUpdate} />
          </Grid>
        ))}
    </Grid>
  );
}
