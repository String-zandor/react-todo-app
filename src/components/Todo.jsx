import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { TodoForm } from "./TodoForm";

export function Task({ todo, onTodoUpdate, onDeleteTodo }) {
  const [showActions, setShowActions] = useState(false);
  const [editing, setEditing] = useState(false);
  const actions = (
    <div className="actions">
      <IconButton onClick={() => setEditing(true)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDeleteTodo(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
  function handleCloseForm() {
    setEditing(false);
  }
  function handleCheck() {
    const todoUpdate = { ...todo, completed: !todo.completed };
    onTodoUpdate(todoUpdate);
  }

  return (
    <Card
      variant="outlined"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {editing ? (
        <TodoForm
          todo={todo}
          onSubmit={onTodoUpdate}
          onCloseForm={handleCloseForm}
        />
      ) : (
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>
            <IconButton onClick={handleCheck}>
              {todo.completed ? (
                <CheckCircleOutlineIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </IconButton>
            <Typography component="span">
              {todo.completed ? <del>{todo.title}</del> : todo.title}
            </Typography>
          </div>
          {showActions && actions}
        </CardActions>
      )}
    </Card>
  );
}
