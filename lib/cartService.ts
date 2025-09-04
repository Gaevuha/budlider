// cartService.ts
import type { Product } from '../types/product';

const CART_KEY = 'cart';

export const getCart = (): Product[] => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCart = (cart: Product[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};
