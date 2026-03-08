import InsightsCards from "@/components/InsightsCards";
import ProductTable from "@/components/ProductTable";
import Sidebar from "@/components/Sidebar";
import CategoryChart from "@/components/CategoryChart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BASE_URL } from "@/lib/constants";
import { DashboardResponse } from "@/types/product";

async function getDashboardData(): Promise<DashboardResponse> {
  const response = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}

export default async function HomePage() {
  let data: DashboardResponse | null = null;
  try {
    data = await getDashboardData();
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return (
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <main className="flex-1">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Error
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Failed to load dashboard data. Please try again later.
              </p>
            </header>
          </div>
        </main>
      </div>
    );
  }

  // Calculate category distribution
  const categoryCount = data.products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
            <header className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Mini Product Insights Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                A simple internal dashboard to explore product catalog insights and
                individual product details.
              </p>
            </header>

            <InsightsCards insights={data.insights} />

            <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Catalog Overview
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Most common category:{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {data.insights.mostCommonCategory}
                </span>
              </p>
            </section>

            <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Category Distribution
              </h2>
              <CategoryChart data={Object.entries(categoryCount).map(([category, count]) => ({ category, count }))} />
            </section>

            <ProductTable products={data.products} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
