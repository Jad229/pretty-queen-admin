import { Category } from "@models/category";
import { connectDB } from "@utils/database";
import { connect } from "mongoose";

export async function GET(req) {
  await connectDB();

  try {
    const categories = await Category.find({}).populate("parent");
    return new Response(JSON.stringify(categories), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new category", {
      status: 500,
    });
  }
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { categoryName, parentCategory } = body;

  try {
    let newCategory;
    if (parentCategory) {
      newCategory = await Category.create({
        name: categoryName,
        parent: parentCategory,
      });
    } else {
      newCategory = await Category.create({
        name: categoryName,
      });
    }

    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new category", {
      status: 500,
    });
  }
}

export async function PUT(req) {
  await connectDB();
  const body = await req.json();
  const { categoryName, parentCategory, _id } = body;

  try {
    const updatedCategory = await Category.updateOne(
      { _id },
      {
        name: categoryName,
        parent: parentCategory,
      }
    );

    return new Response(JSON.stringify(updatedCategory), { status: 201 });
  } catch (error) {
    return new Response("Failed to update a new category", {
      status: 500,
    });
  }
}

export async function DELETE(req) {
  await connectDB();
  const id = req.nextUrl.searchParams.get("id");
  try {
    const deletedCategory = await Category.deleteOne({ _id: id });

    return new Response(JSON.stringify(deletedCategory), { status: 201 });
  } catch (error) {
    return new Response("Failed to delete category", {
      status: 500,
    });
  }
}
