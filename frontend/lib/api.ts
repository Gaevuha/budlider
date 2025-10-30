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
  category?: string,
  limit: number = 10,
  skip: number = 0
): Promise<ProductListResponse> => {
  const endpoint = category
    ? `/products/category/${category}?limit=${limit}&skip=${skip}`
    : `/products?limit=${limit}&skip=${skip}`;

  const res = await axios.get<ProductListResponse>(endpoint);
  return res.data;
};

export const searchProducts = async (
  query: string,
  limit: number = 10,
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
