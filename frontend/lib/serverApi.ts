// lib/serverApi.ts
import axios from 'axios';
import type { Category, Product } from '@/types/product';

export interface ProductsResponseServer {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Базовий URL dummyjson
const DUMMY_BASE = 'https://dummyjson.com';

// Функція для логів запиту
const logRequest = (url: string, params?: Record<string, string | number>) => {
  console.log('Server запит на URL:', url, 'з params:', params || {});
};

// ---------------------- КАТЕГОРІЇ ----------------------
export const fetchCategoriesServer = async (): Promise<Category[]> => {
  const url = `${DUMMY_BASE}/products/categories`;
  const res = await axios.get<Category[]>(url);
  return res.data; // Уже [{ slug, name, url }]
};

// ---------------------- ВСІ ТОВАРИ ----------------------
export const fetchProductsServer = async (
  page = 1,
): Promise<ProductsResponseServer> => {
  const params = { limit: 12, skip: (page - 1) * 12 };
  const url = `${DUMMY_BASE}/products`;
  logRequest(url, params);

  const res = await axios.get<ProductsResponseServer>(url, { params });
  return res.data;
};

// ---------------------- ТОВАРИ ЗА КАТЕГОРІЄЮ ----------------------
export const fetchProductsByCategoryServer = async (
  category: string,
  page = 1,
): Promise<ProductsResponseServer> => {
  const params = { limit: 12, skip: (page - 1) * 12 };
  const url =
    category.toLowerCase() === 'all' || category.toLowerCase() === 'всі'
      ? `${DUMMY_BASE}/products`
      : `${DUMMY_BASE}/products/category/${encodeURIComponent(category)}`;

  logRequest(url, params);
  const res = await axios.get<ProductsResponseServer>(url, { params });
  return res.data;
};

// ---------------------- ОДИН ТОВАР ----------------------
export const fetchProductByIdServer = async (id: number): Promise<Product> => {
  const url = `${DUMMY_BASE}/products/${id}`;
  logRequest(url);

  const res = await axios.get<Product>(url);
  return res.data;
};

// ---------------------- ПОШУК ----------------------
export const searchUserProductsServer = async (
  q: string,
  page = 1,
): Promise<ProductsResponseServer> => {
  const params = { q, limit: 12, skip: (page - 1) * 12 };
  const url = `${DUMMY_BASE}/products/search`;
  logRequest(url, params);

  const res = await axios.get<ProductsResponseServer>(url, { params });
  return res.data;
};
