import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const API_BASE = 'https://dummyjson.com/products';

export async function GET(
  req: Request,
  { params }: { params: { category: string } },
) {
  const { category } = params;
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = 15;
  const skip = (page - 1) * limit;

  try {
    let url = '';

    if (category === 'all') {
      // ✅ Усі товари
      url = `${API_BASE}?limit=${limit}&skip=${skip}`;
    } else {
      // ✅ Товари конкретної категорії
      url = `${API_BASE}/category/${encodeURIComponent(
        category,
      )}?limit=${limit}&skip=${skip}`;
    }

    console.log(`🟢 [API route] Запит до DummyJSON: ${url}`);

    const { data } = await axios.get(url);

    console.log(
      `✅ [API route] Отримано ${data.products?.length ?? 0} товарів`,
    );
    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      console.error(
        `🔴 [API route] AxiosError: ${err.response?.status} ${err.message}`,
      );

      if (err.response?.status === 404) {
        // Якщо категорії не існує — повертаємо порожній масив
        return NextResponse.json({
          products: [],
          total: 0,
          skip,
          limit,
        });
      }
    }

    console.error('🔴 [API route] Невідома помилка:', error);
    return NextResponse.json(
      { error: 'Помилка при завантаженні товарів' },
      { status: 500 },
    );
  }
}
