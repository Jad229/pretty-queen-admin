"use client";

import ProductForm from "@components/ProductForm";
import axios from "axios";
import { useEffect, useState } from "react";

function EditProductPage({ params }) {
  const [productInfo, setProductInfo] = useState(null);
  const { id } = params;

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get("/api/products?id=" + id);
      setProductInfo((prevState) => ({ ...res.data }));
    };

    getProduct();
  }, [id]);
  console.log(productInfo);
  return (
    <div>
      <h1 className="font-bold mb-2 text-xl">Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </div>
  );
}

export default EditProductPage;
