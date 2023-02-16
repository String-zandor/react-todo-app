import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div>
          <Button LinkComponent={Link} to="/tasks" color="inherit">
            React To Do
          </Button>
        </div>
        <div>
          <Button LinkComponent={Link} to="/login" color="inherit">
            Log-in
          </Button>

          <Button LinkComponent={Link} to="/register" color="inherit">
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
