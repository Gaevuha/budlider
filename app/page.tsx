import HomePageClient from './HomePageClient';

export default function HomePage() {
  // Серверний компонент не має стану, передає лише клієнтський компонент
  return (
    <main>
      <HomePageClient />
    </main>
  );
}
