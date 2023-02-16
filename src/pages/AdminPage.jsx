import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import * as todoSvc from "../services/todo";
import { TodosAdmin } from "../components/TodosAdmin";

export function AdminPage({ todos }) {
  return (
    <Grid
      container
      width="80%"
      marginTop={9}
      justifyContent="center"
      spacing={2}
    >
      <Grid item width="50%">
        <TodosAdmin
          todos={todos && todos.filter((todo) => !todo.completed)}
          completed={false}
        />
      </Grid>
      <Grid item width="50%">
        <TodosAdmin
          todos={todos && todos.filter((todo) => todo.completed)}
          completed={true}
        />
      </Grid>
    </Grid>
  );
}
