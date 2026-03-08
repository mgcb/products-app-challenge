import { DummyProductsResponse, Product } from "@/types/product";

export async function GET() {
  try {
    const response = await fetch("https://dummyjson.com/products", {
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch products from DummyJSON" },
        { status: 500 }
      );
    }

    const data: DummyProductsResponse = await response.json();
    const products: Product[] = data.products;

    const totalProducts = products.length;

    const averagePrice =
      totalProducts > 0
        ? Number(
            (
              products.reduce((sum, product) => sum + product.price, 0) /
              totalProducts
            ).toFixed(2)
          )
        : 0;

    const totalStock = products.reduce(
      (sum, product) => sum + product.stock,
      0
    );

    const categoryCount: Record<string, number> = {};

    for (const product of products) {
      categoryCount[product.category] =
        (categoryCount[product.category] || 0) + 1;
    }

    const mostCommonCategory =
      Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] ??
      "N/A";

    const topRatedProduct = [...products].sort(
      (a, b) => b.rating - a.rating
    )[0];

    return Response.json({
      products,
      insights: {
        totalProducts,
        averagePrice,
        totalStock,
        mostCommonCategory,
        topRatedProduct: topRatedProduct
          ? {
              id: topRatedProduct.id,
              title: topRatedProduct.title,
              rating: topRatedProduct.rating,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("API /api/products error:", error);

    return Response.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}