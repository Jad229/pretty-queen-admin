import ProductForm from "@components/ProductForm";
import { createProduct } from "@controllers/products";

function AddNewProduct() {
  return (
    <div>
      <h1 className="font-bold mb-2 text-xl">New Product</h1>
      <ProductForm />
    </div>
  );
}

export default AddNewProduct;
