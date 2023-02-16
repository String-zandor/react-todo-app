import { Card, CardActions, IconButton, TextField } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useState } from "react";
import { TodoForm } from "./TodoForm";

export function AddTodo({ todo, onAddTodo }) {
  // const [title, setTitle] = useState(todo ? todo.title : "");

  // function handleChange({ target: input }) {
  //   setTitle(input.value);
  // }

  // function handleSubmit() {
  //   onAddTodo({ title });
  //   setTitle("");
  // }

  return (
    <Card variant="elevation">
      {/* <CardActions>
        <IconButton onClick={handleSubmit}>
          <AddTaskIcon />
        </IconButton>
        <TextField
          placeholder="Add a new task..."
          value={title}
          onChange={handleChange}
          size="small"
          fullWidth
        />
      </CardActions> */}
      <TodoForm todo={todo} onSubmit={onAddTodo} />
    </Card>
  );
}
