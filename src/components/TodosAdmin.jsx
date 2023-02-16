import {
  Divider,
  List,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

export function TodosAdmin({ todos, completed }) {
  return (
    <List
      subheader={
        <ListSubheader>
          {completed ? "Completed Tasks" : "Pending Tasks"}
        </ListSubheader>
      }
    >
      {todos &&
        todos.map((todo) => (
          <Fragment key={todo.id}>
            <ListItemText
              primary={todo.title}
              secondary={`ID: ${todo.id} | User ID: ${todo.userId}`}
            />
            <Divider />
          </Fragment>
        ))}
    </List>
  );
}
