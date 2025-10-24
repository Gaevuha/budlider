'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { Category } from '@/types/product';
import type { ProductsResponseClient } from '@/lib/clientApi';
import { fetchProductsClient } from '@/lib/clientApi';

import CategoryFilter from '@/components/CategoryFilter/CategoryFilter';
import ProductList from '@/components/ProductList/ProductList';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import ErrorComponent from './error';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Props {
  initialProducts: ProductsResponseClient;
  initialCategories: Category[];
  initialSearch?: string;
  initialPage?: number;
}

const ITEMS_PER_PAGE = 12;

export default function ProductsClient({
  initialCategories,
  initialProducts,
  initialSearch = '',
  initialPage = 1,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(initialPage);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState(initialSearch || '');

  const isDesktop = useMediaQuery('(min-width: 1200px)');

  // ---- Ініціалізація state з URL при першому рендері ----
  useEffect(() => {
    const s = searchParams.get('search') || '';
    const c = searchParams.get('category') || 'all';
    const p = Number(searchParams.get('page')) || 1;

    setSearch(s);
    setActiveCategory(c);
    setPage(p);
  }, [searchParams]);

  // ---- React Query для завантаження продуктів ----
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', page, activeCategory, search],
    queryFn: () => fetchProductsClient(page, activeCategory, search),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    initialData: initialProducts,

    refetchOnMount: false, // не перезапускати при монтуванні
    refetchOnWindowFocus: false, // не перезапускати при фокусі вікна
    refetchOnReconnect: false, // не перезапускати при reconnect
  });

  if (isLoading || !data) return <Loader />;
  if (isError)
    return (
      <ErrorComponent
        error={error instanceof Error ? error : new Error('Невідома помилка')}
        reset={() => {}}
      />
    );

  // ---- Оновлення URL без SSR ----
  const updateQuery = (params: Record<string, string | number | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === '' || value === 'all') {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
    router.replace(`/products?${newParams.toString()}`, { scroll: false });
  };

  // ---- Зміна категорії ----
  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setPage(1);
    setSearch('');
    updateQuery({ category: slug, page: 1, search: '' });
  };

  // ---- Зміна сторінки ----
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateQuery({ page: newPage });
  };

  // ---- Підготовка категорій ----
  const categories: Category[] = [
    { slug: 'all', name: 'Всі', url: '#' },
    ...initialCategories,
  ];

  const slugs = categories.map(c => c.slug);
  const duplicates = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
  if (duplicates.length > 0) {
    console.warn('Duplicate category slugs ProductClient:', duplicates);
  }

  return (
    <section className="section">
      <div className="container">
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
        />

        {/* Products */}
        <ProductList
          products={data.products}
          currentPage={page}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={data.total}
          activeCategory={activeCategory}
          onPageChange={handlePageChange}
        />

        {/* Pagination */}
        {isDesktop && data.total > ITEMS_PER_PAGE && (
          <Pagination
            totalItems={data.total}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}
