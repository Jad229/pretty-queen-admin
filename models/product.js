import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product needs a name"],
  },
  price: {
    type: Number,
    required: [true, "Product needs a price"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide image url"],
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "Please provide a type for the product"],
  },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
