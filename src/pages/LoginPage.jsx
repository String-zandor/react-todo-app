import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import Joi from "joi";
import { useState } from "react";

export function LoginPage({ onLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.currentTarget;

    const { error } = schema.extract(name).label(name).validate(value);
    if (error) {
      setErrors({ ...errors, [name]: error.message });
    } else {
      delete errors[name];
      setErrors(errors);
    }

    setForm({ ...form, [name]: value });
  }

  function isFormInvalid() {
    const { error } = schema.validate(form);
    return !!error;
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
        <Grid item>
          <h3>LOG-IN</h3>
        </Grid>
        <Card component="form" onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              label="Username"
              onChange={handleChange}
              name="username"
              error={!!errors.username}
              helperText={errors.username || " "}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || " "}
              fullWidth
            />
          </CardContent>
          <CardActions>
            <Button type="submit" fullWidth disabled={isFormInvalid()}>
              Log-in
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
