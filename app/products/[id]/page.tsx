import Link from "next/link";
import { Product } from "@/types/product";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-6 py-10">


        <div className="grid gap-8 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm md:grid-cols-2">
          <div className="space-y-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-600 object-cover"
            />
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-2">
                {product.images.slice(1, 5).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-24 rounded-lg border border-gray-200 dark:border-gray-600 object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {product.category}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>
            </div>

            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  ${product.price}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  {product.rating}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Stock</p>
                <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  {product.stock}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-4">
              <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Product summary
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This product detail view helps stakeholders inspect individual
                catalog items beyond summary metrics, including descriptive
                information, available stock and user rating.
              </p>
            </div>
          </div>          </div>        </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}