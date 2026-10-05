import Link from "next/link";
import { BRAND, BRAND_FULL } from "@/data/site";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex min-w-0 items-center gap-2 sm:gap-2.5 ${className}`}
      aria-label={BRAND_FULL}
    >
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#6E2635] text-[#6E2635] sm:h-9 sm:w-9"
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" fill="none">
          <path
            d="M16 5c2.2 3.4 7 6.2 7 11.2A7 7 0 1 1 9 16.2C9 11.2 13.8 8.4 16 5Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M16 13.5v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <div className="flex flex-col">
        <span className="truncate whitespace-nowrap font-serif text-[14px] font-semibold leading-none tracking-tight text-ink min-[360px]:text-[15px] sm:text-xl">
          {BRAND}
        </span>
        <span className="hidden text-[9px] font-medium uppercase tracking-[0.16em] text-[#6E2635] min-[400px]:inline-block">
          &amp; Mukhwas
        </span>
      </div>
    </Link>
  );
}
