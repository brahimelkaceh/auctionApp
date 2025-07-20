import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../api/productApi";

export const useProducts = () =>
  useQuery({
    queryKey: ["getProducts"],
    queryFn: () => api.getProducts(),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createProduct,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.updateProduct(id, data),
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deleteProduct,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });
};

export const useProduct = (id) =>
  useQuery({
    queryKey: ["getProduct", id],
    queryFn: () => api.getProduct(id),
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
  });
