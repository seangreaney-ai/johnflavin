# Design System — Wood Interiors by John Flavin

Source file: `website/style.css`

---

## Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#702f18` | Mahogany red — CTAs, highlights, accents |
| `--secondary` | `#335b72` | Slate blue — secondary accents |
| `--dark` | `#0f0d0b` | Near-black — body text, dark backgrounds |
| `--warm-white` | `#f5f0ea` | Page background, light sections |
| `--stone` | `#e8ddd0` | Mid-tone warm stone — dividers, cards |
| `--mid` | `#9a8878` | Muted warm tone — secondary text elements |
| `--border` | `rgba(15,13,11,0.10)` | Subtle borders |

### Text Tokens

| Token | Value |
|-------|-------|
| `--text-primary` | `#0f0d0b` |
| `--text-secondary` | `rgba(15,13,11,0.55)` |
| `--text-light` | `#f5f0ea` (on dark backgrounds) |
| `--text-muted` | `rgba(245,240,234,0.55)` (light/muted on dark) |

---

## Typography

### Fonts

| Role | Family | Weight | Source |
|------|--------|--------|--------|
| Display / Headings | **Abril Fatface** | 400 (only weight) | Google Fonts |
| Body / UI | **DM Sans** | 300, 400, 500 | Google Fonts |
| Fallbacks (display) | Georgia, serif | — | System |
| Fallbacks (body) | -apple-system, sans-serif | — | System |

Local font files also available: `Fonts/AbrilFatface-Regular.ttf`, `Fonts/christopherhand.ttf`

### Type Scale

| Token | Size | Typical use |
|-------|------|-------------|
| `--text-xs` | 0.75rem | Labels, eyebrows |
| `--text-sm` | 0.875rem | Small UI text |
| `--text-base` | 1rem | Body copy |
| `--text-lg` | 1.125rem | Lead text |
| `--text-xl` | 1.375rem | Subheadings |
| `--text-2xl` | 2rem | Section headings |
| `--text-3xl` | 3rem | Page headings |
| `--text-4xl` | 4.5rem | Large headings |
| `--text-5xl` | 6.5rem | Hero on desktop |
| `--text-6xl` | 9rem | Maximum hero size |

---

## Spacing

| Token | Value |
|-------|-------|
| `--space-1` | 0.25rem |
| `--space-2` | 0.5rem |
| `--space-3` | 0.75rem |
| `--space-4` | 1rem |
| `--space-5` | 1.5rem |
| `--space-6` | 2rem |
| `--space-8` | 3rem |
| `--space-10` | 5rem |
| `--space-12` | 7rem |
| `--space-16` | 10rem |

---

## Layout

| Token | Value | Notes |
|-------|-------|-------|
| `--max-w` | 1320px | Max content width |
| `--gutter` | `clamp(1.5rem, 5vw, 4rem)` | Fluid horizontal padding |
| `--nav-h` | 72px | Fixed nav height |

---

## Animation

### Easing Curves

| Token | Cubic Bezier | Feel |
|-------|-------------|------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Fast deceleration — entrances |
| `--ease-in-expo` | `cubic-bezier(0.7, 0, 0.84, 0)` | Fast acceleration — exits |
| `--ease-in-out` | `cubic-bezier(0.87, 0, 0.13, 1)` | Sharp in-out — transforms |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Material standard |

### Duration Tokens

| Token | Value |
|-------|-------|
| `--dur-fast` | 200ms |
| `--dur-base` | 400ms |
| `--dur-slow` | 700ms |
| `--dur-xslow` | 1100ms |

---

## Logos

All logo files live in `Logo/` (source) and `website/Logo/` (deployed).

| File | Format | Variant | Use |
|------|--------|---------|-----|
| `WIbJF_Logo.svg` | SVG | Icon mark (dark) | Scalable icon, preferred |
| `WIbJF_Logo_v3.png` | PNG | Icon mark (dark) | Favicon, small uses |
| `WIbJF_Logo_v3_White.png` | PNG | Icon mark (white) | On dark backgrounds |
| `WIbJF_Long_Logo.png` | PNG | Full wordmark (dark) | Nav on light backgrounds |
| `WIbJF_Long_Logo.svg` | SVG | Full wordmark (dark) | Scalable wordmark |
| `WIbJF_Long_Logo_AllWhite.png` | PNG | Full wordmark (white) | Nav on dark backgrounds |
| `WIbJF_Long_Logo_White.png` | PNG | Partial white wordmark | Alt dark-bg use |
| `WIbJF_Logo_V2.png` | PNG | Earlier version | Archived |
| `WIbJF_Logo_V2_White.png` | PNG | Earlier version (white) | Archived |

The nav switches between `logo-white` (dark nav, hero) and `logo-dark` (scrolled/light nav) via CSS class.

---

## Navigation

- Fixed top nav, 72px height
- Dark variant (`data-theme="dark"`) over hero — shows white logo
- Scrolled variant — shows dark logo
- Mobile: hamburger menu → full-screen overlay with stacked links
- Primary CTA in nav: **"Get in Touch"** → `/contact.html`

---

## Key UI Patterns

### Buttons

| Class | Style | Use |
|-------|-------|-----|
| `.btn.btn--primary` | Filled — primary colour | Main CTA |
| `.btn.btn--ghost` | Outlined | Secondary action |

### Sections

- `eyebrow` class: small uppercase label above headings (e.g. location, category)
- Hero text uses `.line` / `.line-inner` for staggered reveal animation
- Service cards on homepage link to individual service pages
- Project cards on Our Work page: cover image, title, room type

### Theme Classes

- `data-theme="dark"` on nav activates white logo
- Light sections use `--warm-white` background
- Dark sections use `--dark` background with `--text-light` text

---

## Favicon

`website/Logo/WIbJF_Logo_v3.png` — declared as `<link rel="icon">` in all pages
