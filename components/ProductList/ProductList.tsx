import { useState } from 'react';
import type { Product } from '../../types/product';
import styles from './ProductList.module.css';
import Modal from '../Modal/Modal';

interface Props {
  activeCategory: string;
  searchQuery: string;
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <>
      <ul className={styles.products}>
        {products.map(product => (
          <li
            key={product.id}
            className={styles.products__item}
            onClick={() => openModal(product)}
          >
            <img className={styles.products__image} src={product.thumbnail} alt={product.description} />
            <p className={styles.products__title}>{product.title}</p>
            <p className={styles.products__brand}>
              <span className={styles['products__brand--bold']}>Brand: {product.brand}</span>
            </p>
            <p className={styles.products__category}>Category: {product.category}</p>
            <p className={styles.products__price}>Price: {product.price} грн.</p>
          </li>
        ))}
      </ul>
      {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
    </>
  );
}
