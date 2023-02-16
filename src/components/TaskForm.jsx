import { Card, CardActions, IconButton, TextField } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useState } from "react";

export function TaskForm({ task, onAddTask }) {
  const [title, setTitle] = useState(task ? task.title : "");

  function handleChange({ target: input }) {
    setTitle(input.value);
  }

  function handleSubmit() {
    onAddTask({ title });
  }

  return (
    <Card variant="elevation">
      <CardActions>
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
      </CardActions>
    </Card>
  );
}
