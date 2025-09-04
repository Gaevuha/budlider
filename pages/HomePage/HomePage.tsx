import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ProductList from '../../components/ProductList/ProductList';
import Pagination from '../../components/Pagination/Pagination';
import {
  fetchCategory,
  fetchProducts,
  fetchProductsByCategory,
  searchUserProducts,
} from '../../services/productService';
import styles from './HomePage.module.css';

const ITEMS_PER_PAGE = 12;

interface OutletContextType {
  searchQuery: string;
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('Всі');
  const [currentPage, setCurrentPage] = useState(1);
  const { searchQuery } = useOutletContext<OutletContextType>();
  const trimmedSearchQuery = searchQuery.trim();

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, trimmedSearchQuery]);

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategory,
  });

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ['products', activeCategory, trimmedSearchQuery, currentPage],
    queryFn: () => {
      if (trimmedSearchQuery) {
        return searchUserProducts(trimmedSearchQuery, currentPage);
      }
      if (activeCategory === 'Всі') {
        return fetchProducts(currentPage);
      }
      return fetchProductsByCategory(activeCategory, currentPage);
    },
    placeholderData: keepPreviousData,
  });

  const isLoading = isLoadingCategories || isLoadingProducts;
  const isError = isErrorCategories || isErrorProducts;

  // Логіка затримки лоадера:
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowLoader(false), 1000); // 1с затримка
      return () => clearTimeout(timer);
    } else {
      setShowLoader(true);
    }
  }, [isLoading]);

  if (isError) return <p>❌ Помилка при завантаженні даних</p>;

  const hasNoProducts = productsData?.products?.length === 0;

  if (showLoader) return <Loader />;

  return (
    <section className={styles.section}>
      <div className="container">
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={['Всі', ...categories]}
        />

        {hasNoProducts ? (
          <div className={styles.notFound}>
            <div className={styles.notFoundIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#213538"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
            </div>
            <h2 className={styles.notFoundTitle}>Товари не знайдено</h2>
            <p className={styles.notFoundDescription}>
              Нам не вдалося знайти жодного елемента, що відповідає вашому запиту.
              <br />
              Будь ласка, спробуйте інші ключові слова.
            </p>
          </div>
        ) : (
          <>
            <ProductList
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              products={productsData?.products || []}
            />

            {productsData && productsData.total > ITEMS_PER_PAGE && (
              <Pagination
                totalItems={productsData.total}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
