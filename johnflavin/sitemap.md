# Sitemap — johnflavin.ie

All pages live under `website/`. Paths are relative to the deploy root.

---

## Pages

### `/` — Home (`index.html`)

| Section | Content |
|---------|---------|
| Hero | Full-bleed image (`shaker-kitchen-01.jpg`), headline, sub, two CTAs (See Our Work / Free Consultation) |
| Intro | "Built for Kerry Homes" — brand intro paragraph |
| Services grid | 6 service cards linking to each service page |
| Recent Projects | Featured project cards (4 projects marked `featured: true`) |
| Options CTA | Teaser with link to `/options.html` |
| Contact CTA | "Ready to Get Started?" — link to `/contact.html` |
| Footer | Logo, nav links, contact details |

---

### `/our-work.html` — Our Work

Portfolio gallery of all 10 completed projects. Each card shows cover image, title, room type, and links to a detail view or lightbox.

**Projects rendered (in order):**

| ID | Title | Room | Images | Video |
|----|-------|------|--------|-------|
| `shaker-kitchen` | Shaker Kitchen — Ivory & Slaked Lime | Kitchen | 10 + 15 more | Yes |
| `cardiff-sitting-room` | Cardiff Sitting Room Unit | Living | 4 | No |
| `sliderobe` | 2-Door Mirror Sliderobe | Bedroom | 5 | No |
| `micro-shaker-wardrobe` | Micro Shaker Wardrobe — Pigeon | Bedroom | 5 | No |
| `calaway-sitting-room` | Calaway Sitting Room Unit — Graphite Grey | Living | 5 | Yes |
| `tv-unit` | Telford TV Unit — Alabaster White | Living | 4 | No |
| `display-storage-unit` | Display & Storage Unit — Inchyra | Living | 3 | No |
| `step-shaker-wardrobe` | Step Shaker Wardrobe — Shaded White | Bedroom | 3 | No |
| `black-mirror-sliderobe` | Mirror Sliderobe — Black Track | Bedroom | 4 | No |
| `mfc-utility` | MFC Utility Room — Tyrolean Blue | Utility | 6 | Yes |

**Asset paths** (images): `John Flavin/Our Work/Our Work [N]/Images/`
**Asset paths** (video): `John Flavin/Our Work/Our Work [N]/Videos/` or `/Video/`

---

### `/options.html` — Options

Showcases all customisation choices available to customers.

| Section | Content | Asset folder |
|---------|---------|-------------|
| Door Styles | 20 door styles with name, description, image | `John Flavin/Options/Doors/` |
| Painted Colours — Farrow & Ball | 22 colours listed | `John Flavin/Options/Colour Sample images/` |
| Painted Colours — Colortrend | Partial list (needs completing) | — |
| MFC Colours & Board Finishes | Full image library | `John Flavin/Options/MFC Colours/` |
| Worktops | Quartz, Solid Oak, Laminate | `John Flavin/Options/Micro worktops/`, `Solid Oak Finishes/` |
| Handles & Knobs | 6 categories, 17+ named items | Links to hafele.ie |
| Sliderobe Track & Surround | Chrome, black options | `John Flavin/Options/Sliderobe metal Surround/` |

**Door styles available:**
Shaker, Micro Shaker, Step Shaker, Step Shaker Ash, Calaway Ash, Calaway Ash (Grey), Cardiff, Porto, Telford, Harrington Shaker, Harrington (Charcoal), Harrington (French Grey), J-Profile, Plain Slab, Plain Slab with Groove, Mock Inframe, Willow Oak (Smoke), Willow Oak (White), Oak (White Ash Stain), Step Shaker Ash (Dove Grey)

**Farrow & Ball colours on site:**
Wimborne White, Shaded White, Strong White, All White, White Tie, Pointing, Pigeon, French Grey, Pavillion Grey, Dove Grey, Purbeck Stone, Cornforth White, Railings, Off Black, Pitch Black, Ammonite, Elephants Breath, Inchyra, Studio Green, Green Smoke, Hague Blue, Slaked Lime Dark

**Solid Oak finishes:** Charcoal, Chocolate, Havana, Oak, Smoke 5%, Smoke, Superwhite, Walnut

**Micro/laminate worktop swatches (30+):** Barnwood, Black Marble, Calacata Marble, Castle Marble White, Causeway, Cirrus Cloud, Copper Stone, Dusky Black, Fossil Grey, Frosty, Highland Oak, Jade, Jet Quarry, Latte Dream, Light Walnut, Limestone, Lorenzo, Milan Marble, Mount Blanc Stone, Mourne Slate, Pebbles, Recycled Plank, Safari Oak, Silverback Marble, Soft Oak, Soft Shimmer Matt, Storm Terrazzo, White Quartz, Winter Stone, Winter Stone 2

---

### `/about.html` — About

| Section | Content |
|---------|---------|
| Heading | "About John Flavin" |
| Body | Bio: 25+ years experience, based Duagh, Co. Kerry, personal approach, trusted suppliers |
| Credentials | *[Placeholder — qualifications, years in business, service area]* |
| Photo | *[Placeholder — professional photo of John]* |
| Quote | *[Placeholder — personal quote from John]* |

---

### `/contact.html` — Contact

| Section | Content |
|---------|---------|
| Heading | "Get in Touch" |
| Sub | Free consultation and home visit offer |
| Address | Duagh, Co. Kerry, Ireland |
| Phone | *[Placeholder]* |
| Email | *[Placeholder]* |
| Hours | *[Placeholder]* |
| Map | *[Placeholder — Google Maps embed]* |
| Contact form | Name, email, message fields |

---

### Service Pages (`/services/`)

Each service page shares the same structure: hero/intro, feature list, project gallery excerpt, CTA.

| Path | Heading | CTA |
|------|---------|-----|
| `services/kitchens.html` | Custom Kitchens | View Kitchen Projects |
| `services/bedrooms.html` | Fitted Bedrooms & Wardrobes | View Bedroom Projects |
| `services/living.html` | Living Room & Sitting Room Units | View Living Room Projects |
| `services/utility.html` | Utility Rooms | View Utility Projects |
| `services/bathrooms.html` | Bathroom Furniture | Get in Touch |
| `services/wall-panels.html` | Wall Panels | Get in Touch |

---

## Navigation Structure

```
Home  /
├── Our Work          /our-work.html
├── Options           /options.html
├── About             /about.html
├── Get in Touch →    /contact.html
│
└── Services (footer / service cards)
    ├── Kitchens      /services/kitchens.html
    ├── Bedrooms      /services/bedrooms.html
    ├── Living        /services/living.html
    ├── Utility       /services/utility.html
    ├── Bathrooms     /services/bathrooms.html
    └── Wall Panels   /services/wall-panels.html
```

---

## Asset Inventory Summary

| Folder | Type | Count (approx) |
|--------|------|---------------|
| `Our Work/` (all projects) | Photos + Videos | ~90 images, 3 videos |
| `Options/Doors/` | Door style JPGs | 20 |
| `Options/Colour Sample images/` | Painted colour swatches | 22 |
| `Options/MFC Colours/` | MFC board swatches | 55+ |
| `Options/Micro worktops/` | Worktop swatches | 30 |
| `Options/Solid Oak Finishes/` | Oak finish swatches | 8 |
| `Options/Sliderobe metal Surround/` | Track photos | 1 |
| `Logo/` | SVG, PNG (dark + white) | 9 files |
| `Kitchen/Showroom/` | Showroom photos + text | 2 locations |
