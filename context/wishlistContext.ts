import { createContext } from 'react';

export interface WishlistContextType {
  wishlist: number[]; // масив ID товарів
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  isInitialized: boolean;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
