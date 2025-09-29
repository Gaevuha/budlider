'use client';

import { useState } from 'react';
import type { Product } from '../../types/product';
import styles from './ProductList.module.css';
import Modal from '../Modal/Modal';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Props {
  activeCategory: string;
  searchQuery: string;
  products: Product[];
  currentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
}

export default function ProductList({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1199px)');

  if (isDesktop) {
    return (
      <>
        <ul className={styles.products}>
          {products.map(product => (
            <li
              key={product.id}
              className={styles.products__item}
              onClick={() => openModal(product)}
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={300}
                height={300}
                className={styles['products__image']}
                priority
              />
              <p className={styles.products__title}>{product.title}</p>
              <p className={styles.products__brand}>
                <span className={styles['products__brand--bold']}>
                  Бренд: {product.brand}
                </span>
              </p>
              <p className={styles.products__category}>
                Категорія: {product.category}
              </p>
              <p className={styles.products__price}>
                Ціна: {product.price} грн.
              </p>
            </li>
          ))}
        </ul>
        {selectedProduct && (
          <Modal product={selectedProduct} onClose={closeModal} />
        )}
      </>
    );
  }

  // Мобілка та планшет → Swiper
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={isTablet}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={isTablet ? 2 : 1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <div
              className={styles.products__item}
              onClick={() => openModal(product)}
            >
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={300}
                height={300}
                className={styles['products__image']}
                priority
              />
              <p className={styles.products__title}>{product.title}</p>
              <p className={styles.products__brand}>
                <span className={styles['products__brand--bold']}>
                  Бренд: {product.brand}
                </span>
              </p>
              <p className={styles.products__category}>
                Категорія: {product.category}
              </p>
              <p className={styles.products__price}>
                Ціна: {product.price} грн.
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {selectedProduct && (
        <Modal product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
}
