// src/context/CartContext.ts
import { createContext } from 'react';
import type { Product } from '../types/product';

export interface CartContextType {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  isInitialized: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  totalCount: number;
  totalPrice: number;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
