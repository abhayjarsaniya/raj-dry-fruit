"use client";

import type { InquiryLine } from "@/lib/whatsapp";
import { useStore } from "@/components/store";

export function InquiryLink({
  children,
  className,
  lines,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  lines?: InquiryLine[];
  onClick?: () => void;
}) {
  const { openInquiry } = useStore();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openInquiry(lines);
      }}
    >
      {children}
    </button>
  );
}
