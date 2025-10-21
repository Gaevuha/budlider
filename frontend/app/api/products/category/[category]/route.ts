import { NextResponse, NextRequest } from 'next/server';
import axios, { AxiosError } from 'axios';

const API_BASE = 'https://dummyjson.com/products';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ category: string }> },
) {
  const urlObj = new URL(req.url);
  const page = Number(urlObj.searchParams.get('page')) || 1;
  const limit = 15;
  const skip = (page - 1) * limit; // ⬅ оголосили поза try

  try {
    const { category } = await context.params;

    let url = '';

    if (category === 'all') {
      url = `${API_BASE}?limit=${limit}&skip=${skip}`;
    } else {
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
        return NextResponse.json({
          products: [],
          total: 0,
          skip, // ⬅ тепер доступний
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
