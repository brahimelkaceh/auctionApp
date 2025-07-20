import React from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress, Typography, Box, Paper } from "@mui/material";
import BidSection from "../components/BidSection";
import dayjs from "dayjs";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useProduct(id);
  const { auth } = useAuth();

  if (isLoading) return <CircularProgress />;
  const product = data?.data;
  if (!product) return <Typography>Product not found.</Typography>;

  // Auction expiry logic
  const createdAt = product.createdAt ? dayjs(product.createdAt) : null;
  const expiryDate = createdAt ? createdAt.add(3, "day") : null;
  const now = dayjs();
  const isExpired = expiryDate && now.isAfter(expiryDate);
  const timeLeft = expiryDate && !isExpired ? expiryDate.diff(now) : 0;

  function formatDuration(ms) {
    if (ms <= 0) return "Expired";
    const d = dayjs.duration(ms);
    const days = Math.floor(d.asDays());
    const hours = d.hours();
    const minutes = d.minutes();
    const seconds = d.seconds();
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <Box px={4}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4">{product.libelle}</Typography>
        <Typography variant="subtitle1">
          Prix initial: {product.prix} DH
        </Typography>
        <Typography variant="subtitle2">Statut: {product.statut}</Typography>
        {product.image && (
          <img
            src={product.image}
            alt={product.libelle}
            width={200}
            style={{ objectFit: "cover", marginTop: 16 }}
          />
        )}
        {createdAt && (
          <Typography
            variant="body2"
            color={isExpired ? "error" : "primary"}
            mt={2}
          >
            Auction {isExpired ? "expired" : "expires in"}:{" "}
            {isExpired
              ? expiryDate.format("YYYY-MM-DD HH:mm")
              : formatDuration(timeLeft)}
          </Typography>
        )}
      </Paper>
      <BidSection
        produitId={id}
        userId={auth?.id}
        disabled={isExpired}
        initialPrice={product.prix}
      />
    </Box>
  );
}
