'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
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
import styles from './page.module.css';
import type { Product } from '@/types/product';

const ITEMS_PER_PAGE = 12;
const STORAGE_KEY = 'budlider_filters';

export default function HomePageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ❗ Всі початкові стани — пусті, відновлення робимо в useEffect
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Всі');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const trimmedSearchQuery = searchQuery.trim();

  // Відновлюємо стан з URL або localStorage
  useEffect(() => {
    // localStorage доступний тільки на клієнті
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

  // Зберігаємо стан у localStorage
  useEffect(() => {
    const state = { searchQuery, activeCategory, currentPage };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [searchQuery, activeCategory, currentPage]);

  // Скидаємо сторінку при зміні пошуку або категорії
  useEffect(() => setCurrentPage(1), [activeCategory, trimmedSearchQuery]);

  // Запит категорій
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategory,
  });

  // Запит продуктів
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

  // Лоадер із затримкою
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowLoader(false), 300);
      return () => clearTimeout(timer);
    } else setShowLoader(true);
  }, [isLoading]);

  if (isError) return <p>Помилка при завантаженні даних</p>;
  if (showLoader) return <Loader />;

  const hasNoProducts = productsData?.products?.length === 0;

  // Обробка змін через URL
  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    router.replace(
      `/?search=${encodeURIComponent(q)}&category=${encodeURIComponent(
        activeCategory,
      )}&page=1`,
    );
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    router.replace(
      `/?search=${encodeURIComponent(
        searchQuery,
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
    <section className={styles.section}>
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
              Будь ласка, спробуйте інші ключові слова.
            </p>
          </div>
        ) : (
          <>
            <ProductList
              activeCategory={activeCategory}
              searchQuery={trimmedSearchQuery}
              products={productsData?.products || []}
            />

            {productsData && productsData.total > ITEMS_PER_PAGE && (
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
