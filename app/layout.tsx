// layout.tsx
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { WishlistProvider } from '@/context/WishlistProvider';
import { CartProvider } from '@/context/CartProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import 'modern-normalize';
import './globals.css';

export const metadata = {
  title: 'Budlider Store',
  description: 'Next.js + React Query Shop',
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
              <Header /> {/* тут стан пошуку буде всередині Header */}
              {children}
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
