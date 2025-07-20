import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { setAuthStore } from "./api/axiosInstance";
import { useAuth } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute } from "./contexts/ProtectedRoute";
import Register from "./pages/Register";

import ProductsListPage from "./pages/ProductsListPage";
import ProductDetailPage from "./pages/ProductsPage";
import Layout from "./components/Layout";
import AddProductPage from "./pages/AddProduct";
import EditProductPage from "./pages/EditProduct";

function App() {
  const authStore = useAuth();
  setAuthStore(authStore); // important for axios interceptor

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/products" element={<ProductsListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route
            path="/products/:id/edit"
            element={
              <ProtectedRoute>
                <EditProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
