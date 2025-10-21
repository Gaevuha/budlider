import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchProductByIdServer } from '@/lib/serverApi';
import ProductDetailsClient from './ProductDetailsClient';

type ProductPageProps = {
  params: { id: string };
};

// Server Component (async)
export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id); // params доступні прямо

  const queryClient = new QueryClient();

  // Prefetch з серверного API
  await queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailsClient id={id} />
    </HydrationBoundary>
  );
}
