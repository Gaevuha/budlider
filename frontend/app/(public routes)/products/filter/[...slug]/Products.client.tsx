"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts, ProductListResponse } from "@/lib/api";
import ProductList from "@/components/ProductList/ProductList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";

interface ProductsClientProps {
  initialCategory?: string;
  initialData: ProductListResponse;
}

export default function ProductsClient({
  initialCategory,
  initialData,
}: ProductsClientProps) {
  const [category] = useState(initialCategory ?? "All");
  const categoryParam = category === "All" ? undefined : category.toLowerCase();

  const [inputValue, setInputValue] = useState("");
  const [debouncedSearchQuery] = useDebounce(inputValue, 300);
  const [page, setPage] = useState(1);
  const perPage = 9;

  const { data, isLoading, isError, error } = useQuery<ProductListResponse>({
    queryKey: ["products", categoryParam ?? "all", debouncedSearchQuery, page],
    queryFn: () =>
      getProducts(debouncedSearchQuery, page, perPage, categoryParam),
    initialData: page === 1 ? initialData : undefined, // тільки перша сторінка
    refetchOnMount: false,
    placeholderData: keepPreviousData, // показує дані попередньої сторінки
  });

  const products = data?.products ?? [];
  const totalPages = data ? Math.ceil(data.total / perPage) : 0;

  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <SearchBox
        value={inputValue}
        onSearch={(value) => {
          setInputValue(value);
          setPage(1); // скидка на першу сторінку при пошуку
        }}
      />
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p>No products found.</p>
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={(newPage) => {
            if (newPage !== page) setPage(newPage);
          }}
        />
      )}
    </>
  );
}
