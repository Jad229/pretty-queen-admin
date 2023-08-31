"use client";
import { deleteProduct } from "@controllers/products";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function DeleteProductPage({ params }) {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const { id } = params;

  useEffect(() => {
    if (!id) {
      return;
    }

    const getProduct = async () => {
      const res = await axios.get("/api/products?id=" + id);
      setProductInfo((prevState) => ({ ...res.data }));
    };

    getProduct();
  }, [id]);

  function goBack() {
    router.push("/products");
  }

  async function handleDelete() {
    const res = await deleteProduct(id);
    console.log(res);
    if (res) {
      router.push("/products");
    }
  }
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-center">
        Do you really want to delete {productInfo?.name}
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn_red" onClick={handleDelete}>
          Yes
        </button>
        <button className="btn_default" onClick={goBack}>
          NO
        </button>
      </div>
    </div>
  );
}

export default DeleteProductPage;
