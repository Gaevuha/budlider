'use client';

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import NavItem from '@/components/NavItem/NavItem';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { cart } = useCart();
  const { wishlist } = useWishlist(); // якщо є wishlist

  return (
    <nav>
      <ul className={styles.nav__list}>
        <NavItem to="/" label="Дім" end />
        <NavItem to="/cart" label="Кошик" count={cart?.length || 0} />
        <NavItem
          to="/wishlist"
          label="Перелік бажань"
          count={wishlist?.length || 0}
        />
      </ul>
    </nav>
  );
}
