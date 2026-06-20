"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import type { WishlistItem } from "@/types";
import HeartBtn from "@/components/HeartBtn";

// ─── Wishlist (localStorage) ──────────────────────────────────────────────────

const LS_KEY = "jf_wishlist";

function loadWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
}

function saveWishlist(items: WishlistItem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

// ─── Tab ──────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "doors", label: "Door Styles" },
  { id: "handles", label: "Handles & Knobs" },
  { id: "worktops", label: "Worktops" },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const MAKERS_DOORS = [
  { name: "Shaker", desc: "Timeless painted shaker — the most popular choice for kitchens and bedrooms.", img: "/images/options/doors/shaker-door-smooth-dove-grey.jpg" },
  { name: "Micro Shaker", desc: "A slim-profile shaker with a smaller inner bead — a more contemporary take on the classic.", img: "/images/options/doors/marlow-micro-shaker-ash-pidgeon.jpg" },
  { name: "Step Shaker", desc: "A deeper stepped profile for a bolder, more traditional look.", img: "/images/options/doors/steppef-shaker-door-smooth-cornforth-white.jpg" },
  { name: "Step Shaker Ash", desc: "Step shaker profile in natural ash — grained finish adds depth and warmth.", img: "/images/options/doors/step-shaket-ash-dove-grey.jpg" },
  { name: "Calaway Ash", desc: "Horizontal groove door in ash — a clean, contemporary alternative to the shaker.", img: "/images/options/doors/calaway-shaket-ash-dove-grey.jpg" },
  { name: "Capri", desc: "Curved-arch panel door — a graceful, classic look for painted kitchens.", img: "/images/options/doors/capri-door-smooth-elephants-breath.jpg" },
  { name: "Capri Ash", desc: "Capri profile in natural ash — arch door with a warm timber feel.", img: "/images/options/doors/capri-ash-door-railings.jpg" },
  { name: "Siena", desc: "Double arch panel door with a traditional French influence.", img: "/images/options/doors/siena-door-french-grey.jpg" },
  { name: "Ash Slab", desc: "Clean slab door in natural ash — minimal and contemporary.", img: "/images/options/doors/ash-slab-door-pigeon.jpg" },
  { name: "Marlon Ash", desc: "Horizontal-groove slab door in ash — understated modern style.", img: "/images/options/doors/marlon-ash-door-shaded-white.jpg" },
  { name: "Cardiff", desc: "A classic raised-panel door — traditional and elegant in painted finishes.", img: "/images/options/doors/cardiff-door-smooth-elephants-breath.jpg" },
  { name: "Porto", desc: "Raised Shaker with a subtle inner detail — adds refinement to a painted kitchen.", img: "/images/options/doors/porto-door-smooth-ammonite.jpg" },
  { name: "Telford", desc: "A three-piece vertical groove door — clean lines with a contemporary character.", img: "/images/options/doors/telford-door-smooth-cornforth-white.jpg" },
  { name: "J-Profile", desc: "Handleless J-profile door — a sleek, seamless contemporary look.", img: "/images/options/doors/j-profile-door-smooth-french-grey.jpg" },
  { name: "Plain Slab", desc: "Flat slab door — the most minimal, contemporary option available.", img: "/images/options/doors/plain-slab-smooth-downpipe.jpg" },
  { name: "Plain Slab with Groove", desc: "Slab door with a single decorative groove for subtle detail.", img: "/images/options/doors/plain-slab-with-groove-smooth-downpipe.jpg" },
  { name: "Mock Inframe", desc: "Gives the look of a traditional inframe kitchen with a modern construction.", img: "/images/options/doors/mock-inframe-smooth-purebrvk-stone.jpg" },
];

const HERITAGE_DOORS = [
  { name: "Slim Shaker", desc: "Slim shaker profile in solid oak — Rubio Monocoat 5% finish shown.", img: "/images/options/doors/slim-shaker-oak-rubio-5pct.jpg" },
  { name: "Calaway Oak", desc: "Calaway profile in solid oak — Rubio Smoke 5% finish shown.", img: "/images/options/doors/calaway-oak-rubio-smoke-5pct.jpg" },
  { name: "Calaway Ash", desc: "Contemporary horizontal groove door in natural ash — clear lacquer finish.", img: "/images/options/doors/calaway-oak-door-clear-laquer.jpg" },
  { name: "Step Shaker Oak", desc: "Step shaker profile in solid oak — clear lacquer finish shown.", img: "/images/options/doors/stepped-shaker-oak-door-clear-laquer.jpg" },
  { name: "Harrington Shaker", desc: "Slipped shaker door in solid oak — Rubio Smoke 5% finish shown.", img: "/images/options/doors/harrington-slipped-shaker-oak-door-rubio-smoke-5.jpg" },
  { name: "Harrington — Charcoal", desc: "Harrington slipped shaker in solid oak — charcoal stain finish.", img: "/images/options/doors/harrington-slipped-shaker-ash-door-charcoal-stain.jpg" },
  { name: "Harrington — French Grey", desc: "Harrington slipped shaker in solid oak — French Grey stain finish.", img: "/images/options/doors/harrington-shaker-ash-french-grey.jpg" },
  { name: "Willow Oak — Smoke", desc: "Willow oak door — Rubio Smoke 5% finish. Warm, natural timber feel.", img: "/images/options/doors/willow-oak-door-rubio-smoke-5.jpg" },
];

const OAK_OIL_FINISHES = [
  { name: "Oak", img: "/images/options/oak-finishes/oak.jpg" },
  { name: "Charcoal", img: "/images/options/oak-finishes/charcoal.jpg" },
  { name: "Chocolate", img: "/images/options/oak-finishes/chocolate.jpg" },
  { name: "Havana", img: "/images/options/oak-finishes/havana.jpg" },
  { name: "Smoke", img: "/images/options/oak-finishes/smoke.jpg" },
  { name: "Smoke 5", img: "/images/options/oak-finishes/smoke-5.jpg" },
  { name: "Superwhite", img: "/images/options/oak-finishes/superwhite.jpg" },
  { name: "Walnut", img: "/images/options/oak-finishes/walnut.jpg" },
];

const OAK_STAINED_FINISHES = [
  { name: "Amber Ember", img: "/images/options/doors/oak-finish-amber-ember.jpg" },
  { name: "Old Chalet No.20", img: "/images/options/doors/oak-finish-old-chalet.jpg" },
  { name: "Champagne Oak", img: "/images/options/doors/oak-finish-champagne-oak.jpg" },
  { name: "Aged Acorn No.15", img: "/images/options/doors/oak-finish-aged-acorn.jpg" },
  { name: "Obsidian No.33", img: "/images/options/doors/oak-finish-obsidian.jpg" },
  { name: "Swiss Pearl", img: "/images/options/doors/oak-finish-swiss-pearl.jpg" },
  { name: "Irish Meadow", img: "/images/options/doors/oak-finish-irish-meadow.jpg" },
  { name: "Weathered Bork No.8", img: "/images/options/doors/oak-finish-weathered-bork.jpg" },
  { name: "White Ash Stain", img: "/images/options/doors/oak-finish-white-ash.jpg" },
  { name: "Tobacco Walnut", img: "/images/options/doors/oak-finish-tobacco-walnut.jpg" },
];

const REFINED_CARDS = [
  { name: "Monte Black", img: "/images/options/doors/refined-monte-black.jpg" },
  { name: "Monte Antracite", img: "/images/options/doors/refined-monte-antracite.jpg" },
  { name: "Monte Vulcano", img: "/images/options/doors/refined-monte-vulcano.jpg" },
  { name: "Monte Tortora", img: "/images/options/doors/refined-monte-tortora.jpg" },
  { name: "Monte Nube", img: "/images/options/doors/refined-monte-nube.jpg" },
  { name: "Monte Cashmere", img: "/images/options/doors/refined-monte-cashmere.jpg" },
  { name: "Monte Porcelain", img: "/images/options/doors/refined-monte-porcelain.jpg" },
  { name: "Monte Agave", img: "/images/options/doors/refined-monte-agave.jpg" },
  { name: "Monte Verde", img: "/images/options/doors/refined-monte-verde.jpg" },
];

const MFC_SWATCHES = [
  "alibastet-woodgrain","alpine-white","beech","beige-textile","black","bordilino-oak","cashmere","cashmere-2","cashmere-ash","cashmere-grained","cassella-oak","coffee-oak","dakar","dakar-2","dakar-ash","dark-grey-ash","dust-grey","dust-grey-grained","dust-grey-woodgrain","fir-green","fyord","graphite","graphite-2","grey-metal-slate","grey-nebraska-oak","grey-nortic","grey-textile","hamilton-oak","indigo","indigo-blue","ivory","lancaster-oak","light-grey","light-grey-woodgrain","lorenzo-oak","magnolia","mussell","mussell-2","mussell-grained","mussell-woodgrain","natural-altiepolo","natural-halifax-oak","onyx-grey","pacific-walnut-a","pacific-walnut-b","pebble-grey","pippy-oak","platnum-ash","platum-white","raw-endgrain-oak","reed-green","rose-white","rose-white-2","sand-gladstone-oak","sand-lyon-ash","smoke-blue","stone-grey","stone-grey-2","stone-grey-ash","tobaco-gladstone-oak","tobaco-halifax-oak","tyrolen-blue","white","white-gladstone-oak","white-halifax-oak"
].map(s => ({
  slug: s,
  name: s.replace(/-2$/, " (Textured)").replace(/-a$/, "").replace(/-b$/, " (Dark)").replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
  img: `/images/options/mfc/${s}.jpg`,
}));

const FARROW_COLOURS = [
  { name: "Wimborne White", bg: "#f2ede3" },
  { name: "Shaded White", bg: "#e8e0d0" },
  { name: "Strong White", bg: "#e3dfd3" },
  { name: "All White", bg: "#f2f0eb" },
  { name: "White Tie", bg: "#f0ebe0" },
  { name: "Pointing", bg: "#ede8da" },
  { name: "Pigeon", bg: "#929a97" },
  { name: "French Grey", bg: "#b5b9b3" },
  { name: "Pavillion Grey", bg: "#b8bab4" },
  { name: "Dove Grey", bg: "#b8b8b3" },
  { name: "Purbeck Stone", bg: "#c8bfb0" },
  { name: "Cornforth White", bg: "#cec8bc" },
  { name: "Railings", bg: "#2d3035" },
  { name: "Off Black", bg: "#1c1c1f" },
  { name: "Pitch Black", bg: "#0d0d0f" },
  { name: "Ammonite", bg: "#c9c4ba" },
  { name: "Elephants Breath", bg: "#b8b0a5" },
  { name: "Inchyra", bg: "#5a7284" },
  { name: "Studio Green", bg: "#3f5642" },
  { name: "Green Smoke", bg: "#617a69" },
  { name: "Hague Blue", bg: "#1e3a5f" },
  { name: "Slaked Lime Dark", bg: "#b8c5a5" },
];

const COLORTREND_COLOURS = [
  { name: "Alabaster White", bg: "#f5f1e8" },
  { name: "Tyrolean Blue", bg: "#4a7d9e" },
  { name: "Huntsman", bg: "#7a5c3c" },
];

const KNURLED_HANDLES = [
  { name: "Knurled Pull Handle — Mild Steel", desc: "A bold knurled bar handle in mild steel. Fixing centres 160–320mm.", img: "/images/options/handles/knurled-pull-handle.jpg", finishes: ["Matte Black", "Bronze", "Nickel", "Brass"] },
  { name: "Knurled Knob — Mild Steel, Ø38mm", desc: "Round knurled knob in mild steel. Pairs with the matching pull handle for a coordinated set.", img: "/images/options/handles/knurled-knob-38mm.jpg", finishes: ["Matte Black", "Bronze", "Nickel"] },
  { name: "Barchester Knob — Iron, Ø38–49mm", desc: "A beautiful iron knurled knob with an antique finish — perfect for shaker or painted kitchen doors.", img: "/images/options/handles/barchester-knob-iron.jpg", finishes: ["Antique Iron", "Black"] },
  { name: "Double Ringed T Knob — Iron, Ø18mm", desc: "A compact knurled T-knob with a distinctive double ring detail. Works well as a drawer knob.", img: "/images/options/handles/double-ringed-t-knob.jpg", finishes: ["Antique Iron", "Black"] },
];

const CUP_HANDLES = [
  { name: "Cup Pull — Hendel & Hendel Hampton", desc: "An elegant cup pull handle from the prestigious Hampton collection. 10 finish options. Fixing centres 64–96mm.", img: "/images/options/handles/hampton-cup-pull.jpg", finishes: ["Satin Nickel", "Polished Nickel", "Antique Bronze", "Matt Black", "Brushed Gold"] },
  { name: "Cup Pull — Hendel & Hendel Greenwich", desc: "A refined cup pull from the Greenwich collection. Clean lines with a traditional feel. Fixing centres 64–96mm.", img: "/images/options/handles/greenwich-cup-pull.jpg", finishes: ["Satin Nickel", "Antique Bronze", "Matt Black"] },
  { name: "Cup Pull — Hendel & Hendel Charlbury", desc: "A subtly curved cup handle with a contemporary profile.", img: "/images/options/handles/charlbury-cup-pull.jpg", finishes: ["Brushed", "Polished"] },
];

const BAR_HANDLES = [
  { name: "Tapered Bow Brushed Handle", desc: "An elegant tapered bow handle in brushed finish — works beautifully on smooth contemporary doors.", img: "/images/options/handles/tapered-bow-handle.jpg", finishes: ["Brushed Nickel", "Brushed Brass"] },
  { name: "Gold Bar Handle", desc: "A simple, elegant bar handle in gold — adds warmth and a touch of luxury to any painted door.", img: "/images/options/handles/gold-bar-handle.jpg", finishes: ["Brushed Gold", "Polished Gold"] },
  { name: "Clifton Bow Handle", desc: "A classic bow-shaped handle — available in multiple finishes. Suitable for drawers and doors.", img: "/images/options/handles/clifton-bow-handle.jpg", finishes: ["Chrome", "Antique Brass", "Matt Black"] },
  { name: "Kellas / Pimlico Bar Handle", desc: "Slender bar handles with a minimalist profile — ideal for contemporary kitchens and wardrobes.", img: "/images/options/handles/pimlico-bar-handle.jpg", finishes: ["Brushed Nickel", "Matt Black", "Brushed Gold"] },
];

const KNOBS = [
  { name: "Queen Ann Beehive Knob", desc: "A classic beehive profile knob — elegant and traditional. Popular for shaker kitchens.", img: "/images/options/handles/queen-ann-beehive-knob.jpg", finishes: ["Antique Brass", "Chrome", "Nickel"] },
  { name: "Crystal Knob", desc: "A delicate crystal-effect knob — adds a touch of elegance to painted furniture.", img: "/images/options/handles/crystal-knob.jpg", finishes: ["Clear Crystal", "Chrome Base"] },
  { name: "Henrietta / Greenwich / Belgravia Knob", desc: "Elegant round knobs from the Hendel & Hendel range — available in multiple sizes and finishes.", img: "/images/options/handles/belgravia-knob.jpg", finishes: ["Satin Nickel", "Antique Brass", "Matt Black"] },
];

const MICRO_WORKTOPS = [
  "barnwood","black-marble","calacata-marble","castle-marble-white","causeway","cirrus-cloud","copper-stone","dusky-black","fossil-grey","frosty","highland-oak","jade","jet-quarry","latte-dream","light-walnut","limestone","lorenzo","milan-marble","mount-blanc-stone","mourne-slate","pebbles","recyled-plank","safari-oak","silverback-marble","soft-oak","soft-shimmer-matt","storm-terrazzo","white-quartz","winter-stone","winter-stone-2"
].map((s: string) => ({
  slug: s,
  name: s === "winter-stone-2" ? "Winter Stone 2" : s.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
  img: `/images/options/worktops/${s}.jpg`,
}));

// ─── Handle Category component ────────────────────────────────────────────────

function HandleCategory({ title, desc, items, wishlist, onToggle }: {
  title: string;
  desc: string;
  items: { name: string; desc: string; img: string; finishes: string[] }[];
  wishlist: WishlistItem[];
  onToggle: (item: WishlistItem) => void;
}) {
  return (
    <div className="handle-category">
      <h3 className="handle-category__heading">{title}</h3>
      <p className="handle-category__desc">{desc}</p>
      <div className="handle-items">
        {items.map(item => (
          <div key={item.name} className="handle-item">
            <div className="handle-item__img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="handle-item__img" src={item.img} alt={item.name} loading="lazy" />
              <HeartBtn
                item={{ id: `handle-${item.name}`, name: item.name, image: item.img, category: "Handle / Knob" }}
                wishlist={wishlist}
                onToggle={onToggle}
              />
            </div>
            <div className="handle-item__body">
              <p className="handle-item__name">{item.name}</p>
              <p className="handle-item__desc">{item.desc}</p>
              <div className="handle-item__finishes">
                {item.finishes.map(f => <span key={f} className="finish-tag">{f}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OptionsPage() {
  const [tab, setTab] = useState("doors");
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    setWishlist(loadWishlist());
  }, []);

  useEffect(() => {
    if (!zoomed) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setZoomed(null); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomed]);

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setWishlist(prev => {
      const exists = prev.some(w => w.id === item.id);
      const next = exists ? prev.filter(w => w.id !== item.id) : [...prev, item];
      saveWishlist(next);
      return next;
    });
  }, []);

  const zoom = useCallback((src: string, alt: string) => setZoomed({ src, alt }), []);

  const wishlistCount = wishlist.length;

  // Keep a ref to force re-read wishlist from storage if tab/focus returns
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <p className="eyebrow eyebrow--light page-header__eyebrow">Options &amp; Finishes</p>
          <h1 className="display--xl page-header__title">Customise Your Furniture</h1>
          <p className="page-header__sub">
            Browse our full range of door styles, painted colours, handles, and worktop materials.
            Heart anything to add it to your{" "}
            <Link href="/selection" style={{ color: "rgba(245,240,234,0.8)", textDecoration: "underline" }}>
              My Selection
            </Link>
            {wishlistCount > 0 && <span style={{ marginLeft: "0.4rem", opacity: 0.7 }}>({wishlistCount} saved)</span>}.
          </p>
        </div>
      </header>

      <section className="section" style={{ background: "var(--warm-white)" }} ref={containerRef}>
        <div className="container">

          <div className="options-nav">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`options-nav__btn${tab === t.id ? " active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── DOORS ── */}
          <div className={`options-section${tab === "doors" ? " active" : ""}`}>

            <div className="door-collection">
              <div className="door-collection__header">
                <h3 className="door-collection__title">The Makers Collection</h3>
                <p className="door-collection__sub">Painted</p>
                <p className="door-collection__desc">Our painted range — hand-sprayed to order in any colour from Farrow &amp; Ball, Colortrend, Little Green, or your own choice. Every door is finished to a fine furniture standard.</p>
              </div>
              <div className="doors-grid">
                {MAKERS_DOORS.map(d => (
                  <div key={d.name} className="door-card">
                    <div className="door-card__img-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="door-card__img" src={d.img} alt={d.name} loading="lazy" />
                    </div>
                    <HeartBtn
                      item={{ id: `door-makers-${d.name}`, name: d.name, image: d.img, category: "Door Style" }}
                      wishlist={wishlist}
                      onToggle={toggleWishlist}
                    />
                    <div className="door-card__info">
                      <p className="door-card__name">{d.name}</p>
                      <p className="door-card__desc">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paint colours — only apply to Makers Collection painted doors */}
              <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
                <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Paint Colours</p>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: 1.65 }}>
                  Makers Collection doors are hand-sprayed to order in any colour from Farrow &amp; Ball, Colortrend, Little Green, or your own choice. Colours shown are indicative — request a physical sample for accuracy.
                </p>

                <h4 style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-secondary)", marginBottom: "1rem" }}>Farrow &amp; Ball</h4>
                <div className="colours-swatches">
                  {FARROW_COLOURS.map(c => (
                    <div key={c.name} className="colour-swatch">
                      <div className="colour-swatch__circle" style={{ background: c.bg, position: "relative" }}>
                        <HeartBtn
                          item={{ id: `colour-fb-${c.name}`, name: `${c.name} (Farrow & Ball)`, image: "", category: "Paint Colour" }}
                          wishlist={wishlist}
                          onToggle={toggleWishlist}
                        />
                      </div>
                      <p className="colour-swatch__name">{c.name}</p>
                    </div>
                  ))}
                </div>

                <h4 style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-secondary)", margin: "1.75rem 0 1rem" }}>Colortrend</h4>
                <div className="colours-swatches">
                  {COLORTREND_COLOURS.map(c => (
                    <div key={c.name} className="colour-swatch">
                      <div className="colour-swatch__circle" style={{ background: c.bg, position: "relative" }}>
                        <HeartBtn
                          item={{ id: `colour-ct-${c.name}`, name: `${c.name} (Colortrend)`, image: "", category: "Paint Colour" }}
                          wishlist={wishlist}
                          onToggle={toggleWishlist}
                        />
                      </div>
                      <p className="colour-swatch__name">{c.name}</p>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: "1rem", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>
                  Many more Colortrend colours available —{" "}
                  <a href="/contact" style={{ color: "var(--primary)", textDecoration: "underline" }}>ask John</a>.
                </p>

                <div className="info-box" style={{ marginTop: "1.5rem" }}>
                  <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Looking for Something Specific?</p>
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.65 }}>If you have a colour in mind from Little Green, Dulux, or any other range, just let us know. We can usually match or source it.</p>
                  <a href="/contact" className="btn btn--primary" style={{ marginTop: "1.5rem", display: "inline-flex" }}>Ask About a Colour</a>
                </div>
              </div>
            </div>

            <div className="door-collection">
              <div className="door-collection__header">
                <h3 className="door-collection__title">The Heritage Collection</h3>
                <p className="door-collection__sub">Solid Oak</p>
                <p className="door-collection__desc">Handcrafted from real solid oak — every door has its own grain and character. Available with a choice of oil or stained lacquered finishes applied to order.</p>
              </div>
              <div className="doors-grid">
                {HERITAGE_DOORS.map(d => (
                  <div key={d.name} className="door-card">
                    <div className="door-card__img-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="door-card__img" src={d.img} alt={d.name} loading="lazy" />
                    </div>
                    <HeartBtn
                      item={{ id: `door-heritage-${d.name}`, name: d.name, image: d.img, category: "Door Style — Solid Oak" }}
                      wishlist={wishlist}
                      onToggle={toggleWishlist}
                    />
                    <div className="door-card__info">
                      <p className="door-card__name">{d.name}</p>
                      <p className="door-card__desc">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="oak-finishes">
                <p className="oak-finishes__title">Oil Finishes for Solid Oak</p>
                <div className="oak-finishes__grid">
                  {OAK_OIL_FINISHES.map(f => (
                    <div key={f.name} style={{ position: "relative", cursor: "zoom-in" }} onClick={() => zoom(f.img, f.name)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="oak-finish__img" src={f.img} alt={f.name} loading="lazy" />
                      <HeartBtn
                        item={{ id: `oak-oil-${f.name}`, name: `${f.name} — Oil Finish`, image: f.img, category: "Oak Oil Finish" }}
                        wishlist={wishlist}
                        onToggle={toggleWishlist}
                      />
                      <p className="oak-finish__name">{f.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="oak-finishes" style={{ marginTop: "1.25rem" }}>
                <p className="oak-finishes__title">Stained &amp; Lacquered Finishes for Solid Oak</p>
                <div className="oak-finishes__grid">
                  {OAK_STAINED_FINISHES.map(f => (
                    <div key={f.name} style={{ position: "relative", cursor: "zoom-in" }} onClick={() => zoom(f.img, f.name)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="oak-finish__img" src={f.img} alt={f.name} loading="lazy" />
                      <HeartBtn
                        item={{ id: `oak-stained-${f.name}`, name: `${f.name} — Stained/Lacquered Finish`, image: f.img, category: "Oak Stained Finish" }}
                        wishlist={wishlist}
                        onToggle={toggleWishlist}
                      />
                      <p className="oak-finish__name">{f.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="door-collection">
              <div className="door-collection__header">
                <h3 className="door-collection__title">The Refined Collection</h3>
                <p className="door-collection__sub">Luxury MFC</p>
                <p className="door-collection__desc">The Monte range — premium slab doors in a sophisticated palette of matt and textured finishes. A step above standard MFC, with a richer surface quality and depth of colour.</p>
              </div>
              <div className="refined-grid">
                {REFINED_CARDS.map(c => (
                  <div key={c.name} className="refined-card">
                    <div className="refined-card__img-wrap" onClick={() => zoom(c.img, c.name)} style={{ cursor: "zoom-in" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="refined-card__img" src={c.img} alt={c.name} loading="lazy" />
                    </div>
                    <HeartBtn
                      item={{ id: `door-refined-${c.name}`, name: c.name, image: c.img, category: "Door Style — Refined MFC" }}
                      wishlist={wishlist}
                      onToggle={toggleWishlist}
                    />
                    <div className="refined-card__info">
                      <p className="refined-card__name">{c.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="door-collection">
              <div className="door-collection__header">
                <h3 className="door-collection__title">The Tailored Collection</h3>
                <p className="door-collection__sub">Standard MFC</p>
                <p className="door-collection__desc">A comprehensive range of melamine faced chipboard finishes — solid colours, wood grains, ash textures, and textured surfaces. Practical, hardwearing, and available in an exceptionally wide palette.</p>
              </div>
              <div className="mfc-swatches">
                {MFC_SWATCHES.map(s => (
                  <div key={s.slug} className="mfc-swatch" onClick={() => zoom(s.img, s.name)} style={{ cursor: "zoom-in" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="mfc-swatch__img" src={s.img} alt={s.name} loading="lazy" />
                    <HeartBtn
                      item={{ id: `mfc-${s.slug}`, name: s.name, image: s.img, category: "MFC Finish" }}
                      wishlist={wishlist}
                      onToggle={toggleWishlist}
                    />
                    <p className="mfc-swatch__name">{s.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="door-collection">
              <div className="door-collection__header">
                <h3 className="door-collection__title">The Studio Collection</h3>
                <p className="door-collection__desc">A bold, statement range available in two finishes — a mirror-like high gloss and a refined, light-absorbing matt. Both deliver a seamless, handleless look that&apos;s equally at home in contemporary kitchens and fitted bedrooms.</p>
              </div>

              <div className="studio-subsection">
                <p className="studio-subsection__label">High Gloss</p>
                <div className="doors-grid">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="door-card door-card--placeholder">
                      <div className="door-card__img-wrap door-card__placeholder" style={{ aspectRatio: "3/4" }}></div>
                      <div className="door-card__info"><p className="door-card__name">Coming Soon</p></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="studio-subsection">
                <p className="studio-subsection__label">Matt</p>
                <div className="doors-grid">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="door-card door-card--placeholder">
                      <div className="door-card__img-wrap door-card__placeholder" style={{ aspectRatio: "3/4" }}></div>
                      <div className="door-card__info"><p className="door-card__name">Coming Soon</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ── HANDLES ── */}
          <div className={`options-section${tab === "handles" ? " active" : ""}`}>
            <div className="section-header">
              <p className="eyebrow">Hardware</p>
              <h2 className="display--md" style={{ marginTop: "0.75rem" }}>Handles &amp; Knobs</h2>
              <p className="lead" style={{ marginTop: "1rem" }}>We supply quality hardware from Häfele and Hendel &amp; Hendel — leading Irish hardware suppliers — in a wide range of styles and finishes. The right handle makes all the difference.</p>
            </div>

            <div className="handles-categories">
              <HandleCategory
                title="Knurled Handles & Knobs"
                desc="A tactile, textured finish that adds character to any door. Available in matte black, bronze, gold, and brushed nickel. Our most popular hardware choice for contemporary and transitional furniture."
                items={KNURLED_HANDLES}
                wishlist={wishlist}
                onToggle={toggleWishlist}
              />
              <HandleCategory
                title="Cup Handles"
                desc="The classic cup-style drawer pull — a timeless choice for shaker kitchens and traditional painted furniture. Available in a wide range of sizes and finishes."
                items={CUP_HANDLES}
                wishlist={wishlist}
                onToggle={toggleWishlist}
              />
              <HandleCategory
                title="Bar & Pull Handles"
                desc="Sleek bar handles for a contemporary look — available in a range of lengths and finishes to suit any style of furniture."
                items={BAR_HANDLES}
                wishlist={wishlist}
                onToggle={toggleWishlist}
              />
              <HandleCategory
                title="Knobs"
                desc="A great finishing touch for painted shaker and traditional-style furniture — available in round, beehive, and decorative profiles."
                items={KNOBS}
                wishlist={wishlist}
                onToggle={toggleWishlist}
              />
            </div>

            <div className="info-box">
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Full Häfele Catalogue</p>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.65 }}>Browse the full range of handles and knobs from Häfele — our primary hardware supplier. Many more options are available beyond those listed here.</p>
              <a href="https://www.hafele.ie/en/products/handles-knobs/cabinet-handles-knobs/11/" target="_blank" rel="noopener noreferrer" className="btn btn--ghost-dark" style={{ marginTop: "1.5rem", display: "inline-flex" }}>Browse Häfele Catalogue →</a>
            </div>
          </div>

          {/* ── WORKTOPS ── */}
          <div className={`options-section${tab === "worktops" ? " active" : ""}`}>
            <div className="section-header">
              <p className="eyebrow">Worktops</p>
              <h2 className="display--md" style={{ marginTop: "0.75rem" }}>Worktop Materials</h2>
              <p className="lead" style={{ marginTop: "1rem" }}>We supply and fit a range of worktop materials to suit every style and budget — from practical laminates to luxury quartz and natural stone.</p>
            </div>

            <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>Micro Worktops</p>
            <div className="worktops-grid">
              {MICRO_WORKTOPS.map(w => (
                <div key={w.slug} className="worktop-card">
                  <div className="worktop-card__img-wrap" onClick={() => zoom(w.img, w.name)} style={{ cursor: "zoom-in" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="worktop-card__img" src={w.img} alt={w.name} loading="lazy" />
                  </div>
                  <HeartBtn
                    item={{ id: `worktop-micro-${w.slug}`, name: `${w.name} — Micro Worktop`, image: w.img, category: "Worktop" }}
                    wishlist={wishlist}
                    onToggle={toggleWishlist}
                  />
                  <div className="worktop-card__info"><h3 className="worktop-card__name">{w.name}</h3></div>
                </div>
              ))}
            </div>

            <div className="info-box">
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Not Sure Which Worktop to Choose?</p>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.65 }}>John will discuss all the worktop options with you and help you choose the right material and finish for your project and budget.</p>
              <Link href="/contact" className="btn btn--primary" style={{ marginTop: "1.5rem", display: "inline-flex" }}>Call Today</Link>
            </div>
          </div>

        </div>
      </section>

      <section className="cta-section section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="display--lg reveal" style={{ color: "var(--warm-white)" }}>Ready to Put Together Your Selection?</h2>
          <p className="lead lead--light reveal reveal--delay-1" style={{ margin: "1.5rem auto 2.5rem" }}>
            Heart the options you like, then send your selection to John. He&apos;ll gather the real samples and give you a call.
          </p>
          <div className="reveal reveal--delay-2" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/selection" className="btn btn--light">
              View My Selection{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
            </Link>
            <Link href="/showcase" className="btn btn--ghost">See Our Work</Link>
          </div>
        </div>
      </section>

      {zoomed && (
        <div
          className="img-zoom-overlay"
          onClick={() => setZoomed(null)}
          role="dialog"
          aria-modal
          aria-label={zoomed.alt}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="img-zoom-overlay__img" src={zoomed.src} alt={zoomed.alt} />
          <button
            className="img-zoom-overlay__close"
            onClick={() => setZoomed(null)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
