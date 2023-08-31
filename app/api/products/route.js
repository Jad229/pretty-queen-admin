import Product from "@models/product";
import { connectDB } from "@utils/database";

export async function GET(req) {
  await connectDB();
  const id = req.nextUrl.searchParams.get("id");

  try {
    if (id) {
      const product = await Product.findOne({ _id: id });
      return new Response(JSON.stringify(product), { status: 201 });
    }

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

export async function PUT(req) {
  await connectDB();
  const body = await req.json();

  const { _id, name, price, type, imageUrl, description } = body;

  console.log(body);

  try {
    const updatedProduct = await Product.updateOne(
      { _id },
      { name, price, type, imageUrl, description }
    );

    return new Response(JSON.stringify(updatedProduct), { status: 201 });
  } catch (error) {
    return new Response("Failed to update product", {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  await connectDB();
  const id = req.nextUrl.searchParams.get("id");

  try {
    const deletedProduct = await Product.deleteOne({ _id: id });

    return new Response(JSON.stringify(deletedProduct), { status: 201 });
  } catch (error) {
    return new Response("Failed to update product", {
      status: 500,
    });
  }
}
