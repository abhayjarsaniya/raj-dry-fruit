"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { productsFor, searchProducts } from "@/data/catalog";
import { ProductCard } from "@/components/product-card";
import { Eyebrow } from "@/components/section-heading";

export function SearchResults() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const results = useMemo(() => searchProducts(query), [query]);
  const suggestions = productsFor("best-sellers").slice(0, 4);

  return (
    <div className="shell py-12 sm:py-16">
      <Eyebrow accent="gold">Find it quickly</Eyebrow>
      <h1 className="mt-3 font-serif text-5xl text-ink">Search the house.</h1>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Almond, cashew, pistachio, dates, chocolate, coffee, tea"
        aria-label="Search products"
        className="mt-8 h-14 w-full rounded-full border border-stone-200 px-5 outline-none focus:border-ink"
      />
      {!query.trim() ? (
        <div className="mt-12">
          <p className="text-sm uppercase tracking-[0.16em] text-stone-400">A few places to start</p>
          <div className="mt-6 grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {suggestions.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <p className="mt-12 font-serif text-3xl">No matches for “{query}”.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 items-stretch gap-3 gap-y-8 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
