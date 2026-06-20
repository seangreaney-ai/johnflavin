# John Flavin Wood Interiors — Site Restructure Brief

**For:** Claude Code (working in this repo)
**Stack:** Next.js on Vercel. Brand tokens already defined. Members-only catalogue and a wishlist/enquiry loop already exist in some form.
**Golden rule:** Reuse the existing content, components and brand tokens. This is a **restructure**, not a rewrite or rebrand. Do not invent new copy or visual identity unless explicitly asked. (Exception: the *new connective copy* in section 4 — unlock block, CTAs, confirmation — is net-new for elements that don't exist yet, and is provided. John's existing prose is preserved and only lightly copy-edited.)

---

## 0. Before you change anything

Read the repo first and report back a short inventory. Do **not** start editing until this is done.

Confirm:
- App Router or Pages Router? Where do routes live?
- What auth (if any) is already wired up? (NextAuth/Auth.js, Clerk, custom, none?)
- Where are the brand tokens defined (Tailwind config, CSS variables, theme file)?
- What content/data already exists for showcases, finished builds, and options — hardcoded, MDX, CMS, JSON, or a DB?
- Does a "selection / wishlist" data structure already exist? Where is it stored (client state, cookie, DB)?
- How is the enquiry currently sent (email provider, API route, form service)?
- **The current route/URL list** (for the redirect map in section 4) and **John's existing home/about copy text** (for the copy-edit pass).

Output a 10–15 line summary of findings and a proposed file-change list. Wait for my go-ahead before building.

---

## 1. The goal in one paragraph

A visitor lands on a **public** home page that shows a few showcase pieces and clearly communicates that logging in unlocks everything: the full showcase, all finished customer builds, and the full options catalogue (doors, finishes, colours, etc.). Once logged in, the visitor browses options and adds them to a personal **My Selection**. They send that selection to John. John receives a clean summary of what they like, gathers the real physical samples, and phones them personally. The site's job ends at delivering John a readable selection and setting that expectation with the customer.

---

## 2. Information architecture — three zones

**Zone A — Public (locked).** Anything visible without an account.
- Home page: hero, a small curated set of showcase pieces (teaser), and an explicit unlock message + log in / register CTA.
- Optional: about/contact if they already exist. Keep them public.

**Zone B — Members (unlocked).** Everything behind auth.
- Full showcase + all finished customer-fitted builds.
- Options catalogue: doors, finishes, colours (and any other option categories already in the content).
- My Selection page (the wishlist) — add, review, remove, annotate.
- Send selection action + confirmation screen.

**Zone C — John's follow-up (offline).** Not built as UI for the customer.
- John receives the selection (email and/or simple admin view).
- He gathers samples and calls the customer. No automation here.

---

## 3. Routes / pages

Adapt names to the existing convention. Suggested App Router layout:

```
/                      public home (teaser + unlock messaging)
/login  /register      auth entry (or a single combined route)
/(members)/            auth-gated group
  /showcase            full gallery + finished builds
  /options             catalogue index (doors / finishes / colours …)
  /options/[category]  category browse + "add to selection"
  /selection           My Selection (review, edit, send)
  /selection/sent      confirmation screen
/admin (optional)      John's read-only view of submitted selections
```

Gate the entire `(members)` group with one auth check (middleware or a layout-level guard) so individual pages don't each re-implement it.

**Redirect map:** any URL that changes needs a 301 to its new path so John keeps his link equity and nothing 404s. Build this against the *current* URL list (section 0) — don't change a route without adding its redirect.

---

## 4. Home page spec (public + logged-in)

The home page is the crux: it must prove quality with a few pieces *and* make the value of logging in unmistakable. The note in brackets after each choice is the behavioural *reason*, not text to ship.

### Layout — logged-out
1. **Hero** — one strong finished piece + headline + sub. Proves craft immediately.
2. **Teaser gallery** — 3–4 showcase pieces only, pulled from the real showcase data via a `featured` flag (single source of truth). Enough to prove quality, not enough to satisfy. [open loop / curiosity gap]
3. **Unlock block** — explicit statement of what logging in opens, with the primary CTA. [reciprocity: value given free first; commitment: small first step]
4. **The personal promise** — a short line naming what happens after you send a selection: John gathers real samples and calls you. [peak-end: name the differentiator up front]

### Layout — logged-in
Same page, swapped CTAs: *Browse the full catalogue* / *Start your selection*. If a selection is in progress, surface "Your selection (N)". [Zeigarnik: the open loop pulls them back to finish]

### Why it works — the levers that actually fit
- **Endowment + IKEA effect** — the customer *builds* their own selection, so they value it and feel ownership before John ever calls. My Selection is the conversion mechanism, not a feature. Strongest lever; design around it.
- **Reciprocity + open loop** — the free teaser gives value first and shows just enough to leave "there's more behind here."
- **Commitment escalation** — log in (small) → add to selection (bigger) → send (biggest). Never ask for the big yes first.
- **Peak-end** — John ringing you personally is the peak and his real edge over faceless retailers. Promise it on the home page, deliver it on the confirmation screen.

### Draft copy (new connective copy — adapt to John's voice)
- **Unlock block:** "You're seeing a handful of John's pieces. Log in to see his full portfolio of finished customer builds — and to browse every door, finish and colour and put together your own selection."
  - Primary CTA: *Log in to see everything* · Secondary: *Create an account* · Microcopy: *Free, takes a minute.* [zero-price + low activation energy]
