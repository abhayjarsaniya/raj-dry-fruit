import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionView } from "@/components/collection-view";
import { collections, isCollectionId, productsFor } from "@/data/catalog";
import { absoluteUrl, BRAND } from "@/data/site";

type Props = { params: Promise<{ collection: string }> };

export function generateStaticParams() {
  return Object.keys(collections).map((collection) => ({ collection }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await params;
  if (!isCollectionId(collection)) return {};
  const info = collections[collection];
  return {
    title: info.metaTitle,
    description: info.description,
    alternates: { canonical: `/${collection}` },
    openGraph: {
      title: info.metaTitle,
      description: info.description,
      url: `/${collection}`,
      images: ["/images/hero-composition.jpg"],
    },
  };
}

export default async function Page({ params }: Props) {
  const { collection } = await params;
  if (!isCollectionId(collection)) notFound();
  const list = productsFor(collection);
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collections[collection].metaTitle,
    description: collections[collection].description,
    url: absoluteUrl(`/${collection}`),
    isPartOf: { "@type": "WebSite", name: BRAND, url: absoluteUrl("/") },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: list.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/${product.category}/${product.slug}`),
        name: product.name,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <CollectionView id={collection} />
    </>
  );
}
