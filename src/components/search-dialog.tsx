"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/data/catalog";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store";

const hints = ["Almond", "Cashew", "Pistachio", "Dates", "Chocolate", "Coffee", "Tea"];

export function SearchDialog() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const results = useMemo(() => searchProducts(query), [query]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="shell flex h-full max-w-none flex-col py-5">
        <div className="flex items-center gap-3">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search almonds, cashews, chocolate, tea…"
            aria-label="Search products"
            className="h-14 flex-1 rounded-full border border-stone-200 px-5 text-base outline-none focus:border-ink"
          />
          <button type="button" onClick={() => setSearchOpen(false)} className="h-14 rounded-full px-4 text-sm">
            Close
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {hints.map((hint) => (
            <button
              key={hint}
              type="button"
              onClick={() => setQuery(hint)}
              className="rounded-full bg-mist px-3 py-2 text-xs uppercase tracking-[0.14em] text-stone-600"
            >
              {hint}
            </button>
          ))}
        </div>
        <div className="mt-8 flex-1 overflow-y-auto pb-16">
          {!query.trim() ? (
            <p className="text-stone-500">Start typing to see matching products immediately.</p>
          ) : results.length === 0 ? (
            <p className="font-serif text-3xl text-ink">Nothing matches “{query}”.</p>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-stone-500">{results.length} matches</p>
                <button
                  type="button"
                  className="text-sm underline underline-offset-4"
                  onClick={() => {
                    setSearchOpen(false);
                    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                  }}
                >
                  Open full results →
                </button>
              </div>
              <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {results.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
