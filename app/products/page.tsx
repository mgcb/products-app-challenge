import ProductTable from "@/components/ProductTable";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/lib/constants";

async function getProducts() {
  const response = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Products
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Explore the product catalog.
              </p>
            </header>

            <ProductTable products={products} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}