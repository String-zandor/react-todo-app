import { Grid } from "@mui/material";
import { CompletedTodos } from "../components/CompletedTodos";
import { PendingTodos } from "../components/PendingTodos";
import { AddTodo } from "../components/AddTodo";

export function TodosPage({ todos, onTodoUpdate, onAddTodo, onDeleteTodo }) {
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
          <AddTodo onAddTodo={onAddTodo} />
        </Grid>
      </Grid>
      <Grid item width="100%">
        <PendingTodos
          todos={todos && todos.filter((todo) => !todo.completed)}
          onTodoUpdate={onTodoUpdate}
          onDeleteTodo={onDeleteTodo}
        />
      </Grid>
      <Grid item width="100%">
        <CompletedTodos
          todos={todos && todos.filter((todo) => todo.completed)}
          onTodoUpdate={onTodoUpdate}
          onDeleteTodo={onDeleteTodo}
        />
      </Grid>
    </Grid>
  );
}
