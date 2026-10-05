import { notFound, redirect } from "next/navigation";
import { getProduct, productPath, products } from "@/data/catalog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  redirect(productPath(product));
}
