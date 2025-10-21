import { NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const category = searchParams.get('category');
    const q = searchParams.get('q')?.trim();

    const limit = 6;
    const skip = (page - 1) * limit;

    let url = API_URL;
    let params: Record<string, string | number> = { limit, skip };

    // 🔹 Якщо є пошуковий запит
    if (q) {
      url = `${API_URL}/search`;
      params = { q }; // DummyJSON не підтримує skip/limit для search
    }

    // 🔹 Якщо є категорія (і не пошук)
    else if (category && category !== 'all') {
      url = `${API_URL}/category/${category}`;
      params = { limit, skip };
    }

    const response = await axios.get(url, { params });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('❌ Помилка у /api/products:', error);
    return NextResponse.json(
      { message: 'Помилка при отриманні продуктів' },
      { status: 500 },
    );
  }
}
