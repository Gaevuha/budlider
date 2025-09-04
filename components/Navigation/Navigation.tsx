'use client';
import NavItem from '../NavItem/NavItem';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();

  return (
    <ul className={styles.nav__list}>
      <NavItem to="/" label="Дім" end />
      <NavItem to="/cart" label="Кошик" count={cartItems.length} />
      <NavItem to="/wishlist" label="Перелік бажань" count={wishlist.length} />
      {/* Додаткові NavItem можна додавати сюди */}
    </ul>
  );
}
