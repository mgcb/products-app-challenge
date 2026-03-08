import { DashboardInsights } from "@/types/product";

type InsightsCardsProps = {
  insights: DashboardInsights;
};

export default function InsightsCards({ insights }: InsightsCardsProps) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Total products</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {insights.totalProducts}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Average price</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          ${insights.averagePrice}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Total stock</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">
          {insights.totalStock}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Top rated product</p>
        <p className="mt-2 text-base font-semibold text-gray-900">
          {insights.topRatedProduct?.title ?? "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          Rating: {insights.topRatedProduct?.rating ?? "N/A"}
        </p>
      </div>
    </section>
  );
}