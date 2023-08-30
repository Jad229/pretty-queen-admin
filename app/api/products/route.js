import Product from "@models/product";
import { connectDB } from "@utils/database";

export async function GET(req) {
  try {
    await connectDB();
    const products = await Product.find({});

    return new Response(JSON.stringify(products), { status: 201 });
  } catch (error) {
    return new Response("Failed to get products", {
      status: 500,
    });
  }
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { name, price, type, imageUrl, description } = body;
  console.log(body);
  try {
    const product = await Product.create({
      name,
      price,
      type,
      imageUrl,
      description,
    });

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new product", {
      status: 500,
    });
  }
}
