import axios from "axios";

export const createProduct = async (formData) => {
  try {
    const res = await axios.post("/api/products", formData);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveProduct = async (formData) => {
  try {
    const res = await axios.put("/api/products", formData);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete("/api/products?id=" + id);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (id) => {
  try {
    const res = await axios.get("/api/products");

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
