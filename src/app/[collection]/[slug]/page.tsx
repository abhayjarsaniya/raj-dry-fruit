import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import {
  getProduct,
  isCollectionId,
  productPath,
  products,
  relatedProducts,
  weightsOf,
} from "@/data/catalog";
import { absoluteUrl, BRAND } from "@/data/site";

type Props = { params: Promise<{ collection: string; slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ collection: product.category, slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection, slug } = await params;
  const product = getProduct(slug);
  if (!product || product.category !== collection) return {};
  return {
    title: product.name,
    description: product.short,
    alternates: { canonical: productPath(product) },
    openGraph: {
      title: product.name,
      description: product.short,
      url: productPath(product),
      images: [product.image],
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { collection, slug } = await params;
  if (!isCollectionId(collection) || collection === "best-sellers") notFound();
  const product = getProduct(slug);
  if (!product || product.category !== collection) notFound();

  const offers = weightsOf(product).map((weight) => ({
    "@type": "Offer",
    priceCurrency: "INR",
    price: product.prices[weight],
    availability: "https://schema.org/InStock",
    url: absoluteUrl(productPath(product)),
    name: `${product.name} ${weight}`,
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    brand: { "@type": "Brand", name: BRAND },
    category: product.group,
    offers: offers.length === 1 ? offers[0] : offers,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <ProductDetail product={product} related={relatedProducts(product)} />
    </>
  );
}
