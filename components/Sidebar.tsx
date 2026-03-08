import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Dashboard</h2>
      <nav className="space-y-4">
        <Link href="/" className="block text-gray-700 hover:text-gray-900">
          Overview
        </Link>
        <Link href="/products" className="block text-gray-700 hover:text-gray-900">
          Products
        </Link>
        <Link href="/insights" className="block text-gray-700 hover:text-gray-900">
          Insights
        </Link>
      </nav>
    </aside>
  );
}