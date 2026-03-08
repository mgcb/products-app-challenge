import InsightsCards from "@/components/InsightsCards";
import ProductTable from "@/components/ProductTable";
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

  return (
    <main className="min-h-screen bg-gray-100">
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

        <ProductTable products={data.products} />
      </div>
    </main>
  );
}