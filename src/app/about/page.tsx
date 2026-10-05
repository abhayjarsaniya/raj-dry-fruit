import type { Metadata } from "next";
import Link from "next/link";
import {
  BRAND_FULL,
  GOOGLE_MAPS_URL,
  STORE_ADDRESS,
  STORE_NAME,
  STORE_RATING,
  WHATSAPP_DISPLAY,
} from "@/data/site";
import { InquiryLink } from "@/components/inquiry-link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Raj Dryfruits & Mukhwas is a premium dry fruits, chocolates and celebration boxes store located on Anand Nagar Road, Ahmedabad.",
};

export default function AboutPage() {
  return (
    <div className="shell py-14 sm:py-20">
      <article className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6E2635]">
          About Raj Dryfruits &amp; Mukhwas
        </p>
        <h1 className="mt-3 font-serif text-4xl font-medium leading-[1.05] text-ink sm:text-6xl">
          Selected Slowly. Inquired Simply.
        </h1>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-stone-600">
          <p>
            {BRAND_FULL} is a local destination in Ahmedabad for premium dry fruits, chocolates, coffee, tea, mukhwas and festive celebration boxes. Our selection brings together wholesome nuts, rich chocolates and thoughtful gift combinations that we are genuinely proud to present.
          </p>
          <p>
            This website functions as a clean product catalog and WhatsApp inquiry portal. Choose your favourite items and weights freely (up to 10 quantity per product). When ready, share a few delivery details, and your inquiry opens directly in WhatsApp with {WHATSAPP_DISPLAY}.
          </p>
          <p>
            Our store team personally confirms availability, the final price, delivery and any special packaging requests. No confusing checkouts or online payment gateways — just personal, transparent local service.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-stone-200 bg-[#fbf9f6] p-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif text-xl font-semibold text-ink">{STORE_NAME}</h2>
            <span className="rounded-full bg-[#6E2635]/10 px-2.5 py-0.5 text-xs font-semibold text-[#6E2635]">
              ★ {STORE_RATING} on Google
            </span>
          </div>
          <address className="mt-3 not-italic text-sm leading-relaxed text-stone-600">
            <p>{STORE_ADDRESS.full}</p>
          </address>
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-[#6E2635]">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-[#5A1E2B]"
            >
              Get Directions on Google Maps →
            </a>
            <span className="text-stone-300">·</span>
            <span>Phone / WhatsApp: {WHATSAPP_DISPLAY}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3.5">
          <Link
            href="/dry-fruits"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#6E2635] px-7 text-sm font-medium text-white shadow-md transition hover:bg-[#5A1E2B]"
          >
            Explore Dry Fruits
          </Link>
          <InquiryLink className="inline-flex h-12 items-center justify-center rounded-full border border-[#6E2635] bg-white px-6 text-sm font-medium text-[#6E2635] shadow-sm transition hover:bg-[#6E2635]/5">
            Send Inquiry on WhatsApp
          </InquiryLink>
        </div>
      </article>
    </div>
  );
}
