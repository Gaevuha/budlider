// lib/api.ts

import axios from "axios";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

export type ProductListResponse = {
  products: Product[];
  total: number;
};

axios.defaults.baseURL = "https://dummyjson.com";

export const getProducts = async (
  searchQuery: string = "",
  page: number = 1,
  perPage: number = 9,
  category?: string
): Promise<ProductListResponse> => {
  const skip = (page - 1) * perPage;

  // 🟢 Якщо є пошук — використовуємо /products/search
  if (searchQuery.trim()) {
    try {
      const res = await axios.get<ProductListResponse>("/products/search", {
        params: { q: searchQuery, limit: perPage, skip },
      });
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message || "Network Error");
      }
      throw error;
    }
  }

  // 🟡 Якщо є категорія — використовуємо /products/category/:category
  if (category && category.toLowerCase() !== "all") {
    try {
      const res = await axios.get<ProductListResponse>(
        `/products/category/${category.toLowerCase()}`,
        { params: { limit: perPage, skip } }
      );
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.message || "Network Error");
      }
      throw error;
    }
  }

  // 🔵 Якщо немає ні пошуку, ні категорії — беремо всі продукти
  try {
    const res = await axios.get<ProductListResponse>("/products", {
      params: { limit: perPage, skip },
    });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || "Network Error");
    }
    throw error;
  }
};
export const searchProducts = async (
  query: string,
  limit: number = 9,
  skip: number = 0
): Promise<ProductListResponse> => {
  const res = await axios.get<ProductListResponse>(
    `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
  );
  return res.data;
};

export const getSingleProduct = async (id: string) => {
  const res = await axios.get<Product>(`/products/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await axios.get<Category[]>("/products/categories");
  return res.data;
};
