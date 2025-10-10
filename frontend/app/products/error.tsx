'use client';

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>⚠️ Помилка при завантаженні даних</h2>
      <p>{error.message}</p>
      <button
        onClick={() => {
          // 🧠 очищаємо service worker cache (на випадок PWA або browser cache)
          if ('caches' in window) {
            caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
          }
          reset(); // ✅ викликає повторний рендер сторінки
        }}
        style={{
          background: '#f0ad4e',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Спробувати знову
      </button>
    </div>
  );
}
