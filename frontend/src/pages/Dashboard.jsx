import React from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProducts, useDeleteProduct } from "../hooks/useProduct";
import SellerProductRow from "../components/SellerProductRow";
import BuyerBidHistory from "../components/BuyerBidHistory";

const Dashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Fetch all products
  const { data: productsData } = useProducts();
  const products = productsData?.data || [];
  const mutation = useDeleteProduct();

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleBrowseProducts = () => {
    navigate("/products");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      mutation.mutate(id);
    }
  };

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {auth?.username}!
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          {auth?.type === "seller" && (
            <Button variant="contained" onClick={handleAddProduct}>
              Add New Product
            </Button>
          )}
          {auth?.type === "buyer" && (
            <Button variant="contained" onClick={handleBrowseProducts}>
              Browse Products
            </Button>
          )}
        </Stack>
      </Paper>
      <Box mt={4}>
        {auth?.type === "seller" && (
          <SellerProductRow
            products={products}
            onEdit={(p) => navigate(`/products/${p.id}/edit`, { state: p })}
            onDelete={handleDelete}
          />
        )}
        {auth?.type === "buyer" && <BuyerBidHistory userId={auth.id} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
