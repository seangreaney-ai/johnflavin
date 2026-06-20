"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { WORK, type WorkItem } from "@/lib/data/work";
import HeartBtn from "@/components/HeartBtn";
import type { WishlistItem } from "@/types";

const LS_KEY = "jf_wishlist";

function loadWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
}

function saveWishlist(items: WishlistItem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "kitchen", label: "Kitchens" },
  { key: "living", label: "Living Rooms" },
  { key: "bedroom", label: "Bedrooms" },
  { key: "utility", label: "Utility Rooms" },
];

function formatKey(k: string) {
  return k.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export default function ShowcasePage() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<WorkItem | null>(null);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => { setWishlist(loadWishlist()); }, []);

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setWishlist(prev => {
      const exists = prev.some(w => w.id === item.id);
      const next = exists ? prev.filter(w => w.id !== item.id) : [...prev, item];
      saveWishlist(next);
      return next;
    });
  }, []);

  const visible = filter === "all" ? WORK : WORK.filter(w => w.room === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpen(null); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="page-header">
        <div className="container">
          <p className="eyebrow eyebrow--light page-header__eyebrow reveal">Portfolio</p>
          <h1 className="display--xl page-header__title reveal reveal--delay-1">Our Work</h1>
          <p className="page-header__sub reveal reveal--delay-2">
            A selection of recently completed kitchens, bedrooms, sitting rooms, utility rooms and more — each built to measure and finished to the customer&apos;s exact specifications.
          </p>
        </div>
      </header>

      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container">
          <div className="work-filter reveal">
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`filter-btn${filter === f.key ? " active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="work-grid">
            {visible.map((item, i) => (
              <div
                key={item.title}
                className={`work-item reveal${i % 3 === 1 ? " reveal--delay-1" : i % 3 === 2 ? " reveal--delay-2" : ""}`}
                onClick={() => setOpen(item)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setOpen(item)}
              >
                <div className="work-item__img-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="work-item__img" src={item.images[0]} alt={item.title} loading="lazy" />
                  <HeartBtn
                    item={{ id: `work-${i}`, name: item.title, image: item.images[0], category: item.roomLabel }}
                    wishlist={wishlist}
                    onToggle={toggleWishlist}
                  />
                </div>
                <div className="work-item__info">
                  <p className="work-item__room">{item.roomLabel}</p>
                  <h3 className="work-item__title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="display--lg reveal" style={{ color: "var(--warm-white)" }}>Like What You See?</h2>
          <p className="lead lead--light reveal reveal--delay-1" style={{ margin: "1.5rem auto 2.5rem" }}>
            Get in touch to discuss your project. We&apos;ll arrange a free consultation and measure-up at your home.
          </p>
          <div className="reveal reveal--delay-2" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn--light">Book a Free Consultation</Link>
            <Link href="/options" className="btn btn--ghost">Browse Options</Link>
          </div>
        </div>
      </section>

      {open && (
        <div
          className="lightbox open"
          role="dialog"
          aria-modal
          aria-label="Project detail"
          onClick={e => { if (e.target === e.currentTarget) setOpen(null); }}
        >
          <div className="lightbox__header">
            <h2 className="lightbox__title">{open.title}</h2>
            <button className="lightbox__close" aria-label="Close" onClick={() => setOpen(null)}>
              &times;
            </button>
          </div>
          <div className="lightbox__body">
            <div className="lightbox__images">
              {open.images.map(src => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={src} className="lightbox__img" src={src} alt={open.title} loading="lazy" />
              ))}
            </div>
            <div className="lightbox__meta">
              <p className="lightbox__room">{open.roomLabel}</p>
              <p className="lightbox__desc">{open.description}</p>
              <p className="lightbox__specs-heading">Specification</p>
              {Object.entries(open.specs).map(([k, v]) => (
                <div key={k} className="lightbox__spec">
                  <span className="lightbox__spec-key">{formatKey(k)}</span>
                  <span className="lightbox__spec-val">{v}</span>
                </div>
              ))}
              <div style={{ marginTop: "2rem" }}>
                <Link href="/contact" className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>
                  Enquire About This Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
