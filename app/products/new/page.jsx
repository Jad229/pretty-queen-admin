"use client";
import InputComponent from "@components/FormElements/InputComponent";
import { addProductFormControls } from "@utils";
import axios from "axios";
import { useState } from "react";

function AddNewProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    imageUrl: "link",
    description: "",
  });

  function onChange(e) {
    e.preventDefault();

    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }

  function handleImage() {
    return null;
  }

  async function createProduct(e) {
    e.preventDefault();
    const res = await axios.post("/api/products", formData);
    console.log(res);
  }

  console.log(formData);
  return (
    <form onSubmit={createProduct} className="flex flex-col">
      <h1 className="font-bold mb-2 text-xl">New Product</h1>
      <input
        accept="image/*"
        max="1000000"
        type="file"
        onChange={handleImage}
      />
      {addProductFormControls.map((item) => (
        <InputComponent
          key={item.id}
          label={item.label}
          type={item.type}
          id={item.id}
          onChange={(e) => onChange(e)}
          value={formData[item.id]}
          placeholder={item.placeholder}
        />
      ))}
      <label htmlFor="description">Description</label>
      <textarea
        value={formData.description}
        name="description"
        id="description"
        placeholder="description"
        onChange={onChange}
      />
      <button className="btn_primary">Save</button>
    </form>
  );
}

export default AddNewProduct;
