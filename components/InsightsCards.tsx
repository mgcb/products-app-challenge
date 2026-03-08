import { DashboardInsights } from "@/types/product";
import { Package, DollarSign, Archive, Star } from "lucide-react";

type InsightsCardsProps = {
  insights: DashboardInsights;
};

export default function InsightsCards({ insights }: InsightsCardsProps) {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-4">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
            <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total products</p>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          {insights.totalProducts}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
            <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average price</p>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          ${insights.averagePrice}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
            <Archive className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total stock</p>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
          {insights.totalStock}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900">
            <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Top rated product</p>
        </div>
        <p className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          {insights.topRatedProduct?.title ?? "N/A"}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Rating: {insights.topRatedProduct?.rating ?? "N/A"}
        </p>
      </div>
    </section>
  );
}