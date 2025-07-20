import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useBidsForProduit, usePlaceBid } from "../hooks/useEnchere";

const BidSection = ({ produitId, userId, disabled, initialPrice }) => {
  const { data, isLoading, isError, error } = useBidsForProduit(produitId);
  const {
    mutate,
    isPending,
    isError: isSubmitError,
    error: submitError,
  } = usePlaceBid();

  // Determine the last bid amount or use initial price
  const lastBid = data?.data && data.data.length > 0 ? data.data[0] : null;
  const previousAmount = lastBid ? lastBid.prix : Number(initialPrice);
  const requiredAmount = previousAmount
    ? (previousAmount * 1.1).toFixed(2)
    : "";

  console.log(requiredAmount, (previousAmount * 1.1).toFixed(2));

  const formik = useFormik({
    initialValues: {
      montant: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.montant) {
        errors.montant = "Montant requis";
      } else if (Number(values.montant) !== Number(requiredAmount)) {
        errors.montant = `Le montant doit être exactement 10% supérieur à la dernière enchère (${requiredAmount} DH)`;
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      mutate(
        {
          prix: Number(values.montant),
          produit: { id: Number(produitId) },
          client: { id: userId },
        },
        {
          onSuccess: () => resetForm(),
        }
      );
    },
  });

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Historique des enchères
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Alert severity="error">{error.message}</Alert>
      ) : data?.data.length === 0 ? (
        <Typography>Aucune enchère pour ce produit.</Typography>
      ) : (
        <Table size="small" sx={{ mb: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Acheteur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((enchere, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(enchere.date).toLocaleString()}</TableCell>
                <TableCell>{enchere.prix} DH</TableCell>
                <TableCell>{enchere.client?.username || "Anonyme"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Placer une nouvelle enchère
      </Typography>

      {disabled ? (
        <Alert severity="warning">Auction expired. Bidding is closed.</Alert>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              name="montant"
              label={`Montant (exact: ${requiredAmount} DH)`}
              variant="outlined"
              size="small"
              type="number"
              value={formik.values.montant}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.montant && Boolean(formik.errors.montant)}
              helperText={formik.touched.montant && formik.errors.montant}
            />

            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? "En cours..." : "Placer une enchère"}
            </Button>
          </Stack>

          {isSubmitError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {submitError?.response?.data || "Une erreur est survenue"}
            </Alert>
          )}
        </form>
      )}
    </Paper>
  );
};

export default BidSection;
