'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavItem.module.css';

interface NavItemProps {
  to: string;
  label: string;
  count?: number; // лічильник опціональний
  end?: boolean; // чи точне співпадіння маршруту
}

export default function NavItem({ to, label, count, end }: NavItemProps) {
  const pathname = usePathname() ?? '/';
  const isActive = end ? pathname === to : pathname.startsWith(to);
  const showCount = typeof count === 'number';

  return (
    <li className={styles['nav__item']}>
      <Link
        href={to}
        className={`${styles['nav__link']} ${
          isActive ? styles['nav__link--active'] : ''
        }`}
      >
        {label}
        {showCount && <span className={styles['nav__count']}>{count}</span>}
      </Link>
    </li>
  );
}
