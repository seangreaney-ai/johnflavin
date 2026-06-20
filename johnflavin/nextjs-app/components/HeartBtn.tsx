"use client";

import type { WishlistItem } from "@/types";

export default function HeartBtn({ item, wishlist, onToggle }: {
  item: WishlistItem;
  wishlist: WishlistItem[];
  onToggle: (item: WishlistItem) => void;
}) {
  const saved = wishlist.some(w => w.id === item.id);
  return (
    <button
      className={`heart-btn${saved ? " active" : ""}`}
      onClick={e => { e.stopPropagation(); onToggle(item); }}
      aria-label={saved ? "Remove from My Selection" : "Add to My Selection"}
      title={saved ? "Remove from My Selection" : "Add to My Selection"}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    </button>
  );
}
