import React from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await login(values);
        window.location.href = "/dashboard";
      } catch {
        setErrors({ password: "Invalid username or password" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      component={Paper}
      elevation={3}
      maxWidth={400}
      mx="auto"
      p={4}
      mt={8}
      borderRadius={2}
    >
      <Typography variant="h5" textAlign="center" mb={3}>
        Login
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={!!formik.errors.password}
            helperText={formik.errors.password}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}
            fullWidth
          >
            Login
          </Button>

          <Typography variant="body2" textAlign="center">
            Don't have an account? <Link to="/register">Register here</Link>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
