import { useQuery } from '@tanstack/react-query';
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  searchUserProducts,
  type ProductsResponse,
} from '@/lib/api';

// Категорії
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // кеш 5 хв
    retry: 1,
  });
};

// Всі товари
export const useProducts = (page: number) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ['products', page],
    queryFn: () => fetchProducts(page),
    staleTime: 1000 * 60,
    retry: 1,
  });
};

// Товари за категорією
export const useProductsByCategory = (category: string, page: number) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ['products', category, page],
    queryFn: () => fetchProductsByCategory(category, page),
    staleTime: 1000 * 60,
    retry: 1,
  });
};

// Пошук
export const useSearchProducts = (query: string, page: number) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ['search', query, page],
    queryFn: () => searchUserProducts(query, page),
    enabled: !!query, // виконується лише якщо є пошук
    staleTime: 1000 * 60,
    retry: 1,
  });
};
