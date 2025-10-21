import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProductsClient } from '@/lib/clientApi';
import type { ProductsResponseClient } from '@/lib/clientApi';

export function useSearchProducts(search: string, page: number, options = {}) {
  return useQuery<ProductsResponseClient>({
    queryKey: ['products', 'search', search, page],
    queryFn: () => fetchProductsClient(page, 'all', search), // Використовуємо fetchProductsClient з search
    enabled: !!search, // ✅ виконується лише якщо є пошуковий запит
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    ...options,
  });
}
