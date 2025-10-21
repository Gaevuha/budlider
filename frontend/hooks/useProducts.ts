// hooks/useProducts.ts
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import {
  fetchProductsClient,
  type ProductsResponseClient,
} from '@/lib/clientApi';

export const useProducts = (
  page: number,
  options?: Omit<
    UseQueryOptions<ProductsResponseClient, Error, ProductsResponseClient>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery<ProductsResponseClient, Error>({
    queryKey: ['products', page], // ✅ queryKey обов’язково
    queryFn: () => fetchProductsClient(page), // ✅ queryFn обов’язково
    staleTime: 1000 * 60,
    retry: 1,
    ...options, // 🔑 прокидаємо інші опції, наприклад enabled
  });
};
