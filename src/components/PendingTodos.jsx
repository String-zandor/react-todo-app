import { Grid } from "@mui/material";
import { Task } from "./Todo";

export function PendingTodos({ todos, onTodoUpdate, onDeleteTodo }) {
  return (
    <Grid container spacing={1}>
      {todos &&
        todos.map((todo) => (
          <Grid item key={todo.id} width="100%">
            <Task
              todo={todo}
              onTodoUpdate={onTodoUpdate}
              onDeleteTodo={onDeleteTodo}
            />
          </Grid>
        ))}
    </Grid>
  );
}
