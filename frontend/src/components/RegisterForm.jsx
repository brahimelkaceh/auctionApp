import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const RegisterForm = () => {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      telephone: "",
      type: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) errors.username = "Required";
      if (!values.password) errors.password = "Required";
      if (values.password !== values.confirmPassword)
        errors.confirmPassword = "Passwords must match";
      if (!values.telephone) errors.telephone = "Required";
      if (!values.type) errors.type = "Required";
      return errors;
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const { ...userData } = values;
        await register(userData);
        window.location.href = "/login";
      } catch (err) {
        console.log(err);

        setErrors({ username: "Username already taken" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      component={Paper}
      elevation={3}
      maxWidth={"40%"}
      mx="auto"
      p={4}
      mt={5}
      borderRadius={2}
    >
      <Typography variant="h5" textAlign="center" mb={3}>
        Create an Account
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={!!formik.errors.username}
            helperText={formik.errors.username}
            fullWidth
          />

          <TextField
            label="Telephone"
            name="telephone"
            value={formik.values.telephone}
            onChange={formik.handleChange}
            error={!!formik.errors.telephone}
            helperText={formik.errors.telephone}
            fullWidth
          />

          <TextField
            select
            label="Type"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={!!formik.errors.type}
            helperText={formik.errors.type}
            fullWidth
          >
            <MenuItem value="buyer">Buyer</MenuItem>
            <MenuItem value="seller">Seller</MenuItem>
          </TextField>

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

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={!!formik.errors.confirmPassword}
            helperText={formik.errors.confirmPassword}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={formik.isSubmitting}
          >
            Register
          </Button>

          <Typography variant="body2" textAlign="center">
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterForm;
