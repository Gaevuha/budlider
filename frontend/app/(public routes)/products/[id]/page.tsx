//app/products/[id]/page.tsx
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getSingleProduct } from "@/lib/api";
import ProductDetailsClient from "./ProductDetailsclient";

type Props = {
  params: Promise<{ id: string }>;
};

const ProductDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: () => getSingleProduct(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailsClient />
    </HydrationBoundary>
  );
};

export default ProductDetails;
