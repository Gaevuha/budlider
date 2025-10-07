// app/products/page.tsx
import ProductsClient from './ProductsClient';
import {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  type ProductsResponse,
} from '@/lib/api';

interface Props {
  searchParams?: {
    search?: string;
    page?: string;
    category?: string;
  };
}

const ITEMS_PER_PAGE = 12;

export default async function ProductsPage({ searchParams }: Props) {
  const currentPage = parseInt(searchParams?.page || '1', 10);
  const activeCategory = searchParams?.category || 'Всі';
  const searchQuery = searchParams?.search || '';

  const categories = await fetchCategories();

  let initialData: ProductsResponse;

  if (activeCategory === 'Всі') {
    initialData = await fetchProducts(currentPage);
  } else {
    initialData = await fetchProductsByCategory(activeCategory, currentPage);
  }

  // Фільтр пошуку
  if (searchQuery) {
    const filtered = initialData.products.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    initialData = {
      ...initialData,
      products: filtered,
      total: filtered.length,
      skip: 0,
      limit: ITEMS_PER_PAGE,
    };
  }

  return (
    <ProductsClient
      categories={categories}
      initialData={initialData}
      activeCategory={activeCategory}
      currentPage={currentPage}
      searchQuery={searchQuery}
    />
  );
}
