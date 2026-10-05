import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="font-script text-4xl text-almond">Mislaid</p>
      <h1 className="mt-3 font-serif text-5xl text-ink">That page is not on the shelf.</h1>
      <p className="mt-4 text-stone-600">Try a collection, or search for the product by name.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="inline-flex h-12 items-center rounded-full bg-matte px-6 text-sm text-white">Home</Link>
        <Link href="/search" className="inline-flex h-12 items-center rounded-full border border-stone-300 px-6 text-sm">Search</Link>
      </div>
    </div>
  );
}
