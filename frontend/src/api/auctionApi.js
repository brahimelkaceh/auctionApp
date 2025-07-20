// services/encheres.js
import axiosInstance from "./axiosInstance";

// Place a bid
const placeBid = (data) => axiosInstance.post("/encheres", data);

// Get all bids for a specific product by ID
const getBidsForProduit = (produitId) =>
  axiosInstance.get(`/encheres/produit/${produitId}`);
// Get all bids for a specific client by client ID
const getBidsForClient = (clientId) =>
  axiosInstance.get(`/encheres/client/${clientId}`);

export { placeBid, getBidsForProduit, getBidsForClient };
