'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '../components/Loader/Loader';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import ProductList from '../components/ProductList/ProductList';
import Pagination from '../components/Pagination/Pagination';
import {
  fetchCategory,
  fetchProducts,
  fetchProductsByCategory,
  searchUserProducts,
} from '@/lib/api';
import type { Product } from '@/types/product';
import styles from './HomePageClient.module.css';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const ITEMS_PER_PAGE = 12;
const STORAGE_KEY = 'budlider_filters';

export default function HomePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Всі');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const trimmedSearchQuery = searchQuery.trim();

  // Перевірка, чи десктоп
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  // Відновлення стану з URL або localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : {};

    const urlSearch = searchParams?.get('search') || parsed.searchQuery || '';
    const urlCategory =
      searchParams?.get('category') || parsed.activeCategory || 'Всі';
    const urlPage = Number(
      searchParams?.get('page') || parsed.currentPage || 1,
    );

    setSearchQuery(urlSearch);
    setActiveCategory(urlCategory);
    setCurrentPage(urlPage);
  }, [searchParams]);

  // Зберігання стану в localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const state = { searchQuery, activeCategory, currentPage };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [searchQuery, activeCategory, currentPage]);

  // Скидання сторінки при зміні пошуку або категорії
  useEffect(() => setCurrentPage(1), [activeCategory, trimmedSearchQuery]);

  // Категорії
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategory,
  });

  // Продукти
  const productsQueryKey = useMemo(
    () => ['products', activeCategory, trimmedSearchQuery, currentPage],
    [activeCategory, trimmedSearchQuery, currentPage],
  );

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: productsQueryKey,
    queryFn: async (): Promise<{ products: Product[]; total: number }> => {
      if (trimmedSearchQuery)
        return searchUserProducts(trimmedSearchQuery, currentPage);
      if (activeCategory === 'Всі') return fetchProducts(currentPage);
      return fetchProductsByCategory(activeCategory, currentPage);
    },
    placeholderData: keepPreviousData,
  });

  const isLoading = isLoadingCategories || isLoadingProducts;
  const isError = isErrorCategories || isErrorProducts;

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowLoader(false), 300);
      return () => clearTimeout(timer);
    } else setShowLoader(true);
  }, [isLoading]);

  if (isError)
    return <p className={styles.error}>Помилка при завантаженні даних</p>;
  if (showLoader) return <Loader />;

  const hasNoProducts = productsData?.products?.length === 0;

  const handleSearchAction = async (formData: FormData) => {
    const value = (formData.get('searchValue')?.toString() || '').trim();
    setSearchQuery(value);
    setCurrentPage(1);
    router.replace(
      `/?search=${encodeURIComponent(value)}&category=${encodeURIComponent(
        activeCategory,
      )}&page=1`,
    );
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    const newSearchQuery = category === 'Всі' ? '' : searchQuery;
    if (category === 'Всі') setSearchQuery('');

    router.replace(
      `/?search=${encodeURIComponent(
        newSearchQuery,
      )}&category=${encodeURIComponent(category)}&page=1`,
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.replace(
      `/?search=${encodeURIComponent(
        searchQuery,
      )}&category=${encodeURIComponent(activeCategory)}&page=${page}`,
    );
  };

  return (
    <section className="section">
      <div className="container">
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          categories={['Всі', ...categories]}
        />

        {hasNoProducts ? (
          <div className={styles.notFound}>
            <h2 className={styles.notFoundTitle}>Товари не знайдено</h2>
            <p className={styles.notFoundDescription}>
              Нам не вдалося знайти жодного елемента, що відповідає вашому
              запиту.
              <br />
              Будь ласка, спробуйте інші слова для пошуку.
            </p>
          </div>
        ) : (
          <>
            <ProductList
              activeCategory={activeCategory}
              searchQuery={trimmedSearchQuery}
              products={productsData?.products || []}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={productsData?.total || 0}
              onPageChange={handlePageChange}
            />

            {/* Пагінація тільки на десктопі */}
            {isDesktop &&
              productsData &&
              productsData.total > ITEMS_PER_PAGE && (
                <Pagination
                  totalItems={productsData.total}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
          </>
        )}
      </div>
    </section>
  );
}
