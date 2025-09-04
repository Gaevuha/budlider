import styles from './CategoryFilter.module.css';

interface Props {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
}

export default function CategoryFilter({ activeCategory, setActiveCategory, categories }: Props) {
  return (
    <ul className={styles.categories}>
      {categories.map((category) => (
        <li key={category} className={styles.categories__item}>
          <button
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`${styles.categories__btn} ${
              activeCategory === category ? styles['categories__btn--active'] : ''
            }`}
          >
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
}