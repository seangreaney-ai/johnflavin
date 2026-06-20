"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import Link from "next/link";
import type { WishlistItem } from "@/types";
import { sendSelection, type SelectionState } from "@/app/actions/selection";

const LS_KEY = "jf_wishlist";

function loadWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
}

function saveWishlist(items: WishlistItem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export default function SelectionPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [sending, setSending] = useState(false);
  const [state, formAction] = useActionState<SelectionState, FormData>(sendSelection, undefined);

  const itemsFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setWishlist(loadWishlist());
    setMounted(true);
  }, []);

  // Keep hidden items field in sync with current wishlist state
  useEffect(() => {
    if (itemsFieldRef.current) {
      itemsFieldRef.current.value = JSON.stringify(wishlist);
    }
  }, [wishlist]);

  function remove(id: string) {
    const next = wishlist.filter(w => w.id !== id);
    setWishlist(next);
    saveWishlist(next);
  }

  function clearAll() {
    setWishlist([]);
    saveWishlist([]);
  }

  const grouped = wishlist.reduce<Record<string, WishlistItem[]>>((acc, item) => {
    (acc[item.category] ||= []).push(item);
    return acc;
  }, {});

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid var(--border)",
    background: "white",
    padding: "0.6rem 0.875rem",
    fontSize: "var(--text-sm)",
    fontFamily: "var(--font-body)",
    color: "var(--text-primary)",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "var(--text-xs)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--text-secondary)",
    marginBottom: "0.4rem",
  };

  return (
    <>
      <header className="page-header">
        <div className="container">
          <p className="eyebrow eyebrow--light page-header__eyebrow">My Selection</p>
          <h1 className="display--xl page-header__title">
            {mounted && wishlist.length > 0
              ? `Your selection (${wishlist.length} item${wishlist.length !== 1 ? "s" : ""})`
              : "Your Selection"}
          </h1>
          <p className="page-header__sub">
            Heart anything in the{" "}
            <Link href="/options" style={{ color: "rgba(245,240,234,0.8)", textDecoration: "underline" }}>Options catalogue</Link>{" "}
            to save it here, then send your selection to John.
          </p>
        </div>
      </header>

      <section className="section" style={{ background: "var(--warm-white)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>

          {!mounted || wishlist.length === 0 ? (
            <div style={{ border: "1px dashed var(--border)", padding: "5rem 2rem", textAlign: "center" }}>
              <svg style={{ width: 40, height: 40, margin: "0 auto 1rem", color: "var(--border)", display: "block" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-sm)", marginBottom: "0.5rem" }}>Nothing saved yet.</p>
              <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-xs)", marginBottom: "1.5rem" }}>Add doors, finishes and colours, then send to John.</p>
              <Link href="/options" className="btn btn--primary">Browse the Options Catalogue</Link>
            </div>
          ) : (
            <form action={formAction} onSubmit={() => setSending(true)}>
              {/* Hidden field — kept in sync via useEffect */}
              <input type="hidden" name="items" ref={itemsFieldRef} defaultValue="" />

              {/* Selection items */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>
                  {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} in your selection.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  Clear all
                </button>
              </div>

              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} style={{ marginBottom: "2.5rem" }}>
                  <p className="eyebrow" style={{ marginBottom: "1rem" }}>{category}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {items.map(item => (
                      <div
                        key={item.id}
                        style={{
                          padding: "1.25rem 0",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem" }}>
                          {item.image ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 2, flexShrink: 0, background: "var(--stone)" }}
                            />
                          ) : (
                            <div style={{ width: 64, height: 64, borderRadius: 2, flexShrink: 0, background: "var(--stone)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg style={{ width: 20, height: 20, color: "var(--mid)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </div>
                          )}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 400, lineHeight: 1.2, marginBottom: "0.15rem" }}>{item.name}</p>
                            <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>{item.category}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            aria-label="Remove"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", color: "var(--text-secondary)", flexShrink: 0, marginTop: "0.25rem" }}
                          >
                            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Contact details + message */}
              <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
                <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Your Details</p>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                  John will use these to get in touch with you.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label htmlFor="sel-name" style={labelStyle}>Name *</label>
                    <input id="sel-name" type="text" name="name" required placeholder="Your name" style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="sel-phone" style={labelStyle}>Phone</label>
                    <input id="sel-phone" type="tel" name="phone" placeholder="Your phone number" style={inputStyle} />
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="sel-email" style={labelStyle}>Email *</label>
                  <input id="sel-email" type="email" name="email" required placeholder="your@email.com" style={inputStyle} />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="sel-files" style={labelStyle}>Upload drawings, plans or photos (optional)</label>
                  <input
                    id="sel-files"
                    type="file"
                    name="files"
                    multiple
                    accept="image/*,.pdf,.dwg,.dxf"
                    style={{ ...inputStyle, cursor: "pointer", padding: "0.45rem 0.875rem" }}
                  />
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "0.3rem" }}>
                    Floor plans, room sketches, inspiration images — anything that helps John understand your space.
                  </p>
                </div>

                <div style={{ marginBottom: "2rem" }}>
                  <label htmlFor="sel-message" style={labelStyle}>Message to John (optional)</label>
                  <textarea
                    id="sel-message"
                    name="message"
                    placeholder="Anything else John should know — room size, budget, timeline…"
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                {state?.error && (
                  <p style={{ fontSize: "var(--text-sm)", color: "var(--primary)", marginBottom: "1rem", padding: "0.75rem 1rem", background: "rgba(112,47,24,0.06)", border: "1px solid rgba(112,47,24,0.15)" }}>
                    {state.error}
                  </p>
                )}

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={sending}
                    style={{ opacity: sending ? 0.6 : 1 }}
                  >
                    {sending ? "Sending…" : "Send my selection to John"}
                  </button>
                  <Link href="/options" className="btn btn--ghost-dark">Back to Options</Link>
                </div>

                <p style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)", marginTop: "1rem", lineHeight: 1.6 }}>
                  John will gather the real samples and give you a call. No showroom queue — just a conversation.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
