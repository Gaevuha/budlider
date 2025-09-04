import { useContext } from 'react';
import { WishlistContext } from '../context/wishlistContext';

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlistContext must be used within WishlistProvider');
  }
  return context;
}
