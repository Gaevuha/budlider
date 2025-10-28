// lib/api.ts

import axios from "axios";
import { Product } from "@/types/product";

export type ProductListResponse = {
  products: Product[];
  total: number;
};

axios.defaults.baseURL = "https://dummyjson.com";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async () => {
  await delay(2000);
  const res = await axios.get<ProductListResponse>("/products");
  return res.data;
};

export const getSingleProduct = async (id: string) => {
  const res = await axios.get<Product>(`/products/${id}`);
  return res.data;
};
