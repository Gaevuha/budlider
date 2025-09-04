// src/context/CartProvider.tsx
'use client';

import { useState, useEffect } from 'react';
import { CartContext } from '../context/cartContext';
import type { Product } from '../types/product';

const CART_KEY = 'cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        console.warn('Invalid cart in localStorage');
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product: Product) => {
    if (!cartItems.find(item => item.id === product.id)) {
      setCartItems(prev => [...prev, product]);
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(p => p.id !== id));
  };

  const isInCart = (id: number) => {
    return cartItems.some(p => p.id === id);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCount = cartItems.length;
  const totalPrice = cartItems.reduce((sum, p) => sum + p.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        isInitialized,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
