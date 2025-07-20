import axiosInstance from "./axiosInstance";

const getProducts = () => axiosInstance.get("/produits");
const getProduct = (id) => axiosInstance.get(`/produits/${id}`);
const createProduct = (data) => axiosInstance.post("/produits", data);
const updateProduct = (id, data) => axiosInstance.put(`/produits/${id}`, data);
const deleteProduct = (id) => axiosInstance.delete(`/produits/${id}`);

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
