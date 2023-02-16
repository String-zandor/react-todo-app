import { Button, CardActions, TextField } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { Box } from "@mui/system";
import Joi from "joi";

export function TodoForm({ todo, onSubmit, onCloseForm }) {
  const editing = !!todo;
  const [title, setTitle] = useState(editing ? todo.title : "");

  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });
  const [errors, setErrors] = useState({});

  function handleChange({ target: input }) {
    const { error } = schema
      .extract(input.name)
      .label(input.name)
      .validate(input.value);
    if (error) {
      setErrors({ title: error.message });
    } else {
      setErrors({});
    }
    setTitle(input.value);
  }

  function isFormInvalid() {
    const { error } = schema.validate({ title });
    return !!error;
  }

  function handleSubmit() {
    if (editing) {
      onSubmit({ ...todo, title });
      onCloseForm();
    } else {
      onSubmit({ title });
      setTitle("");
    }
  }

  return (
    <CardActions>
      <Box sx={{ marginLeft: 1, marginRight: 0.5 }}>
        {editing ? (
          <EditIcon color="primary" />
        ) : (
          <AddTaskIcon color="primary" />
        )}
      </Box>
      <TextField
        placeholder={editing ? todo.title : "Add a new task..."}
        value={title}
        name="title"
        onChange={handleChange}
        size="small"
        error={!!errors.title}
        helperText={errors.title || " "}
        fullWidth
        sx={{ marginTop: 3 }}
      />
      <Button size="small" onClick={handleSubmit} disabled={isFormInvalid()}>
        {editing ? "Save" : "Add"}
      </Button>
    </CardActions>
  );
}
