'use client';

import SearchForm from '../SearchForm/SearchForm';
// import { useRouter } from 'next/navigation';
import Logo from '../Logo/Logo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Navigation from '../Navigation/Navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from './Header.module.css';

export default function Header() {
  // const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1199px)');
  const isDesktop = useMediaQuery('(min-width: 1200px)');

  // const handleSearch = async (formData: FormData) => {
  //   const searchValue = formData.get('searchValue')?.toString().trim() || '';
  //   localStorage.setItem('budlider_search', searchValue);
  //   router.push(`/?search=${encodeURIComponent(searchValue)}`);
  //   setIsSearchOpen(false);
  // };

  // 🔒 Блокування скролу, коли відкрито меню або пошук
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <header className={`${styles.header} ${styles.headerSection}`}>
      <div className="container">
        <div className={styles.headerInner}>
          {/* Logo */}
          <Link className={styles.logo} href="/" aria-label="Site logo">
            <Logo />
          </Link>

          <div className={styles.headerActions}>
            <ThemeToggle />

            {/* Мобілка і планшет → іконка пошуку */}
            {!isDesktop && (
              <button
                className={styles.iconBtn}
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <FiSearch className={styles.icon__btn} />
              </button>
            )}

            {/* Мобілка → бургер меню */}
            {!isTablet && !isDesktop && (
              <button
                className={styles.iconBtn}
                onClick={() => setIsMenuOpen(true)}
                aria-label="Menu"
              >
                <FiMenu className={styles.icon__btn} />
              </button>
            )}
          </div>

          {/* Десктоп → пошук + навігація */}
          {isDesktop && (
            <>
              <div className={styles.headerSearchDesktop}>
                <SearchForm />
              </div>
              <Navigation />
            </>
          )}

          {/* Планшет → тільки навігація */}
          {isTablet && <Navigation />}
        </div>
      </div>

      {/* Mobile/Tablet Search Sidebar */}
      {!isDesktop && (
        <div
          className={`${styles.searchSidebarBackdrop} ${
            isSearchOpen ? styles.open : ''
          }`}
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className={`${styles.searchSidebar} ${
              isSearchOpen ? styles.open : ''
            }`}
            onClick={e => e.stopPropagation()}
          >
            <button
              className={styles.iconBtn}
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              <FiX size={24} />
            </button>
            <SearchForm onClose={() => setIsSearchOpen(false)} /> {/* ✅ */}
          </div>
        </div>
      )}

      {/* Mobile Menu Sidebar */}
      {!isTablet && !isDesktop && (
        <div
          className={`${styles.navWrapperBackdrop} ${
            isMenuOpen ? styles.open : ''
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`${styles.navWrapper} ${isMenuOpen ? styles.open : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <button
              className={styles.iconBtn}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
            <Navigation onLinkClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
