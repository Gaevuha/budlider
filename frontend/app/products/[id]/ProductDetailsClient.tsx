'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProductByIdClient } from '@/lib/clientApi';
import Image from 'next/image';
import ProductActions from './ProductActions';
import styles from './DetailProduct.module.css';
import Loader from '@/components/Loader/Loader';
import ErrorComponent from '@/app/products/error';

type Props = {
  id: number;
};

export default function ProductDetailsClient({ id }: Props) {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductByIdClient(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (isError || !product)
    return (
      <ErrorComponent
        error={error instanceof Error ? error : new Error('Невідома помилка')}
        reset={() => {}}
      />
    );

  return (
    <div className="section">
      <div className={`${styles.productPage__container} container`}>
        <div className={styles.productPage__img}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={styles.productPage__content}>
          <h1 className={styles.productPage__title}>{product.title}</h1>
          <ul className={styles.productPage__tags}>
            <li className={styles.productPage__tag}>{product.category}</li>
            <li className={styles.productPage__tag}>{product.brand}</li>
          </ul>
          <p className={styles.productPage__description}>
            {product.description}
          </p>
          <p className={styles.productPage__price}>
            Ціна: {product.price} грн.
          </p>
        </div>
        <ProductActions product={product} />
      </div>
    </div>
  );
}
