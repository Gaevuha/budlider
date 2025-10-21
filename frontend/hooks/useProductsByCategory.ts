import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProductsByCategoryClient } from '@/lib/clientApi';
import type { ProductsResponse } from '@/lib/clientApi';

export function useProductsByCategory(
  category: string,
  page: number,
  options = {},
) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', category, page],
    queryFn: () => fetchProductsByCategoryClient(category, page),
    enabled: !!category && category !== 'all', // ✅ не виконується без категорії
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    ...options,
  });
}
