import React from "react";
import AddProduct from "../components/AddProduct";
import {
  Typography,
  Box,
  Alert,
  CircularProgress,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import { useCreateProduct } from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const mutation = useCreateProduct();
  const navigate = useNavigate();

  return (
    <Box maxWidth={600} mx="auto" mt={5}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Stack
          direction={"row"}
          gap={1}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={4}
        >
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
            Add New Product
          </Typography>
        </Stack>

        {mutation.isLoading && (
          <CircularProgress sx={{ display: "block", mx: "auto", mb: 2 }} />
        )}
        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {mutation.error?.response?.data?.message ||
              "Failed to add product."}
          </Alert>
        )}
        {mutation.isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Product added successfully!
          </Alert>
        )}
        <AddProduct onSubmit={mutation.mutate} isLoading={mutation.isLoading} />
      </Paper>
    </Box>
  );
};

export default AddProductPage;
