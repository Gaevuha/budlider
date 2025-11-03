"use client";
//app/products/[id]/ProductDetails.client.tsx

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleProduct } from "@/lib/api";
import Image from "next/image";
import ProductActions from "@/components/ProductActions/ProductActions";
import styles from "./DetailProduct.module.css";
import { useRouter } from "next/navigation";

const ProductDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Some error..</p>;

  const handleGoBack = () => {
    const isSure = confirm("Ви дійсно бажаєте повернутись?");
    if (isSure) {
      router.back();
    }
  };

  return (
    <section className="section">
      <div className={`${styles.productPage__container} container`}>
        <button className={styles.btn__back} onClick={handleGoBack}>
          Назад
        </button>
        <div className={styles.productPage__img}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className={styles.productPage__content}>
          <h1 className={styles.productPage__title}>{product.title}</h1>
          <ul className={styles.productPage__tags}>
            <li className={styles.productPage__tag}>{product.category}</li>
            <li className={styles.productPage__tag}>{product.brand}</li>
          </ul>
          <p className={styles.productPage__description}>
            {product.description}
          </p>
          <p className={styles.modalProduct__shippingInformation}>
            Доставка: Доставка на адресу замовника
          </p>
          <p className={styles.modalProduct__returnPolicy}>
            Політика повернення: Повернення на протязі 14 днів
          </p>
          <p className={styles.productPage__price}>
            Ціна: {product.price} грн.
          </p>
        </div>
        <ProductActions product={product} />
      </div>
    </section>
  );
};

export default ProductDetailsClient;
