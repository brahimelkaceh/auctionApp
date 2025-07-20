import axiosInstance from "./axiosInstance";

export const register = (userData) =>
  axiosInstance.post("/clients/register", userData);
export const login = (credentials) =>
  axiosInstance.post("/clients/login", credentials);
export const getUser = (id) => axiosInstance.get(`/clients/${id}`);
// Add more user-related API calls as needed
