"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  collections,
  defaultWeight,
  priceFor,
  weightsOf,
  type Product,
} from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/components/store";

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const weights = weightsOf(product);
  const [weight, setWeight] = useState(defaultWeight(product));
  const { lines, incrementItem, decrementItem, openInquiry } = useStore();

  const currentLine = lines.find((l) => l.slug === product.slug && l.weight === weight);
  const currentQty = currentLine ? currentLine.qty : 0;

  const price = priceFor(product, weight);
  const collection = collections[product.category];
  const bundle = product.category === "bundles";

  function handleAdd() {
    incrementItem(product.slug, weight);
  }

  function handleIncrement() {
    incrementItem(product.slug, weight);
  }

  function handleDecrement() {
    decrementItem(product.slug, weight);
  }

  return (
    <div className="shell py-8 sm:py-12">
      <nav className="text-xs text-stone-500 sm:text-sm" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-[#6E2635]">Home</Link>
        <span className="px-2 text-stone-400">/</span>
        <Link href={`/${product.category}`} className="transition-colors hover:text-[#6E2635]">{collection.nav}</Link>
        <span className="px-2 text-stone-400">/</span>
        <span className="font-medium text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[24px] border border-[#e6e2dc] bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            priority
            className="object-contain p-4 sm:p-8"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E2635]">
              {product.origin} · {product.group}
            </span>
            {product.bestseller && (
              <span className="rounded-full border border-[#6E2635]/30 bg-[#6E2635]/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#6E2635]">
                Bestseller
              </span>
            )}
          </div>

          <h1 className="mt-2 font-serif text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-stone-600 sm:text-lg">{product.short}</p>
          <p className="mt-3 text-sm leading-relaxed text-stone-500 sm:text-base">{product.description}</p>

          {product.includes.length > 0 ? (
            <div className="mt-6 rounded-[20px] border border-[#e6e2dc] bg-[#fbf9f6] p-5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6E2635]">
                What&apos;s Inside
              </h2>
              <p className="mt-1 text-xs text-stone-500">
                {product.includes.length} selections thoughtfully packed in this celebration box.
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {product.includes.map((entry) => (
                  <li key={entry} className="flex items-center gap-2 text-xs font-medium text-stone-700 sm:text-sm">
                    <span className="text-[#6E2635]">✓</span> {entry}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Weight Selection - Section 16: White background + Matte Maroon border + Matte Maroon text when selected */}
          <div className="mt-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
              {bundle ? "Box Size / Weight" : "Select Weight"}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {weights.map((option) => {
                const selected = option === weight;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setWeight(option)}
                    aria-pressed={selected}
                    className={`inline-flex min-h-[44px] min-w-[54px] items-center justify-center rounded-full border bg-white px-4 text-xs font-medium tracking-wide transition-all duration-200 sm:text-sm ${
                      selected
                        ? "border-[#6E2635] font-semibold text-[#6E2635]"
                        : "border-[#e4e0da] text-stone-600 [@media(hover:hover)]:hover:border-[#6E2635] [@media(hover:hover)]:hover:text-[#6E2635]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Indicative Price */}
          <div className="mt-7 border-t border-stone-100 pt-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-stone-400">Indicative Price</p>
            <p className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              {formatPrice(price)}
            </p>
          </div>

          {/* Section 6: Add to Inquiry -> − 1 + Controller */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {currentQty === 0 ? (
              <button
                type="button"
                onClick={handleAdd}
                className="flex h-12 flex-1 cursor-pointer items-center justify-center rounded-full bg-[#6E2635] px-6 text-sm font-medium text-white shadow-md transition-all duration-200 active:scale-[0.99] [@media(hover:hover)]:hover:-translate-y-[1px] [@media(hover:hover)]:hover:bg-[#5A1E2B]"
              >
                Add to Inquiry
              </button>
            ) : (
              <div className="flex flex-1 items-center justify-between rounded-full border border-stone-200 bg-white p-1 text-[#6E2635] shadow-sm animate-page sm:max-w-xs">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={handleDecrement}
                  className="flex h-10 w-11 items-center justify-center rounded-l-full text-lg font-semibold transition-colors duration-150 active:scale-95 [@media(hover:hover)]:hover:bg-[#6E2635]/10"
                >
                  −
                </button>
                <div className="text-center">
                  <span className="text-sm font-semibold sm:text-base">{currentQty}</span>
                  <span className="ml-1 text-[11px] text-stone-400">in inquiry</span>
                </div>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={currentQty >= 10}
                  onClick={handleIncrement}
                  className={`flex h-10 w-11 items-center justify-center rounded-r-full text-lg font-semibold transition-colors duration-150 active:scale-95 ${
                    currentQty >= 10
                      ? "cursor-not-allowed opacity-25"
                      : "[@media(hover:hover)]:hover:bg-[#6E2635]/10"
                  }`}
                  title={currentQty >= 10 ? "Maximum quantity reached (10 per product)" : "Increase quantity"}
                >
                  +
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                const targetQty = currentQty > 0 ? currentQty : 1;
                openInquiry([{ name: product.name, weight, qty: targetQty }]);
              }}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-[#6E2635] bg-white px-6 text-sm font-medium text-[#6E2635] shadow-sm transition-all duration-200 active:scale-[0.99] [@media(hover:hover)]:hover:bg-[#6E2635]/5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.76 14.04c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.41-.14-.95-.31-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.24-.28.64-.4.85-.4h.2c.2 0 .4-.02.58.02.22.04.46.24.64.64.2.46.64 1.58.7 1.7.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.24-.1.47.14.23.62 1.02 1.33 1.65.92.82 1.69 1.08 1.93 1.2.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26Z" />
              </svg>
              <span>Send Inquiry on WhatsApp</span>
            </button>
          </div>

          {currentQty >= 10 && (
            <p className="mt-2 text-xs font-medium text-[#6E2635]">
              Maximum quantity reached (10 per product). You can still add other products.
            </p>
          )}

          <p className="mt-3 text-xs leading-relaxed text-stone-400">
            * Indicative prices only. Store confirms fresh availability, final pricing, delivery and discounts directly on WhatsApp.
          </p>

          <div className="mt-10 grid gap-6 border-t border-stone-100 pt-8 sm:grid-cols-2">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6E2635]">
                Highlights
              </h2>
              <ul className="mt-3 space-y-2 text-xs leading-relaxed text-stone-700 sm:text-sm">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6E2635]" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6E2635]">
                Storage &amp; Care
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-stone-600 sm:text-sm">{product.storage}</p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-20 border-t border-stone-100 pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E2635]">You May Also Like</p>
          <h2 className="mt-2 font-serif text-3xl font-medium text-ink sm:text-4xl">
            Thoughtfully Selected for Gifting &amp; Sharing.
          </h2>
          <div className="mt-8 grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
