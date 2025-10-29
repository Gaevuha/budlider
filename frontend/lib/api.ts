// lib/api.ts

import axios from "axios";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

export type ProductListResponse = {
  products: Product[];
  total: number;
};

axios.defaults.baseURL = "https://dummyjson.com";

export const getProducts = async (category?: string) => {
  const endpoint = category ? `/products/category/${category}` : `/products`;

  const res = await axios.get<ProductListResponse>(endpoint);
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
