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
import { useNavigate } from "react-router-dom";
import * as authSvc from "../services/auth";
import * as userSvc from "../services/user";

export function RegisterAdminPage({ onRegisterAdmin }) {
  const currentUser = authSvc.getCurrentUser();
  const [form, setForm] = useState({
    username: "",
  });

  const schema = Joi.object({
    username: Joi.string().required(),
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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
    onRegisterAdmin(form.username);
  }

  return (
    <>
      <Grid
        container
        marginTop={9}
        justifyContent="center"
        width="40%"
        spacing={1}
      >
        <Grid item>
          <h3>REGISTER AS ADMIN</h3>
        </Grid>
        <Card component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <CardContent>
            <TextField
              label="Username"
              onChange={handleChange}
              name="username"
              error={!!errors.username}
              helperText={errors.username || " "}
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
