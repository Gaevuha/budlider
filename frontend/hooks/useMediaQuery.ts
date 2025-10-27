"use client";
import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    // Початкове значення перевіряється лише на клієнті
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // Слухаємо зміни
    media.addEventListener("change", listener);

    // Очищення
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
