import InsightsCards from "@/components/InsightsCards";
import ProductTable from "@/components/ProductTable";
import Sidebar from "@/components/Sidebar";
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
  const data = await getDashboardData();

  // Calculate category distribution
  const categoryCount = data.products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Mini Product Insights Dashboard
            </h1>
            <p className="text-gray-600">
              A simple internal dashboard to explore product catalog insights and
              individual product details.
            </p>
          </header>

          <InsightsCards insights={data.insights} />

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Catalog Overview
            </h2>
            <p className="text-sm text-gray-600">
              Most common category:{" "}
              <span className="font-medium text-gray-900">
                {data.insights.mostCommonCategory}
              </span>
            </p>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Category Distribution
            </h2>
            <div className="space-y-2">
              {Object.entries(categoryCount).map(([category, count]) => (
                <div key={category} className="flex justify-between">
                  <span className="text-sm text-gray-600">{category}</span>
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          </section>

          <ProductTable products={data.products} />
        </div>
      </main>
    </div>
  );
}
