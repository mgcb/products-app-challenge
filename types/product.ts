export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
};

export type DummyProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type DashboardInsights = {
  totalProducts: number;
  averagePrice: number;
  totalStock: number;
  mostCommonCategory: string;
  topRatedProduct: {
    id: number;
    title: string;
    rating: number;
  } | null;
};

export type DashboardResponse = {
  products: Product[];
  insights: DashboardInsights;
};