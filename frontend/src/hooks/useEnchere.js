// hooks/useEnchere.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/auctionApi"; // adjust path if different

// Fetch bids for a specific product
export const useBidsForProduit = (produitId) =>
  useQuery({
    queryKey: ["encheres", produitId],
    queryFn: () => api.getBidsForProduit(produitId),
    enabled: !!produitId, // only run if produitId exists
    refetchOnWindowFocus: false,
    retry: false,
  });
export const useBidsForclient = (clientId) =>
  useQuery({
    queryKey: ["encheres", clientId],
    queryFn: () => api.getBidsForClient(clientId),
    enabled: !!clientId, // only run if produitId exists
    refetchOnWindowFocus: false,
    retry: false,
  });

// Place a new bid
export const usePlaceBid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.placeBid,
    onSuccess: (data, variables) => {
      // Invalidate bids of the related product
      queryClient.invalidateQueries(["encheres", variables.produit]);
    },
  });
};
