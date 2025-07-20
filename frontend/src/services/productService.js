// Product service: business logic for products
import * as productApi from "../api/productApi";

export const fetchAndFormatProducts = async () => {
  const res = await productApi.getProducts();
  // Example: add a formatted price field
  return res.data.map((product) => ({
    ...product,
    formattedPrice: `${product.prix} DH`,
  }));
};

// Add more product-related business logic as needed
