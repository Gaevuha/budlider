'use client';

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import NavItem from '@/components/NavItem/NavItem';
import styles from './Navigation.module.css';

interface NavigationProps {
  onLinkClick?: () => void;
}

export default function Navigation({ onLinkClick }: NavigationProps) {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav className={styles.nav__menu}>
      <ul className={styles.nav__list}>
        <NavItem to="/products" label="Каталог" end onClick={onLinkClick} />
        <NavItem
          to="/cart"
          label="Кошик"
          count={cart?.length || 0}
          onClick={onLinkClick}
        />
        <NavItem
          to="/wishlist"
          label="Перелік бажань"
          count={wishlist?.length || 0}
          onClick={onLinkClick}
        />
      </ul>
    </nav>
  );
}
