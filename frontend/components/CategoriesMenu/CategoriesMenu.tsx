"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Category } from "@/types/category";
import css from "./CategoriesMenu.module.css";

type Props = {
  categories: Category[];
};

const CategoriesMenu = ({ categories }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);

  // 🟢 Закриваємо меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button onClick={toggle} className={css.menuBtn}>
        Каталог
      </button>
      {isOpen && (
        <ul className={css.menu}>
          <li className={css.menuItem}>
            <Link
              href={`/products/filter/All`}
              onClick={() => setIsOpen(false)}
            >
              Всі категорії
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.slug} className={css.menuItem}>
              <Link
                href={`/products/filter/${
                  category.slug.charAt(0).toUpperCase() + category.slug.slice(1)
                }`}
                onClick={() => setIsOpen(false)}
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
