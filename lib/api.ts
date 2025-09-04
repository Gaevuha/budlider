import axios from 'axios';
import type { Product } from '../types/product';

axios.defaults.baseURL = 'https://dummyjson.com/products';

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Завантажити список категорій товарів
 */
export const fetchCategory = async (): Promise<string[]> => {
  try {
    const result = await axios.get<string[]>('/category-list');

    return result.data;
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
 * @param currentPage - поточна сторінка (для пагінації)
 */
export async function fetchProducts(
  currentPage = 1,
): Promise<ProductsResponse> {
  const params = {
    limit: 12,
    skip: (currentPage - 1) * 12,
  };
  const res = await axios.get<ProductsResponse>('', { params });
  return res.data;
}

/**
 * Завантажити товари за категорією (пагінація)
 * @param categoryName - назва категорії (наприклад, 'smartphones')
 * @param currentPage - поточна сторінка
 */
export async function fetchProductsByCategory(
  categoryName: string,
  currentPage = 1,
): Promise<ProductsResponse> {
  const params = {
    limit: 12,
    skip: (currentPage - 1) * 12,
  };

  // Якщо категорія ALL, отримуємо всі товари
  let endPoint = `/category/${categoryName}`;
  if (categoryName.toUpperCase() === 'ALL') {
    endPoint = '';
  }

  const res = await axios.get<ProductsResponse>(endPoint, { params });
  return res.data;
}

/**
 * Завантажити товар по його ID
 * @param id - ідентифікатор товару
 */
export async function fetchProductById(id: number): Promise<Product> {
  const res = await axios.get<Product>(`/${id}`);
  return res.data;
}

/**
 * Пошук товарів за назвою (пагінація)
 * @param searchQuery - текст для пошуку
 * @param currentPage - поточна сторінка
 */
export async function searchUserProducts(
  searchQuery: string,
  currentPage = 1,
): Promise<ProductsResponse> {
  const params = {
    limit: 12,
    skip: (currentPage - 1) * 12,
    q: searchQuery,
  };
  const res = await axios.get<ProductsResponse>('/search', { params });
  return res.data;
}

/**
 * Завантажити товари по масиву ID
 */
export async function fetchProductsByIds(ids: number[]): Promise<Product[]> {
  const promises = ids.map(id => fetchProductById(id));
  return Promise.all(promises);
}
