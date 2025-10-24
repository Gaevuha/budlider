import axios from 'axios';
import type { Product, Category } from '@/types/product';

export interface ProductsResponseClient {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // http://localhost:3000/api/products
  withCredentials: true,
});

export const fetchCategoriesClient = async (): Promise<Category[]> => {
  const res = await apiClient.get<Category[]>('/categories');
  return res.data;
};

export const fetchProductsClient = async (
  page = 1,
  category = 'all',
  search = '',
): Promise<ProductsResponseClient> => {
  const limit = 12;
  const skip = (page - 1) * limit;

  const params: Record<string, string | number> = { limit, skip };
  if (category && category !== 'all') params.category = category;
  if (search) params.q = search;

  const res = await apiClient.get<ProductsResponseClient>('', { params });
  return res.data;
};

export const fetchProductByIdClient = async (id: number): Promise<Product> => {
  const res = await apiClient.get<Product>(`/${id}`);
  return res.data;
};
