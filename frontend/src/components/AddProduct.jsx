// src/pages/products/AddProduct.jsx
import React from "react";
import ProductForm from "./ProductForm";

export default function AddProduct({ onSubmit, isLoading }) {
  return (
    <ProductForm
      isEdit={false}
      initialValues={{
        libelle: "",
        prix: "",
        statut: "active",
        image: "",
      }}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
}
