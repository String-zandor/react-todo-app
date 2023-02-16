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
import { Task } from "./Task";
import { width } from "@mui/system";

export function CompletedTasks({ tasks }) {
  const [open, setOpen] = useState(false);

  return (
    <List sx={{ justifyContent: "start" }}>
      <ListItemButton onClick={() => setOpen(!open)}>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <ListItemText primary="Completed" />
      </ListItemButton>
      <Collapse in={open} unmountOnExit>
        <Grid container spacing={1}>
          {tasks &&
            tasks.map((task) => (
              <Grid item key={task.id} width="100%">
                <Task task={task} />
              </Grid>
            ))}
        </Grid>
      </Collapse>
    </List>
  );
}
