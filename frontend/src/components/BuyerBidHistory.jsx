import React from "react";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from "@mui/material";
import { useBidsForclient } from "../hooks/useEnchere";

const BuyerBidHistory = ({ userId }) => {
  const { data, isLoading } = useBidsForclient(userId);
  if (isLoading) return <CircularProgress />;
  const bids = data || [];
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>Your Bid History</Typography>
      {bids?.data?.length === 0 ? (
        <Typography>You have not placed any bids yet.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Bid Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bids?.data?.map((bid, idx) => (
              <TableRow key={idx}>
                <TableCell>{new Date(bid.date).toLocaleString()}</TableCell>
                <TableCell>{bid.produit?.libelle || "-"}</TableCell>
                <TableCell>{bid.prix} DH</TableCell>
                <TableCell>{bid.produit?.statut || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default BuyerBidHistory; 