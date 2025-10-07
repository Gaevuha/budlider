'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CategoryFilter from '@/components/CategoryFilter/CategoryFilter';
import ProductList from '@/components/ProductList/ProductList';
import Pagination from '@/components/Pagination/Pagination';
import type { ProductsResponse } from '@/lib/api';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Loader from '@/components/Loader/Loader'; // ✅ використання CSS Loader

interface Props {
  categories: string[];
  initialData: ProductsResponse;
  activeCategory: string;
  currentPage: number;
  searchQuery: string;
}

const ITEMS_PER_PAGE = 12;

export default function ProductsClient({
  categories,
  initialData,
  activeCategory: initialCategory,
  currentPage: initialPage,
}: Props) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const isDesktop = useMediaQuery('(min-width: 1200px)');

  // імітуємо завантаження
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);

    const params = new URLSearchParams();
    params.set('category', category);
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const params = new URLSearchParams();
    params.set('category', activeCategory);
    params.set('page', page.toString());
    router.push(`/products?${params.toString()}`);
  };

  if (loading) return <Loader />; // ✅ показуємо Loader поки завантажується

  return (
    <section className="section">
      <div className="container">
        <CategoryFilter
          categories={['Всі', ...categories]}
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
        />

        <ProductList
          products={initialData.products}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={initialData.total}
          activeCategory={activeCategory}
          onPageChange={handlePageChange}
        />

        {isDesktop && initialData.total > ITEMS_PER_PAGE && (
          <Pagination
            totalItems={initialData.total}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}
