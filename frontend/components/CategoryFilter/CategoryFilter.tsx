'use client';

import styles from './CategoryFilter.module.css';
import type { Category } from '@/types/product';

interface Props {
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
  categories: Category[];
}

export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
  categories,
}: Props) {
  return (
    <ul className={styles.categories}>
      {categories.map(category => (
        <li key={String(category.slug)} className={styles.categories__item}>
          <button
            type="button"
            onClick={() => setActiveCategory(String(category.slug))}
            className={`${styles.categories__btn} ${
              activeCategory === category.slug
                ? styles['categories__btn--active']
                : ''
            }`}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
