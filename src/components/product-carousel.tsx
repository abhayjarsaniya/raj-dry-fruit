"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/product-card";

export function ProductCarousel({
  products,
  label,
  href,
}: {
  products: Product[];
  label: string;
  href: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollBy(direction: number) {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.82, behavior: "smooth" });
  }

  return (
    <div>
      {/* Carousel Controls: Arrows HIDDEN on mobile, shown on desktop (md+) */}
      <div className="mb-3.5 flex items-center justify-between sm:mb-6 sm:justify-end sm:gap-2">
        <Link
          href={href}
          className="text-xs font-semibold tracking-wide text-[#6E2635] underline-offset-4 hover:underline sm:order-last sm:ml-2 sm:text-sm"
        >
          {label}
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            aria-label="Scroll products back"
            onClick={() => scrollBy(-1)}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-base text-stone-700 transition hover:border-[#6E2635] hover:text-[#6E2635] md:inline-flex"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Scroll products forward"
            onClick={() => scrollBy(1)}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-base text-stone-700 transition hover:border-[#6E2635] hover:text-[#6E2635] md:inline-flex"
          >
            →
          </button>
        </div>
      </div>

      {/* Swipeable Carousel: smooth horizontal browsing while allowing native vertical page scrolling */}
      <div
        ref={scroller}
        className="no-scrollbar flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-3 touch-pan-y sm:gap-4"
      >
        {products.map((product, index) => (
          <div
            key={product.slug}
            className="flex w-[160px] shrink-0 snap-start min-[360px]:w-[168px] min-[390px]:w-[176px] min-[430px]:w-[188px] sm:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-4rem)/5.1)]"
          >
            <ProductCard product={product} priority={index === 0} showSubtext={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
