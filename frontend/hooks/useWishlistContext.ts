import { useWishlist } from "../context/WishlistContext";

export function useWishlistContext() {
  const context = useWishlist();
  if (!context) {
    throw new Error("useWishlistContext must be used within WishlistProvider");
  }
  return context;
}
