"use client";
import { useState } from "react";
import Link from "next/link";
import { Category } from "@/types/category";
import css from "./CategoriesMenu.module.css";

type Props = {
  categories: Category[];
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const CategoriesMenu = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuBtn}>
        Каталог
      </button>
      {isOpen && (
        <ul className={css.menu}>
          <li className={css.menuItem}>
            <Link href={`/products/filter/All`} onClick={toggle}>
              Всі категорії
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.slug} className={css.menuItem}>
              <Link
                href={`/products/filter/${capitalize(category.slug)}`}
                onClick={toggle}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesMenu;
