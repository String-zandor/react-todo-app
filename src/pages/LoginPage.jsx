import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import * as authSvc from "../services/auth";

export function LoginPage({ onLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.currentTarget;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    onLogin(form.username, form.password);
  }

  return (
    <>
      <Grid
        container
        marginTop={9}
        justifyContent="center"
        width="40%"
        spacing={2}
      >
        <Card component="form" onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              label="Username"
              onChange={handleChange}
              name="username"
              helperText=" "
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              fullWidth
            />
          </CardContent>
          <CardActions>
            <Button type="submit" fullWidth>
              Log-in
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
