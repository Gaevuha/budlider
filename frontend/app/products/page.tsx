import ProductsClient from './ProductsClient';

interface ProductsPageProps {
  searchParams?: { search?: string };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const searchQuery = searchParams?.search || '';

  return <ProductsClient initialSearch={searchQuery} />;
}
