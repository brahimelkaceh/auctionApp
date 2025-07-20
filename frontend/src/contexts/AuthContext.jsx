/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  const register = async (userData) => {
    const res = await axios.post(
      "http://localhost:8080/api/clients/register",
      userData
    );
    return res.data;
  };

  const login = async (credentials) => {
    const res = await axios.post(
      "http://localhost:8080/api/clients/login",
      credentials
    );
    setAuth(res.data);
    localStorage.setItem("auth", JSON.stringify(res.data));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  const refresh = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/refresh-token",
        {
          refreshToken: auth?.refreshToken,
        }
      );
      const updated = { ...auth, accessToken: res.data.accessToken };
      setAuth(updated);
      localStorage.setItem("auth", JSON.stringify(updated));
      return res.data.accessToken;
    } catch (err) {
      logout();
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, register, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
