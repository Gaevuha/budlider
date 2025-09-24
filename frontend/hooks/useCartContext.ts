import { useCart } from '../context/CartContext';

export function useCartContext() {
  const context = useCart();
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
}