- **Logged-in CTA:** *Browse the full catalogue* / *Start your selection*
- **Confirmation screen:** "Your selection's on its way to John. He'll gather the real samples — the actual doors, finishes and colours you picked — and give you a call to talk it through. No forms, no showroom queue. Just a conversation about your project."

### Ethics guardrail
The gating only works because the exclusivity is **real** — there genuinely is more behind the login. No fake scarcity, no countdown timers, no "only 2 spots left." Honest exclusivity builds trust; manufactured urgency erodes it.

### Selection-page nudges (same principles, carried through)
- Ownership language: "Your selection (3 items)", not "Cart". [endowment]
- A per-item note field. [IKEA effect — effort raises perceived value]
- Gentle direction, not a fake progress bar: "Add doors, finishes and colours, then send to John."
- Send CTA in the customer's words: *Send my selection to John*.

### Inputs needed to finish this properly
- **John's current home/about copy** — so the existing prose gets a real copy-edit pass, not a guess.
- **The current URL list** — to build the redirect map (section 3). Claude Code can dump the route tree, or point to the live sitemap.

---

## 5. Auth & gating

- If auth already exists, **extend it** — do not swap providers.
- If none exists, use **Auth.js (NextAuth)** with email magic-link (lowest friction for John's customers; no passwords to manage). Credentials provider is an acceptable fallback.
- Logged-out users hitting a `(members)` route → redirect to `/login` with a return URL.
- The home page must render fine for both states. Logged-out: teaser + CTA. Logged-in: swap the CTA per section 4.
- Keep the teaser content as a small **subset** of the real showcase data (e.g. a `featured: true` flag) so there's a single source of truth — don't duplicate showcase items into a separate "public" list.

---

## 6. The selection feature

### Data model
A selection is a list of chosen options plus the customer's contact details and an optional message.

```ts
type SelectionItem = {
  id: string;          // option id from the catalogue
  category: string;    // "door" | "finish" | "colour" | …
  name: string;
  image?: string;
  note?: string;       // customer's own note on this item
};

type Selection = {
  items: SelectionItem[];
  message?: string;            // free-text note to John
  customer: { name: string; email: string; phone?: string };
  submittedAt?: string;
};
```

### Behaviour
- "Add to selection" appears on every option in the catalogue. Adding is instant and reversible.
- Persist the in-progress selection so it survives navigation and refresh. Prefer the **user's account** (DB) if there's already a DB; otherwise a cookie/localStorage keyed to the session is fine for an MVP — flag which you chose.
- My Selection page: grouped by category, each item removable, with an optional per-item note and one overall message field.
- Pre-fill customer name/email from the logged-in account; let them add a phone number.

---

## 7. Send-to-John mechanism

Keep it simple and robust. On send:

1. Validate the selection isn't empty and contact details are present.
2. **Server action / API route** sends John an email containing a clean, readable summary: customer name, email, phone, each chosen item (category, name, note), and the overall message. Include thumbnails if easy.
3. Use the email provider already configured in the repo. If none, use Resend or the existing SendGrid setup — check first, don't add a second provider.
4. Optionally also persist the submitted selection (Vercel Postgres / KV or existing DB) so `/admin` can list submissions. Optional for MVP — gate behind whether a DB already exists.
5. Show the customer the confirmation screen from section 4. Send the customer a copy/receipt email if the provider makes it trivial.

Do **not** build customer-facing automation beyond the confirmation + receipt. The phone call is deliberately human.

---

## 8. Guardrails

**Do**
- Reuse existing components, content, copy and brand tokens.
- Keep one source of truth for showcase/options data; use flags (`featured`, `public`) rather than duplicate lists.
- Make the lock/unlock value proposition explicit in home-page copy (section 4).
- Add a 301 for every changed URL.
- Work in small, reviewable commits per phase below.

**Don't**
- Rewrite or "improve" John's existing prose (the section 4 connective copy is the only net-new copy).
- Introduce a new design system, font, or colour palette.
- Add a heavy CMS or new auth provider if one already exists.
- Automate John's sample-gathering or the phone call.
- Put any selection/options data behind the public routes.
- Use fake scarcity or urgency (see the ethics guardrail in section 4).

---

## 9. Suggested build order (commit per step, pause for review)

1. **Inventory** (section 0) — report findings, propose file changes, wait for go-ahead.
2. **Auth gate** — wrap the `(members)` group; redirect logged-out users; confirm home renders in both states.
3. **Home restructure** — build to the Home page spec (section 4): teaser subset, unlock block, CTAs, personal promise. Existing prose preserved; connective copy provided.
4. **Showcase (members)** — full gallery + finished builds behind the gate.
5. **Options catalogue** — index + `[category]` pages with "add to selection".
6. **My Selection** — persistent state, review/edit, notes, message field, the nudges in section 4.
7. **Send to John** — server action, email summary, confirmation screen.
8. **Redirects** — add 301s for any changed URLs.
9. **(Optional) Admin view** — read-only list of submitted selections.

After each step, summarise what changed and how to test it locally before moving on.

---

## 10. Definition of done

- A logged-out visitor sees only the teaser + clear unlock messaging; all options and the full gallery are inaccessible.
- The home page follows the spec in section 4 in both logged-out and logged-in states.
- Logging in unlocks the full showcase, finished builds, and the options catalogue.
- A user can add doors/finishes/colours to My Selection, annotate, review, and send.
- John reliably receives a clean, readable summary of the selection.
- The customer sees a confirmation that explains John will gather samples and call them.
- Every changed URL has a working 301 redirect.
- No existing content or brand tokens were rewritten; the diff is structural.
