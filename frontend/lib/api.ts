// lib/api.ts

import axios from "axios";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductListResponse = {
  products: Product[];
  total: number;
};

axios.defaults.baseURL = "https://dummyjson.com";

export const getProducts = async () => {
  const res = await axios.get<ProductListResponse>("/products");
  return res.data;
};
