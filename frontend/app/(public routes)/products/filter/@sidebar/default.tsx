// app/products/filter/@sidebar/default.tsx

import Link from "next/link";
import { getCategories } from "@/lib/api";
import css from "./SidebarProducts.module.css";

const ProductsSidebar = async () => {
  const categories = await getCategories();

  return (
    <ul className={css.menuList}>
      <li>
        <Link href={`/products/filter/all`}>Всі категорії</Link>
      </li>
      {categories.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/products/filter/${category.slug}`}
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
