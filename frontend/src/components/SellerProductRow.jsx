import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useBidsForProduit } from "../hooks/useEnchere";
import { getBidCount, getHighestBid } from "../services/auctionService";

const SellerProductRow = ({ products, onEdit, onDelete }) => (
  <>
    <Typography variant="h6" mb={2}>
      Your Products
    </Typography>
    <Paper sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Libelle</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Bids</TableCell>
            <TableCell>Highest Bid</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  </>
);

function ProductRow({ product, onEdit, onDelete }) {
  const { data: bidsData } = useBidsForProduit(product.id);
  const bids = bidsData?.data || [];
  const bidCount = getBidCount(bids);
  const highestBid = getHighestBid(bids);
  return (
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
      <TableCell>{bidCount}</TableCell>
      <TableCell>{highestBid !== null ? `${highestBid} DH` : "-"}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(product)} aria-label="Edit">
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(product.id)} aria-label="Delete">
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default SellerProductRow;
