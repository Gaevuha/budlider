import axios from 'axios';
import type { Product } from '../types/product';

const API_BASE = 'https://dummyjson.com';
axios.defaults.baseURL = API_BASE;

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Завантажити список категорій товарів
 */
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const res = await axios.get<string[]>('/products/category-list');
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Помилка при завантаженні категорій:', error.message);
    } else {
      console.error('Сталася невідома помилка:', error);
    }
    throw error;
  }
};

/**
 * Завантажити товари з усієї бази (пагінація)
 */
export async function fetchProducts(
  currentPage = 1,
): Promise<ProductsResponse> {
  const params = {
    limit: 12,
    skip: (currentPage - 1) * 12,
  };
  const res = await axios.get<ProductsResponse>('/products', { params });
  return res.data;
}

/**
 * Завантажити товари за категорією (пагінація)
 */
export async function fetchProductsByCategory(
  categoryName: string,
  currentPage = 1,
): Promise<ProductsResponse> {
  const params = {
    limit: 12,
    skip: (currentPage - 1) * 12,
  };

  let endpoint = `/products/category/${categoryName}`;
  if (
    categoryName.toUpperCase() === 'ВСІ' ||
    categoryName.toUpperCase() === 'ALL'
  ) {
    endpoint = '/products';
  }

  const res = await axios.get<ProductsResponse>(endpoint, { params });
  return res.data;
}

/**
 * Завантажити товар по його ID
 */
export async function fetchProductById(id: number): Promise<Product> {
  const res = await axios.get<Product>(`/products/${id}`);
  return res.data;
}

/**
 * Пошук товарів за назвою (пагінація)
 */
export async function searchUserProducts(
  searchQuery: string,
  currentPage = 1,
): Promise<ProductsResponse> {
  const params = {
    q: searchQuery,
    limit: 12,
    skip: (currentPage - 1) * 12,
  };
  const res = await axios.get<ProductsResponse>('/products/search', { params });
  return res.data;
}

/**
 * Завантажити товари по масиву ID
 */
export async function fetchProductsByIds(ids: number[]): Promise<Product[]> {
  const promises = ids.map(id => fetchProductById(id));
  return Promise.all(promises);
}
