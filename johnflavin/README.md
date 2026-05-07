# Wood Interiors by John Flavin — Website Project

Website for **Wood Interiors by John Flavin**, a custom fitted furniture maker based in Duagh, Co. Kerry, Ireland. Domain: **johnflavin.ie**

---

## What This Is

A static HTML/CSS/JS website deployed to Vercel. No framework, no build step — files are edited directly and pushed to deploy. Content is managed through a single master JSON file (`site-content.json`) and a mirrored asset folder (`website/John Flavin/`).

---

## Project Structure

```
johnflavin/
├── site-content.json           # Master content file — all copy, project specs, options data
├── Other details.txt           # Miscellaneous notes
│
├── website/                    # Deployed site root (Vercel)
│   ├── index.html
│   ├── about.html
│   ├── contact.html
│   ├── our-work.html
│   ├── options.html
│   ├── services/
│   │   ├── kitchens.html
│   │   ├── bedrooms.html
│   │   ├── living.html
│   │   ├── utility.html
│   │   ├── bathrooms.html
│   │   └── wall-panels.html
│   ├── style.css
│   ├── main.js
│   ├── Logo/                   # Deployed logo files (subset)
│   └── John Flavin/            # Deployed media assets (mirrored from source)
│
├── John Flavin/                # Source content assets
│   ├── Our Work/               # 10 project folders (Our Work 1–10)
│   ├── Options/                # Doors, Colours, MFC, Worktops, Handles, Oak
│   ├── Kitchen/                # Showroom assets (Abbeyfeale, Listowel)
│   └── WEBSITE LAYOUT EXAMPLE.pdf
│
├── Logo/                       # Full logo asset library
└── Fonts/                      # Abril Fatface, Christopher Hand
```

---

## Deployment

Hosted on **Vercel** — project name `website`, org `team_BPXdHlundP5UsM3OAgKSa3hR`.

The `website/` folder is the deploy root. Any changes to HTML, CSS, JS, or assets inside `website/` go live on push.

---

## Adding New Content

### New Project (Our Work)
1. Create `John Flavin/Our Work/Our Work [N]/Images/` and add photos
2. Optionally add a `Videos/` subfolder and a `.txt` specs file
3. Copy a project block in `site-content.json` → `projects[]` and fill in all fields
4. Mirror the images to `website/John Flavin/Our Work/Our Work [N]/Images/`
5. Update `our-work.html` to render the new project card

### New Door Style
1. Add JPG to `John Flavin/Options/Doors/` (named descriptively, e.g. `porto-door-smooth-ammonite.jpg`)
2. Mirror to `website/John Flavin/Options/Doors/`
3. Add an entry to `site-content.json` → `options.door_styles.items[]`

### New Colour / MFC / Worktop Swatch
1. Add image to the relevant `Options/` subfolder
2. Mirror to `website/John Flavin/Options/`
3. Update `site-content.json` accordingly

### Pending Contact Details
The following are placeholders in `site-content.json` and need to be filled in before launch:
- `brand.phone`
- `brand.email`
- `pages.about.credentials` (qualifications, years in business)
- `pages.about.photo`
- `pages.contact.hours`
- `pages.contact.map_embed`
- `pages.about.body` (personal quote from John)
- Colortrend colours in `options.colours.ranges.colortrend`

---

## Key Files

| File | Purpose |
|------|---------|
| `site-content.json` | Single source of truth for all copy and content metadata |
| `website/style.css` | Full design system — tokens, layout, components |
| `website/main.js` | Navigation, mobile menu, scroll animations |
| `website/index.html` | Homepage |
| `website/our-work.html` | Portfolio gallery |
| `website/options.html` | Customisation options (doors, colours, worktops, handles) |

---

## Docs

- [context.md](context.md) — Business context, brand voice, services, target audience
- [sitemap.md](sitemap.md) — All pages, sections, and asset inventory
- [design.md](design.md) — Design system, tokens, typography, colour palette
