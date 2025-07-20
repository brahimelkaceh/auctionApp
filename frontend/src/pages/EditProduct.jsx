// src/pages/products/EditProduct.jsx
import React from "react";

import ProductForm from "../components/ProductForm";
import { useUpdateProduct } from "../hooks/useProduct";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function EditProductPage() {
  const { state } = useLocation();
  const product = state;
  const navigate = useNavigate();

  const mutation = useUpdateProduct();

  return (
    <Box maxWidth={600} mx="auto" mt={5}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Stack direction={"row"} gap={1} alignItems={"center"} mb={4}>
          {" "}
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Typography variant="h4" textAlign="center">
            Update Product {product.libelle}
          </Typography>
        </Stack>
        {mutation.isLoading && (
          <CircularProgress sx={{ display: "block", mx: "auto", mb: 2 }} />
        )}
        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {mutation.error?.response?.data?.message ||
              "Failed to update product."}
          </Alert>
        )}
        {mutation.isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Product updated successfully!
          </Alert>
        )}
        <ProductForm
          isEdit
          initialValues={{
            libelle: product.libelle || "",
            prix: product.prix || "",
            statut: product.statut || "active",
            image: product.image || "",
          }}
          onSubmit={(values) =>
            mutation.mutate({ id: product.id, data: values })
          }
        />{" "}
      </Paper>
    </Box>
  );
}
