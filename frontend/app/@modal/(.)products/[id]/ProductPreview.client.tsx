"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { getSingleProduct } from "@/lib/api";
import Loader from "@/components/Loader/Loader";

type Props = {
  id: string;
};

export default function ProductPreviewClient({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  // 🟡 Поки дані вантажаться — нічого не показуємо (або можна додати спінер)
  if (isLoading) return <Loader />;

  // 🔴 Якщо сталася помилка — покажемо її звичайним блоком
  if (isError)
    return (
      <div className="error-modal">
        <p>
          Помилка:{" "}
          {error instanceof Error ? error.message : "Щось пішло не так"}
        </p>
        <button onClick={handleClose}>Закрити</button>
      </div>
    );

  // 🟢 Якщо дані отримані — рендеримо модалку
  if (!data) return null;

  return <Modal product={data} onClose={handleClose} />;
}
