'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProducts } from '@/lib/api';
import styles from './SearchForm.module.css';

interface SearchFormProps {
  onClose?: () => void;
}

export default function SearchForm({ onClose }: SearchFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSearch = async (formData: FormData) => {
    const value = formData.get('searchValue')?.toString().trim();
    if (!value) return;

    try {
      const result = await fetchProducts(1);
      const filtered = result.products.filter(p =>
        p.title.toLowerCase().includes(value.toLowerCase()),
      );

      if (filtered.length > 0) {
        router.push(`/products?search=${encodeURIComponent(value)}`);
      } else {
        router.push('/?notfound=true');
      }

      onClose?.(); // ✅ Закриваємо панель після пошуку
    } catch {
      router.push('/?error=true');
      onClose?.();
    }
  };

  return (
    <form className={styles['search-form']} action={handleSearch}>
      <input
        ref={inputRef}
        className={styles['search-form__input']}
        type="text"
        name="searchValue"
        placeholder="Введіть назву товару"
      />
      <button
        type="button"
        className={styles['search-form__btn-clear']}
        onClick={handleClear}
        aria-label="Очистити пошук"
      >
        ×
      </button>
      <button type="submit" className={styles['search-form__btn']}>
        Пошук
      </button>
    </form>
  );
}
