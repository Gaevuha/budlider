// components/Header/Header.tsx

import css from "./Header.module.css";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import { getCategories } from "@/lib/api";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";

const Header = async () => {
  const categories = await getCategories();

  return (
    <header className={`${css.header} container`}>
      <Link className={css.logo} href="/" aria-label="Site logo">
        <Logo />
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Дім</Link>
          </li>
          <li>
            <CategoriesMenu categories={categories} />
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
