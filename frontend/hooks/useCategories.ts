import { useQuery } from '@tanstack/react-query';
import { fetchCategoriesClient } from '@/lib/clientApi';
import type { Category } from '@/types/product';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategoriesClient,
    staleTime: 1000 * 60, // 1 хвилина, щоб не перезапитувалось занадто часто
  });
};
