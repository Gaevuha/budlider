import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <ReactPaginate
      key={pageCount} // 🔄 ререндер при зміні сторінок
      pageCount={pageCount}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={pageCount > 0 ? currentPage - 1 : 0} // ✅ безпечне оновлення
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
    />
  );
}
