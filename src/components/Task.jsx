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

export function Task({ task, onTaskUpdate }) {
  const [showActions, setShowActions] = useState(false);
  const actions = (
    <div className="actions">
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </div>
  );
  function handleCheck() {
    const updatedTask = { ...task, completed: !task.completed };
    onTaskUpdate(updatedTask);
  }

  return (
    <Card
      variant="outlined"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <CardActions sx={{ justifyContent: "space-between" }}>
        <div>
          <IconButton onClick={handleCheck}>
            {task.completed ? (
              <CheckCircleOutlineIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </IconButton>
          <Typography component="span">
            {task.completed ? <del>{task.title}</del> : task.title}
          </Typography>
        </div>
        {showActions && actions}
      </CardActions>
    </Card>
  );
}
