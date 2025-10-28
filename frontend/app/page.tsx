// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import styles from "./HomePage.module.css";

export default async function HomePage() {
  return (
    <main className={styles.main}>
      {/* === Герой-секція === */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div>
              <h1 className={styles.title}>Будлідер — все для будівництва</h1>
              <p className={styles.subtitle}>
                Інтернет-магазин будівельних матеріалів, інструментів,
                сантехніки, електротоварів та фітингів. Також надаємо послуги
                спецтехніки: екскаватор, кран, маніту, самоскид.
              </p>
              <Link href="/products" className={styles.heroBtn}>
                Переглянути каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* === Послуги спецтехніки === */}
      <section className={styles.services}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Наші послуги спецтехніки</h2>
          <ul className={styles.servicesList}>
            <li className={styles.serviceCard}>
              <Image
                src="/excavator.jpg"
                alt="Екскаватор"
                width={200}
                height={200}
                priority
              />
              <h3>Екскаватор</h3>
              <p>Копання котлованів, траншей, планування ділянки.</p>
            </li>
            <li className={styles.serviceCard}>
              <Image
                src="/crane.jpg"
                alt="Кран"
                width={200}
                height={200}
                priority
              />
              <h3>Кран</h3>
              <p>Підйом вантажів та монтаж конструкцій будь-якої складності.</p>
            </li>
            <li className={styles.serviceCard}>
              <Image
                src="/manitou.jpg"
                alt="Маніту"
                width={200}
                height={200}
                priority
              />
              <h3>Маніту</h3>
              <p>Телескопічний навантажувач для складів та майданчиків.</p>
            </li>
            <li className={styles.serviceCard}>
              <Image
                src="/truck.jpg"
                alt="Самоскид"
                width={200}
                height={200}
                priority
              />
              <h3>Самоскид</h3>
              <p>Перевезення піску, щебеню, ґрунту та інших матеріалів.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* === Каталог товарів === */}
      <section className={styles.products}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Каталог товарів</h2>
          <p className={styles.text}>
            Ми пропонуємо все необхідне для будівництва та ремонту: цемент,
            клей, фарбу, утеплювачі, інструменти, сантехніку, електрику та
            господарські товари.
          </p>
          <Link href="/products" className={styles.productsBtn}>
            Переглянути всі товари
          </Link>
        </div>
      </section>

      {/* === Про компанію === */}
      <section className={styles.about}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Про компанію «Будлідер»</h2>
          <p className={styles.text}>
            Інтернет-магазин <strong>БУДЛІДЕР</strong> працює понад 10 років і
            пропонує повний спектр будівельних рішень — від постачання
            матеріалів до виконання земляних робіт та оренди техніки.
          </p>
        </div>
      </section>
    </main>
  );
}
