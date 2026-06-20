import { notFound } from "next/navigation";

const OPTION_TYPES = ["Woods", "Finishes", "Handles", "Worktops"];

export default async function OptionCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!category) notFound();

  const title = category
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-3">
          <div className="aspect-[4/5] bg-stone w-full" />
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-stone" />
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-8 self-start">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Kitchens</p>
          <h1 className="font-display text-4xl text-near-black mb-4">{title}</h1>
          <p className="text-near-black/70 leading-relaxed mb-8">
            Crafted from solid oak with your choice of door style, finish, and hardware.
            Every piece is made to measure and fitted by John.
          </p>

          <button className="flex items-center gap-3 border border-border px-6 py-3 text-sm text-near-black hover:border-primary hover:text-primary transition-colors mb-10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            Save to my selection
          </button>

          <div className="space-y-8">
            {OPTION_TYPES.map((type) => (
              <div key={type}>
                <h3 className="text-xs uppercase tracking-[0.15em] text-near-black/50 mb-3 pb-2 border-b border-border">
                  {type}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="group relative cursor-pointer">
                      <div className="aspect-square bg-stone hover:ring-2 ring-primary transition-all" />
                      <button
                        aria-label={`Save ${type} option ${i}`}
                        className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-3 h-3 text-near-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                      </button>
                      <p className="text-[0.6rem] text-near-black/50 mt-1">Option {i}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
