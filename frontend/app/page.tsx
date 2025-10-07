'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './HomePage.module.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const notfound = searchParams.get('notfound');
    const error = searchParams.get('error');

    if (notfound === 'true') {
      setMessage('Товар не знайдено. Повертаємося на головну сторінку');
      setTimeout(() => {
        setMessage('');
        router.replace('/');
      }, 2000);
    } else if (error === 'true') {
      setMessage('Сталася помилка при пошуку');
      setTimeout(() => {
        setMessage('');
        router.replace('/');
      }, 2000);
    }
  }, [searchParams, router]);

  return (
    <main className={styles.main}>
      {message && (
        <div className={styles.overlay}>
          <p>{message}</p>
        </div>
      )}

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
              />
              <h3>Екскаватор</h3>
              <p>Копання котлованів, траншей, планування ділянки.</p>
            </li>
            <li className={styles.serviceCard}>
              <Image src="/crane.jpg" alt="Кран" width={200} height={200} />
              <h3>Кран</h3>
              <p>Підйом вантажів та монтаж конструкцій будь-якої складності.</p>
            </li>
            <li className={styles.serviceCard}>
              <Image src="/manitou.jpg" alt="Маніту" width={200} height={200} />
              <h3>Маніту</h3>
              <p>Телескопічний навантажувач для складів та майданчиків.</p>
            </li>
            <li className={styles.serviceCard}>
              <Image src="/truck.jpg" alt="Самоскид" width={200} height={200} />
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
            матеріалів до виконання земляних робіт та оренди техніки. Ми
            забезпечуємо клієнтів якісними товарами, швидкою доставкою та
            професійними консультаціями.
          </p>

          <p className={styles.text}>
            Наші спеціалісти допоможуть підібрати потрібні матеріали та
            комплектуючі для будь-яких проєктів — від приватного будівництва до
            масштабних об’єктів. Ми поєднуємо широкий вибір, надійність і
            вигідні ціни.
          </p>

          <h3 className={styles.subTitle}>Що ми пропонуємо</h3>
          <ul className={styles.featuresList}>
            <li>
              Будівельні матеріали: цемент, стяжки, газобетон, клей, шпаклівки.
            </li>
            <li>Цегла керамічна, декоративні панелі, фарби та барвники.</li>
            <li>
              Покрівельні матеріали, металопрокат, утеплювачі та ізоляція.
            </li>
            <li>Інструменти, сантехніка, електротовари, фітинги.</li>
            <li>Оренда спецтехніки: екскаватор, маніту, кран, самоскид.</li>
            <li>Земляні роботи, доставка матеріалів на об’єкт.</li>
          </ul>

          <p className={styles.text}>
            Обираючи <strong>БУДЛІДЕР</strong>, ви отримуєте надійного партнера
            у будівництві — від фундаменту до чистового оздоблення.
          </p>
        </div>
      </section>
    </main>
  );
}
