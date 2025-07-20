import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <main style={{ minHeight: "80vh", padding: "24px 0" }}>{children}</main>
      {/* Optionally add a footer here */}
    </>
  );
};

export default Layout;
