import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useNavigate } from "react-router-dom";
import * as authSvc from "../services/auth";

export function Navbar({ onLogout }) {
  const currentUser = authSvc.getCurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;

  const navigate = useNavigate();

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div>
          <Button LinkComponent={Link} to="/tasks" color="inherit">
            React To Do
          </Button>
        </div>

        <div>
          {currentUser ? (
            <>
              <Typography variant="span" sx={{ marginRight: 2 }}>
                Welcome, {currentUser.name}
              </Typography>
              <Button onClick={onLogout} color="inherit">
                Log-out
              </Button>
              {!currentUser.isAdmin && (
                <IconButton onClick={handleMenu}>
                  <MoreVertIcon />
                </IconButton>
              )}
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => navigate("/register/admin")}>
                  Register as Admin
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button LinkComponent={Link} to="/login" color="inherit">
                Log-in
              </Button>

              <Button LinkComponent={Link} to="/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
