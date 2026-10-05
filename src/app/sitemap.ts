import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";
import { absoluteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/dry-fruits", "/chocolates", "/coffee-tea", "/best-sellers", "/gifts", "/about", "/contact", "/shipping", "/privacy", "/terms", "/search"];
  const pages = staticPaths.map((path) => ({
    url: absoluteUrl(path || "/"),
    lastModified: new Date(),
  }));
  const productPages = products.map((product) => ({
    url: absoluteUrl(`/${product.category}/${product.slug}`),
    lastModified: new Date(),
  }));
  return [...pages, ...productPages];
}
