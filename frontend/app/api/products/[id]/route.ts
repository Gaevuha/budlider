// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';

const API_BASE = 'https://dummyjson.com';

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const res = await fetch(`${API_BASE}/products/${params.id}`);
  if (!res.ok) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
