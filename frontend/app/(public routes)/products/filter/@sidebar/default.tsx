// app/products/filter/@sidebar/default.tsx

import Link from "next/link";
import { getCategories } from "@/lib/api";
import css from "./SidebarProducts.module.css";

const ProductsSidebar = async () => {
  const categories = await getCategories();

  return (
    <ul className={css.menuList}>
      <li>
        <Link href={`/products/filter/All`}>Всі категорії</Link>
      </li>
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/products/filter/${category.slug.charAt(0).toUpperCase() + category.slug.slice(1)}`}
            className={css.menuLink}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductsSidebar;
