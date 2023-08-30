"use client";

import axios from "axios";
import { useEffect } from "react";

function EditProductPage({ params }) {
  const { id } = params;

  useEffect(() => {
    const getProduct = async () => {
      //   const res = await axios.get("/api/products/", { params: { id } });
      const res = await axios.get("/api/products?id=" + id);
    };

    getProduct();
  }, [id]);
  return <div>{id}</div>;
}

export default EditProductPage;
