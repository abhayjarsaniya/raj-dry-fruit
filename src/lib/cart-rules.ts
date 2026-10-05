import { MAX_QTY_PER_PRODUCT, MAX_QTY_MESSAGE } from "@/data/site";

export type CartLine = {
  slug: string;
  weight: string;
  qty: number;
};

export function totalItemCount(lines: CartLine[]): number {
  if (!Array.isArray(lines)) return 0;
  return lines.reduce((total, line) => total + (Number(line.qty) || 0), 0);
}

export function uniqueProductCount(lines: CartLine[]): number {
  if (!Array.isArray(lines)) return 0;
  return new Set(lines.map((line) => line.slug)).size;
}

export function getLineQty(lines: CartLine[], slug: string, weight: string): number {
  if (!Array.isArray(lines)) return 0;
  const line = lines.find((l) => l.slug === slug && l.weight === weight);
  return line ? line.qty : 0;
}

export function addLine(
  lines: CartLine[],
  slug: string,
  weight: string,
  qty = 1,
): { lines: CartLine[]; ok: boolean; message?: string } {
  const currentQty = getLineQty(lines, slug, weight);
  if (currentQty >= MAX_QTY_PER_PRODUCT) {
    return { lines, ok: false, message: MAX_QTY_MESSAGE };
  }

  const newQty = Math.min(MAX_QTY_PER_PRODUCT, currentQty + Math.max(1, qty));
  const nextLines = setLineQty(lines, slug, weight, newQty);
  return { lines: nextLines, ok: true };
}

export function setLineQty(lines: CartLine[], slug: string, weight: string, qty: number): CartLine[] {
  if (qty <= 0) {
    return lines.filter((line) => !(line.slug === slug && line.weight === weight));
  }

  const targetQty = Math.min(MAX_QTY_PER_PRODUCT, Math.max(1, qty));
  const exists = lines.some((line) => line.slug === slug && line.weight === weight);
  if (!exists) {
    return [...lines, { slug, weight, qty: targetQty }];
  }

  return lines.map((line) =>
    line.slug === slug && line.weight === weight ? { ...line, qty: targetQty } : line,
  );
}

export function removeLine(lines: CartLine[], slug: string, weight: string): CartLine[] {
  return lines.filter((line) => !(line.slug === slug && line.weight === weight));
}
