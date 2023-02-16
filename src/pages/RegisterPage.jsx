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

export function RegisterPage({ onRegister }) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const schema = Joi.object({
    name: Joi.string().required(),
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
    onRegister({
      name: form.name,
      username: form.username,
      password: form.password,
    });
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
          <h3>REGISTER</h3>
        </Grid>
        <Card component="form" onSubmit={handleSubmit}>
          <CardContent>
            <TextField
              label="Name"
              onChange={handleChange}
              name="name"
              error={!!errors.name}
              helperText={errors.name || " "}
              fullWidth
            />
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
              Register
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
