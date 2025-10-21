import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { searchUserProductsClient } from '@/lib/clientApi';
import type { ProductsResponse } from '@/lib/clientApi';

export function useSearchProducts(search: string, page: number, options = {}) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'search', search, page],
    queryFn: () => searchUserProductsClient(search, page),
    enabled: !!search, // ✅ виконується лише якщо є пошуковий запит
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    ...options,
  });
}
