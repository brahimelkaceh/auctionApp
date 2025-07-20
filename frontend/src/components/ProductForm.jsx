// src/pages/products/ProductForm.jsx
import React from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  MenuItem,
  Button,
  Stack,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";

export default function ProductForm({
  initialValues,
  onSubmit,
  isEdit,
  isLoading,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};
        if (!values.libelle) errors.libelle = "Required";
        if (!values.prix) errors.prix = "Required";
        if (!values.image) errors.image = "Required";
        return errors;
      }}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <Stack spacing={2}>
            <TextField
              label="Libelle"
              name="libelle"
              value={values.libelle}
              onChange={handleChange}
              error={touched.libelle && Boolean(errors.libelle)}
              helperText={touched.libelle && errors.libelle}
              fullWidth
            />

            <TextField
              label="Prix"
              name="prix"
              type="number"
              value={values.prix}
              onChange={handleChange}
              error={touched.prix && Boolean(errors.prix)}
              helperText={touched.prix && errors.prix}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Statut</InputLabel>
              <Select
                name="statut"
                value={values.statut}
                onChange={handleChange}
                label="Statut"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Image URL"
              name="image"
              value={values.image}
              onChange={handleChange}
              error={touched.image && Boolean(errors.image)}
              helperText={touched.image && errors.image}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isEdit ? "Update" : "Create"} Product
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
