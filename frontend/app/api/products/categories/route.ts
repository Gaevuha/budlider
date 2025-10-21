export const dynamic = 'force-dynamic'; // щоб Next.js не кешував статично
import { NextResponse } from 'next/server';

const API_BASE = 'https://dummyjson.com';

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/products/categories`);
    if (!res.ok) throw new Error('Помилка отримання категорій');

    const data = await res.json();
    return NextResponse.json(data); // повертаємо масив
  } catch (err) {
    console.error('Помилка отримання категорій:', err);
    return NextResponse.json(
      { error: 'Не вдалося отримати категорії' },
      { status: 500 },
    );
  }
}
