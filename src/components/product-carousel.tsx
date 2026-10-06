"use client";

import Link from "next/link";
import { useRef, useState } from "react";
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
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const draggedDistance = useRef(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  function scrollBy(direction: number) {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.82, behavior: "smooth" });
  }

  // Desktop Mouse Drag to Scroll
  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    // Only handle primary button on devices with a mouse (not coarse touch pointers)
    if (e.button !== 0) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("input") || target.closest("[role='group']")) {
      return;
    }

    const node = scroller.current;
    if (!node) return;

    isDragging.current = true;
    startX.current = e.pageX - node.offsetLeft;
    scrollLeftStart.current = node.scrollLeft;
    draggedDistance.current = 0;
    setIsGrabbing(true);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging.current || !scroller.current) return;
    e.preventDefault();
    const x = e.pageX - scroller.current.offsetLeft;
    const walk = (x - startX.current) * 1.25;
    draggedDistance.current = Math.abs(walk);
    scroller.current.scrollLeft = scrollLeftStart.current - walk;
  }

  function handleMouseUp() {
    isDragging.current = false;
    setIsGrabbing(false);
  }

  function handleMouseLeave() {
    isDragging.current = false;
    setIsGrabbing(false);
  }

  function handleClickCapture(e: React.MouseEvent) {
    // If the user was dragging the carousel, suppress the click on cards/links
    if (draggedDistance.current > 6) {
      e.preventDefault();
      e.stopPropagation();
      draggedDistance.current = 0;
    }
  }

  return (
    <div className="w-full max-w-full">
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

      {/* Swipeable & Draggable Showcase:
          - Mobile: native horizontal finger swipe with touch-pan-y allowing smooth vertical page scrolling.
          - Desktop: mouse drag-to-scroll (grab/grabbing cursor), trackpad horizontal swipe, and arrow buttons.
          - Snap-proximity: prevents diagonal swipes from locking vertical page scrolling.
      */}
      <div
        ref={scroller}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClickCapture={handleClickCapture}
        style={{
          touchAction: "pan-x pan-y",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
        }}
        className={`no-scrollbar flex snap-x snap-proximity gap-2.5 overflow-x-auto overflow-y-hidden pb-3 sm:gap-4 ${
          isGrabbing ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {products.map((product, index) => (
          <div
            key={product.slug}
            className="flex w-[165px] shrink-0 snap-start min-[360px]:w-[172px] min-[390px]:w-[182px] min-[430px]:w-[195px] sm:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-4rem)/5.1)]"
          >
            <ProductCard product={product} priority={index === 0} showSubtext={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
