import Link from "next/link";
import { Product } from "@/types/product";

type ProductTableProps = {
  products: Product[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Products</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Click a product to view details
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="px-3 py-2">Image</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="rounded-xl border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
              >
                <td className="px-3 py-3">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                </td>
                <td className="px-3 py-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="font-medium text-gray-900 dark:text-white hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="px-3 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {product.category}
                </td>
                <td className="px-3 py-3 font-medium text-gray-900 dark:text-white">
                  ${product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}