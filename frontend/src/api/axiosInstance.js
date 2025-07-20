import axios from "axios";

let store;

export const setAuthStore = (authStore) => {
  store = authStore;
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = store?.auth?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await store.refresh();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        store.logout();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
