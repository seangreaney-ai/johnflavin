# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Two Separate Projects

This workspace contains two independent codebases that should not be conflated:

| | Static site | Next.js app |
|--|--|--|
| **Root** | `website/` | `nextjs-app/` |
| **Stack** | Plain HTML/CSS/JS | Next.js 16, TypeScript, Tailwind v4 |
| **Deploy** | Vercel (`website/` as root) | Not yet deployed |
| **URL** | johnflavin.ie | — |

---

## Static Site (`website/`)

No build step. Edit files directly and push to deploy.

**To preview locally:**
```bash
cd website && npx serve .
# or just open index.html in a browser
```

### Architecture

- `style.css` — entire design system as CSS custom properties (tokens, layout, components). All colours, spacing, type scale, and animation curves are defined here as `--var` tokens.
- `main.js` — single IIFE handling: nav scroll state, mobile hamburger, active link, hero stagger animation, scroll reveal (`IntersectionObserver`), our-work filter, lightbox, options page tabs, smooth anchor scroll.
- `site-content.json` — master data file for all copy, project specs, and options metadata. This is the source of truth for content — HTML pages are built from it.

### Asset Mirroring

Assets live in two places and must be kept in sync manually:
- **Source:** `John Flavin/` (working copies)
- **Deployed:** `website/John Flavin/` (must mirror source)

When adding images or videos, copy them to both locations.

### Design Tokens (quick reference)

| Token | Value |
|-------|-------|
| `--primary` | `#702f18` — mahogany red |
| `--secondary` | `#335b72` — slate blue |
| `--dark` | `#0f0d0b` |
| `--warm-white` | `#f5f0ea` |
| Display font | Abril Fatface (Google Fonts) |
| Body font | DM Sans (Google Fonts) |

Sections on dark backgrounds use `data-theme="dark"` on the nav to switch to the white logo variant.

---

## Next.js App (`nextjs-app/`)

> **Important:** Next.js 16 contains breaking changes from earlier versions. Before writing any Next.js-specific code, check `node_modules/next/dist/docs/` for the relevant guide. Do not rely on training data for API details.

### Commands

```bash
cd nextjs-app
npm run dev      # development server
npm run build    # production build
npm run lint     # ESLint
```

### Environment

Copy `.env.local.example` to `.env.local` and fill in values:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=        # for enquiry emails via Resend
JOHN_EMAIL=            # destination for contact form submissions
```

**Demo mode:** If Supabase env vars are absent, auth falls back to a cookie-based demo session. Login with `demo@johnflavin.ie` / `Flavin2025` to access protected routes.

### Architecture

**Auth & routing middleware** is in `proxy.ts` (not `middleware.ts`). It protects:
- `/catalogue`, `/portfolio`, `/account`, `/our-work` — redirect to `/login` if unauthenticated
- `/login`, `/register` — redirect to `/catalogue` if already authenticated

**Route groups:**
- `app/(protected)/` — requires login; `layout.tsx` just wraps children in `.main--inner`
- Public pages: `app/about/`, `app/contact/`, `app/login/`, `app/register/`, `app/page.tsx`

**Auth actions** (`app/actions/auth.ts`) — server actions for sign-up, sign-in, sign-out. All support both Supabase and the demo cookie fallback.

**Catalogue page** (`app/(protected)/catalogue/page.tsx`) — all product data (door styles, colours, handles, worktops) is hard-coded as arrays in the component, not fetched from an API. The wishlist is persisted to `localStorage` under the key `jf_wishlist` as a `WishlistItem[]` array.

**Supabase clients:**
- `lib/supabase/client.ts` — browser client (for client components)
- `lib/supabase/server.ts` — server client using `@supabase/ssr` (for server components and actions)

---

## Content & Copy Guidelines

See `context.md` for brand voice, audience, and supplier details. Key principle: copy should be specific and material-led (colour names, hardware brands, finish types) — not generic marketing language.

See `sitemap.md` for a full inventory of all pages, sections, and image assets.

Pending before launch — `context.md` → "Pending / Incomplete Items" lists the fields still needing real data (phone, email, hours, map embed, About page credentials).
