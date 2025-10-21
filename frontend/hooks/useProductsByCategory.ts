import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProductsClient } from '@/lib/clientApi';
import type { ProductsResponseClient } from '@/lib/clientApi';

export function useProductsByCategory(
  category: string,
  page: number,
  options = {},
) {
  return useQuery<ProductsResponseClient>({
    queryKey: ['products', category, page],
    queryFn: () => fetchProductsClient(page, category),
    enabled: !!category && category !== 'all', // ✅ не виконується без категорії
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    ...options,
  });
}
