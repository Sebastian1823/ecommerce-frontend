import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    if (!res.ok) throw new Error();
    const json = await res.json();
    const products = json.data;
    if (!products || products.length === 0) {
      return [{ id: '1' }];
    }
    return products.map((product) => ({
      id: String(product.id),
    }));
  } catch (error) {
    return [{ id: '1' }];
  }
}

export default function ProductDetailPage({ params }) {
  return <ProductDetailClient id={params.id} />;
}