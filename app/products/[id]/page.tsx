import Link from "next/link";
import { Product } from "@/types/product";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-gray-700 hover:underline"
        >
          ← Back to dashboard
        </Link>

        <div className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full rounded-2xl border border-gray-200 object-cover"
            />
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500">
                {product.category}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {product.title}
              </h1>
            </div>

            <p className="text-gray-600">{product.description}</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Price</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  ${product.price}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Rating</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {product.rating}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Stock</p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {product.stock}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                Product summary
              </h2>
              <p className="text-sm text-gray-600">
                This product detail view helps stakeholders inspect individual
                catalog items beyond summary metrics, including descriptive
                information, available stock and user rating.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}