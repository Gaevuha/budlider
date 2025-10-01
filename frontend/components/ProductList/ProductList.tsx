'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Product } from '../../types/product';
import styles from './ProductList.module.css';
import Modal from '../Modal/Modal';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

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
  const openModal = (product: Product) => {
    setSelectedProduct(product);

    // 🛑 зупиняємо автоплей слайдера
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const closeModal = () => {
    setSelectedProduct(null);

    // ▶️ знову запускаємо автоплей
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1199px)');

  const swiperRef = useRef<SwiperClass | null>(null);

  const MAX_DISTANCE = 6; // ⚡ тут регулюєш радіус впливу

  const updateBullets = useCallback((swiper?: SwiperClass | null) => {
    const s = swiper ?? swiperRef.current;
    if (!s) return;

    const bullets = Array.from(
      document.querySelectorAll<HTMLSpanElement>('.swiper-pagination-bullet'),
    );
    if (!bullets.length) return;

    const activeIndex =
      typeof s.realIndex === 'number' ? s.realIndex : s.activeIndex ?? 0;
    const total = bullets.length;

    const MAX_DISTANCE = 15; // скільки булетів від активного зменшуємо
    const MIN_SIZE = 2; // мінімальний розмір
    const MAX_SIZE = 12; // розмір активного
    const MIN_OPACITY = 0.2; // прозорість на віддалених
    const MAX_OPACITY = 1; // активний

    bullets.forEach((b, i) => {
      const distance = Math.min(Math.abs(i - activeIndex), MAX_DISTANCE);
      const factor = (MAX_DISTANCE - distance) / MAX_DISTANCE;

      const size = MIN_SIZE + factor * (MAX_SIZE - MIN_SIZE);
      const opacity = MIN_OPACITY + factor * (MAX_OPACITY - MIN_OPACITY);

      b.style.width = `${size}px`;
      b.style.height = `${size}px`;
      b.style.opacity = `${opacity}`;
      b.style.backgroundColor = distance === 0 ? '#265e5e' : '#a0c4c4';
      b.style.transition = 'all 0.3s ease';
    });
  }, []);

  const handleOnSwiper = (swiper: SwiperClass) => {
    swiperRef.current = swiper;
    setTimeout(() => updateBullets(swiper), 0);
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    updateBullets(swiper);
  };

  useEffect(() => {
    if (swiperRef.current) {
      setTimeout(() => updateBullets(swiperRef.current), 0);
    }
  }, [products, updateBullets]);

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
                className={styles.products__image}
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

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        onSwiper={handleOnSwiper}
        onSlideChange={handleSlideChange}
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
