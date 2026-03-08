import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Dashboard</h2>
      <nav className="space-y-4">
        <Link href="/" className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          Overview
        </Link>
        <Link href="/products" className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          Products
        </Link>
        <Link href="/insights" className="block text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          Insights
        </Link>
      </nav>
    </aside>
  );
}