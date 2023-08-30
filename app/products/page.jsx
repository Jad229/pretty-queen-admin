import Link from "next/link";

function Products() {
  return (
    <div>
      <Link
        href={"/products/new"}
        className="bg-green-600 text-white rounded-md py-2 px-4 "
      >
        Add new product
      </Link>
    </div>
  );
}

export default Products;
