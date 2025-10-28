"use client";
// app/not-found.tsx

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="not__found">
      <h1>404 - Сторінку не знайдено</h1>
      <p>Вас буде перенаправлено на головну через кілька секунд…</p>
    </div>
  );
};

export default NotFound;
