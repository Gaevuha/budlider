"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts, searchProducts, ProductListResponse } from "@/lib/api";
import ProductList from "@/components/ProductList/ProductList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";

interface ProductsClientProps {
  initialCategory?: string;
  initialData?: ProductListResponse;
}

export default function ProductsClient({
  initialCategory,
  initialData,
}: ProductsClientProps) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearchQuery] = useDebounce(inputValue, 300);
  const [page, setPage] = useState(1);
  const limit = 9;

  const normalizedCategory =
    initialCategory?.toLowerCase() === "all"
      ? undefined
      : initialCategory?.toLowerCase();

  const { data, isLoading, isError, error } = useQuery<ProductListResponse>({
    queryKey: [
      "products",
      normalizedCategory ?? "all",
      debouncedSearchQuery,
      page,
    ],
    queryFn: async () => {
      const skip = (page - 1) * limit;
      if (debouncedSearchQuery) {
        return await searchProducts(debouncedSearchQuery, limit, skip);
      } else {
        return await getProducts(normalizedCategory, limit, skip);
      }
    },
    initialData,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const products = data?.products ?? [];
  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  if (isLoading && (!data || products.length === 0)) return <Loader />;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div>
      <SearchBox
        value={inputValue}
        onSearch={(value) => {
          setInputValue(value);
          setPage(1);
        }}
      />

      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p>No products found.</p>
      )}

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </div>
  );
}
