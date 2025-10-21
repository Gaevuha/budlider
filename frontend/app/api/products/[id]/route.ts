// app/api/products/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';

const API_BASE = 'https://dummyjson.com';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // тепер params це Promise
) {
  try {
    const { id } = await context.params; // ⬅ чекаємо Promise
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching product:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
