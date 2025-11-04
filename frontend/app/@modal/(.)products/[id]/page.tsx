// app/@modal/(.)products/[id]/page.tsx
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getSingleProduct } from "@/lib/api";
import ProductPreviewClient from "./ProductPreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPreview({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPreviewClient id={id} />
    </HydrationBoundary>
  );
}
