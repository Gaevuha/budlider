// budlider/frontend/app/layout.tsx
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { WishlistProvider } from '@/context/WishlistContext';
import { CartProvider } from '@/context/CartContext';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import 'modern-normalize';
import './globals.css';

import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Будлідер — Інтернет-магазин будівельних матеріалів',
  description:
    'Інтернет-магазин БУДЛІДЕР спеціалізується на продажах товарів для будівництва, реконструкції, ремонту та обслуговування споруд житлового, комерційного та господарського призначення. Наші менеджери знають всі особливості продукції і допомагають клієнтам легко орієнтуватися у великому асортименті.',
  keywords: [
    'будівельні матеріали',
    'інструменти',
    'ремонт',
    'сантехніка',
    'електротовари',
    'товари для дому',
    'магазин будлідер',
  ],
  openGraph: {
    title: 'Будлідер — Інтернет-магазин будівельних матеріалів',
    description:
      'БУДЛІДЕР пропонує товари для будівництва, ремонту та обслуговування. Широкий асортимент, якісне обслуговування та швидка доставка по Україні.',
    url: siteUrl,
    siteName: 'Будлідер',
    images: [
      {
        url: `${siteUrl}/img-budlider.png`,
        width: 1200,
        height: 630,
        alt: 'Будлідер — Інтернет-магазин будівельних матеріалів',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Будлідер — Інтернет-магазин будівельних матеріалів',
    description:
      'Будівельні матеріали, інструменти, сантехніка, електротовари та товари для дому з доставкою по Україні.',
    images: [`${siteUrl}/img-budlider.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <TanStackProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              {children}
              {/* <Footer />  */}
            </WishlistProvider>
          </CartProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
