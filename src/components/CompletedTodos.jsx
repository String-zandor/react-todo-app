import {
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Task } from "./Todo";

export function CompletedTodos({ todos, onTodoUpdate, onDeleteTodo }) {
  const [open, setOpen] = useState(false);

  return (
    <List sx={{ justifyContent: "start" }}>
      <ListItemButton onClick={() => setOpen(!open)}>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <ListItemText primary={`Completed (${todos ? todos.length : 0})`} />
      </ListItemButton>
      <Collapse in={open} unmountOnExit>
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
      </Collapse>
    </List>
  );
}
