// components/Header/Header.tsx

import css from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={`${css.header} container`}>
      <Link href="/" aria-label="Home">
        Budlider
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Дім</Link>
          </li>
          <li>
            <Link href="/products">Каталог</Link>
          </li>
          <li>
            <Link href="/cart">Кошик</Link>
          </li>
          <li>
            <Link href="/wishlist">Перелік бажань</Link>
          </li>
          <li>
            <Link href="/profile">Профіль користувача</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
