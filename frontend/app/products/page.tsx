import { fetchProductsClient, fetchCategoriesClient } from '@/lib/clientApi';
import ProductsClient from './ProductsClient';

interface SearchParams {
  page?: string;
  category?: string;
  search?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams | Promise<SearchParams>;
}) {
  const params = 'then' in searchParams ? await searchParams : searchParams;

  const page = Number(params?.page) || 1;
  const category = params?.category || 'all';
  const search = params?.search || '';

  const [initialProducts, initialCategories] = await Promise.all([
    fetchProductsClient(page, category, search),
    fetchCategoriesClient(),
  ]);

  return (
    <ProductsClient
      initialProducts={initialProducts}
      initialCategories={initialCategories}
      initialSearch={search}
      initialPage={page}
    />
  );
}
