"use client";

import Image from "next/image";
import Link from "next/link";
import { getProduct, priceFor, productPath } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/components/store";

export function CartDrawer() {
  const {
    lines,
    cartOpen,
    setCartOpen,
    totalCount,
    incrementItem,
    decrementItem,
    removeItem,
    openInquiry,
    showNotice,
  } = useStore();

  if (!cartOpen) return null;

  const detailed = lines
    .map((line) => {
      const product = getProduct(line.slug);
      if (!product) return null;
      return { line, product, price: priceFor(product, line.weight) };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const subtotal = detailed.reduce((acc, { line, price }) => acc + price * line.qty, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close inquiry cart"
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      <aside className="fixed inset-y-0 right-0 flex w-full max-w-full flex-col bg-white shadow-2xl transition-all sm:max-w-md sm:rounded-l-[2rem]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4 sm:px-6 sm:py-5">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">Inquiry Cart</h2>
            <p className="mt-0.5 text-xs text-stone-500">
              {totalCount > 0 ? `${totalCount} ${totalCount === 1 ? "item" : "items"} selected` : "Your inquiry is empty"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition-colors [@media(hover:hover)]:hover:border-[#6E2635] [@media(hover:hover)]:hover:text-[#6E2635]"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
          {detailed.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f5f2] text-2xl text-[#6E2635]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 7h15l-1.6 8.2a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L5.2 4.8H3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="20" r="1.3" fill="currentColor" />
                  <circle cx="17" cy="20" r="1.3" fill="currentColor" />
                </svg>
              </div>
              <p className="mt-4 font-serif text-2xl text-ink">Your inquiry is empty.</p>
              <p className="mt-2 max-w-xs text-xs text-stone-500 sm:text-sm">
                Explore our dry fruits, chocolates, coffee and celebration boxes to build your inquiry.
              </p>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-[#6E2635] px-6 text-xs font-medium text-white transition-all duration-200 active:scale-95 [@media(hover:hover)]:hover:bg-[#5A1E2B]"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-stone-100">
              {detailed.map(({ line, product, price }) => (
                <li key={`${line.slug}-${line.weight}`} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex gap-3">
                    <Link
                      href={productPath(product)}
                      onClick={() => setCartOpen(false)}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-stone-100 bg-[#fbf9f6]"
                    >
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        className="object-contain p-1.5"
                        sizes="80px"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={productPath(product)}
                            onClick={() => setCartOpen(false)}
                            className="line-clamp-1 font-serif text-base font-medium text-ink transition-colors hover:text-[#6E2635] sm:text-lg"
                          >
                            {product.name}
                          </Link>
                          <div className="mt-0.5 flex items-center gap-2">
                            <span className="inline-block rounded border border-stone-200 bg-stone-50 px-2 py-0.5 text-xs font-medium text-stone-700">
                              {line.weight}
                            </span>
                            <span className="text-xs text-stone-500">{formatPrice(price)} each</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(line.slug, line.weight)}
                          className="inline-flex min-h-[40px] items-center px-2 py-1 text-xs text-stone-400 transition-colors [@media(hover:hover)]:hover:text-[#6E2635]"
                          aria-label={`Remove ${product.name}`}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Plus / Minus quantity controller - Section 12 & 15 */}
                        <div className="inline-flex min-h-[44px] items-center rounded-full border border-stone-200 bg-white text-[#6E2635] shadow-sm">
                          <button
                            type="button"
                            aria-label={`Decrease ${product.name}`}
                            className="flex h-11 w-11 items-center justify-center rounded-l-full text-base font-semibold transition-colors duration-150 active:scale-95 [@media(hover:hover)]:hover:bg-[#6E2635]/10"
                            onClick={() => decrementItem(line.slug, line.weight)}
                          >
                            −
                          </button>
                          <span className="min-w-7 text-center text-xs font-semibold sm:text-sm">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase ${product.name}`}
                            disabled={line.qty >= 10}
                            className={`flex h-11 w-11 items-center justify-center rounded-r-full text-base font-semibold transition-colors duration-150 active:scale-95 ${
                              line.qty >= 10
                                ? "cursor-not-allowed opacity-25"
                                : "[@media(hover:hover)]:hover:bg-[#6E2635]/10"
                            }`}
                            onClick={() => {
                              if (line.qty >= 10) {
                                showNotice("Maximum quantity reached (10 per product)", "limit");
                              } else {
                                incrementItem(line.slug, line.weight);
                              }
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-stone-400">Total: </span>
                          <span className="font-serif text-base font-medium text-ink">
                            {formatPrice(price * line.qty)}
                          </span>
                        </div>
                      </div>

                      {line.qty >= 10 && (
                        <p className="mt-1 text-right text-[11px] font-medium text-[#6E2635]">
                          Maximum quantity reached (10 per product)
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Section 7 Footer: Show Total Items count + Send Inquiry on WhatsApp */}
        {detailed.length > 0 && (
          <div className="border-t border-stone-100 bg-[#faf8f5] px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-serif text-lg font-semibold text-ink sm:text-xl">
                  {totalCount} {totalCount === 1 ? "Item" : "Items"}
                </span>
                <p className="text-[11px] text-stone-500">Indicative Subtotal</p>
              </div>
              <span className="font-serif text-xl font-semibold text-ink sm:text-2xl">
                {formatPrice(subtotal)}
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-stone-500">
              * Indicative prices only. Store owner confirms availability, final pricing, delivery and discounts directly on WhatsApp.
            </p>

            <button
              type="button"
              onClick={() => openInquiry()}
              className="mt-4 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#6E2635] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 active:scale-[0.99] [@media(hover:hover)]:hover:-translate-y-[1px] [@media(hover:hover)]:hover:bg-[#5A1E2B]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.76 14.04c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.41-.14-.95-.31-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.24-.28.64-.4.85-.4h.2c.2 0 .4-.02.58.02.22.04.46.24.64.64.2.46.64 1.58.7 1.7.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.24-.1.47.14.23.62 1.02 1.33 1.65.92.82 1.69 1.08 1.93 1.2.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26Z" />
              </svg>
              <span>Send Inquiry on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="mt-2.5 flex min-h-[46px] w-full items-center justify-center rounded-full border border-stone-300 bg-white px-5 py-2.5 text-xs font-medium text-stone-700 transition-colors sm:text-sm [@media(hover:hover)]:hover:border-ink [@media(hover:hover)]:hover:text-ink"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

export function NoticeToast() {
  const { notice, setCartOpen } = useStore();
  if (!notice) return null;
  const limit = notice.tone === "limit";

  return (
    <div className="fixed bottom-20 left-1/2 z-[70] w-[min(92vw,24rem)] -translate-x-1/2 animate-rise lg:bottom-8">
      <div
        className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3 shadow-lg ${
          limit
            ? "border border-[#6E2635]/40 bg-white text-[#6E2635]"
            : "bg-[#6E2635] text-white"
        }`}
      >
        <p className="text-xs font-medium leading-snug sm:text-sm">{notice.message}</p>
        {!limit ? (
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="shrink-0 text-xs font-semibold underline underline-offset-4"
          >
            View Cart
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function MobileDock() {
  const { cartOpen, menuOpen, searchOpen, inquiryOpen, setCartOpen, totalCount, ready } = useStore();
  if (cartOpen || menuOpen || searchOpen || inquiryOpen || !ready || totalCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#eeeae4] bg-white/95 px-5 py-3 shadow-lg backdrop-blur lg:hidden">
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-[#6E2635] px-5 py-3 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.99]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 7h15l-1.6 8.2a2 2 0 0 1-2 1.6H9.2a2 2 0 0 1-2-1.6L5.2 4.8H3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="20" r="1.3" fill="currentColor" />
          <circle cx="17" cy="20" r="1.3" fill="currentColor" />
        </svg>
        <span>View Inquiry Cart ({totalCount} {totalCount === 1 ? "item" : "items"})</span>
      </button>
    </div>
  );
}
