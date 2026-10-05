import type { ReactNode } from "react";
import { accentText, type Accent } from "@/data/catalog";

export function Eyebrow({ children, accent = "almond" }: { children: ReactNode; accent?: Accent }) {
  return <p className={`font-script text-2xl leading-none sm:text-4xl ${accentText(accent)}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  accent = "almond",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  accent?: Accent;
}) {
  return (
    <div className="max-w-2xl">
      <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
      <h2 className="mt-1.5 font-serif text-[1.75rem] font-medium leading-[1.12] text-ink sm:mt-3 sm:text-5xl sm:leading-[1.05]">
        {title}
      </h2>
      {text ? (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600 sm:mt-3.5 sm:text-base">
          {text}
        </p>
      ) : null}
    </div>
  );
}
