'use client';

import { useState, useEffect } from 'react';
import {
  useCategories,
  useProducts,
  useProductsByCategory,
  useSearchProducts,
} from '@/hooks/useProducts';
import type { ProductsResponse } from '@/lib/api';
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter';
import ProductList from '@/components/ProductList/ProductList';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import ErrorComponent from './error'; // твій компонент

interface Props {
  initialSearch?: string;
}

const ITEMS_PER_PAGE = 12;

export default function ProductsClient({ initialSearch = '' }: Props) {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('Всі');
  const [search, setSearch] = useState(initialSearch);

  const isDesktop = useMediaQuery('(min-width: 1200px)');

  useEffect(() => {
    if (initialSearch) setCategory('Всі'); // скидаємо категорію при пошуку
  }, [initialSearch]);

  const categoriesQuery = useCategories();
  const allProductsQuery = useProducts(page);
  const categoryProductsQuery = useProductsByCategory(category, page);
  const searchProductsQuery = useSearchProducts(search, page);

  let data: ProductsResponse | undefined;
  let isLoading = false;
  let isError = false;
  let error: unknown = null;
  let refetch: () => void = () => {};

  if (search) {
    data = searchProductsQuery.data;
    isLoading = searchProductsQuery.isLoading;
    isError = searchProductsQuery.isError;
    error = searchProductsQuery.error;
    refetch = searchProductsQuery.refetch;
  } else if (category !== 'Всі') {
    data = categoryProductsQuery.data;
    isLoading = categoryProductsQuery.isLoading;
    isError = categoryProductsQuery.isError;
    error = categoryProductsQuery.error;
    refetch = categoryProductsQuery.refetch;
  } else {
    data = allProductsQuery.data;
    isLoading = allProductsQuery.isLoading;
    isError = allProductsQuery.isError;
    error = allProductsQuery.error;
    refetch = allProductsQuery.refetch;
  }

  if (categoriesQuery.isLoading || isLoading) return <Loader />;

  if (categoriesQuery.isError || isError)
    return (
      <ErrorComponent
        error={error instanceof Error ? error : new Error('Невідома помилка')}
        reset={refetch}
      />
    );

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
    setSearch(''); // очищуємо пошук при зміні категорії
  };

  return (
    <section className="section">
      <div className="container">
        <CategoryFilter
          categories={['Всі', ...(categoriesQuery.data || [])]}
          activeCategory={category}
          setActiveCategory={handleCategoryChange}
        />

        <ProductList
          products={data?.products || []}
          currentPage={page}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={data?.total || 0}
          activeCategory={category}
          onPageChange={setPage}
        />

        {isDesktop && data && data.total > ITEMS_PER_PAGE && (
          <Pagination
            totalItems={data.total}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </div>
    </section>
  );
}
