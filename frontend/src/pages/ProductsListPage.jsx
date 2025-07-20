import React from "react";
import { useProducts } from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Stack,
  Button,
  Paper,
  Box,
} from "@mui/material";

export default function ProductsListPage() {
  const { data, isLoading } = useProducts();
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;

  return (
    <Box px={4}>
      <Stack spacing={2}>
        <Typography variant="h4">Browse Products</Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Libelle</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.libelle}</TableCell>
                  <TableCell>{product.prix}</TableCell>
                  <TableCell>{product.statut}</TableCell>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.libelle}
                      width={60}
                      height={40}
                      style={{ objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      View & Bid
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Stack>
    </Box>
  );
}
