# Parc Auto Yanis — UX / UI / Code Audit

Date: 2026-07-02 · Auditor: senior product design + frontend review
Goal reference: "one of the cleanest Romanian car marketplaces — usability first,
a 65-year-old should browse without help."

## Snapshot of the current state

- **Stack**: TanStack Start (SSR) + React 19 + Tailwind CSS v4 + shadcn/ui + motion (Framer Motion) + Lovable tooling. Solid, modern base — no stack change needed.
- **Pages**: Home, Stoc (inventory), Vehicul/:slug (detail), Finanțare, Despre, Contact.
- **Current aesthetic**: "luxury editorial" — oversized serif headlines with italic accents, glassmorphism chips, dark ink sections, parallax hero, blur-in scroll reveals, animated counters, grain textures.

The craft level is high, but the design language is optimized to *impress*, not to *be used*. Nearly every problem below traces back to that mismatch.

---

## A. Critical — broken or deceptive interactions

### A1. The entire inventory filter UI is fake
- **What**: On `/stoc`, the search input, the "Caută" button, "Filtre avansate", and all 20+ filter chips (brand/price/fuel/transmission/year) are static. Chips have a hardcoded `active` state on index 0. Nothing filters anything.
- **Why it hurts**: This is the core task of a car marketplace — narrowing the stock. A user who taps "Diesel" and sees nothing change concludes the site is broken and leaves. For a less tech-savvy user it's worse: they blame themselves.
- **Fix**: Implement real state-driven filtering (brand, fuel, transmission, price band, year, free-text) with instant results, a live result count, an empty state with a "reset filters" action, and URL-synced state so back/refresh/share work.

### A2. The financing simulator is fake
- **What**: On `/finantare`, the three "sliders" are static divs, the result "247 €/lună" is hardcoded, and "Aplică acum" does nothing.
- **Why it hurts**: Financing is the #2 conversion path. A fake calculator destroys trust the moment someone drags a slider that doesn't move.
- **Fix**: Real calculator — price, down payment, term inputs (large native sliders + steppers), real annuity math with a clearly labeled orientative interest rate, and a CTA that carries the values into the contact form.

### A3. The contact form goes nowhere
- **What**: `onSubmit={(e) => e.preventDefault()}` — no validation, no feedback, no destination. Labels are not associated with inputs (`htmlFor`/`id` missing).
- **Why it hurts**: Someone writes a message, presses send, nothing happens. That's a lost lead and a frustrated user. Missing label association also breaks screen readers and tap-to-focus on labels.
- **Fix**: Proper labels, required fields, inline validation in Romanian, and a real delivery path that works without a backend (prefilled WhatsApp/email handoff), plus a visible confirmation state.

### A4. Dead buttons and placeholder links everywhere
- **What**: Heart/save buttons (cards + detail page), Share button, WhatsApp button (`href="#"`), Instagram links (`href="#"`), "Programează vizionare" on the vehicle page (a `<button>` with no action).
- **Why it hurts**: Every dead control teaches the user "controls on this site may not work". Older users don't retry — they stop trusting.
- **Fix**: Remove non-functional decorations (heart, share). Wire WhatsApp to a real `wa.me` link with a prefilled message per car. "Programează vizionare" navigates to contact with the car preselected. Centralize contact data in one config file.

### A5. Misleading content
- **What**: A fake "Rezervat curând" urgency tag, "Actualizat astăzi" generated at render time, a per-84-months price division presented as a financing rate (ignores interest), and a generic description claiming CarPlay/leather/ambient lighting for *every* car regardless of its actual spec (only the Mercedes has real data).
- **Why it hurts**: A car buyer who arrives on-site and finds the ad overstated will not buy — and will tell others. Deceptive urgency patterns also specifically prey on less experienced users.
- **Fix**: Remove fake urgency and fake freshness. Label all financing figures as orientative and compute them honestly. Only show spec/description data that exists for that car.

---

## B. High — usability and readability

### B1. Typography works against readability
- **What**: Decorative serif italics *inside* headlines ("Rate care se *așează liniștit* în bugetul tău"), metaphor-heavy copy, and ubiquitous 11px letter-spaced uppercase micro-labels (`text-[11px] tracking-[0.25em]`) used for real information (spec labels, form labels, section markers).
- **Why it hurts**: 11px uppercase with 0.25em tracking is close to illegible for 50+ eyes. Poetic headlines make users decode meaning ("what does 'a curated private collection' mean — can I buy a car here?"). The brief's rule: if someone needs to think, redesign it.
- **Fix**: One typeface (Inter), plain-language headlines that say what the section is ("Mașini în stoc", "Calculator de rate"), minimum 13–14px for labels, 16–18px body, sentence case for labels.

### B2. Glassmorphism and low-contrast text
- **What**: `glass`/`glass-dark` chips over photos (photo count badge, card tags, hero badge), text at `white/40`, `white/50`, `white/60` on dark sections, `text-graphite` (45% lightness) for body copy.
- **Why it hurts**: Text over blurred photos has unpredictable contrast — WCAG AA fails routinely. The brief explicitly bans glassmorphism.
- **Fix**: Solid white or solid dark chips with AA-checked text colors; raise dark-section secondary text to ≥ 70% white; body text at near-black.

### B3. No accent color — CTAs don't stand out
- **What**: Every button is black-on-white or white-on-black. "Programează vizionare" (the money button) looks exactly like "Sună".
- **Why it hurts**: Users scan for "the colored button". With an all-monochrome UI the primary action has no visual priority.
- **Fix**: Introduce one brand accent (deep trustworthy blue), used *only* for primary CTAs and key highlights. Everything else stays neutral — matching the brief's restrained palette.

### B4. Animation quantity and duration
- **What**: Parallax + scale hero, 18s drifting gradients, blur-in reveals on nearly every element (900ms), 900ms image zooms on hover, staggered delays up to ~1s, animated counters in three places.
- **Why it hurts**: Content appears late and moves while people try to read it; blur filters are expensive on low-end phones; hover-zoom on the main photo makes the product harder to look at. Brief: 150–250ms, purposeful only.
- **Fix**: Remove parallax, gradient drift, blur reveals and hover zooms. Keep only fast (≤250ms) hover/focus feedback and one subtle fade on page content. `prefers-reduced-motion` already partially handled — keep that.

### B5. Homepage doesn't lead with the product
- **What**: 100svh hero with a mood photo and a tagline; the cars appear after a full screen of brand poetry. Two nearly identical car-grid sections (Featured + "Marketplace preview"). Duplicate stats in three places. An Instagram gallery pointing at `#`. No FAQ.
- **Why it hurts**: A first-time visitor's question is "what cars do you have and at what price?" — currently they must scroll past ~2 screens to find out. Redundant sections dilute; a dead Instagram section wastes prime space.
- **Fix**: Compact hero with an immediate path to stock (search/quick brand links + CTA), one featured-cars section, Why-us, Financing, Testimonials, FAQ (new), Contact — each in plain language with breathing room.

### B6. Car card hides key facts and requires hover
- **What**: Card shows brand/model/year/km/fuel/price, but transmission, power and location are missing; "Vezi detalii" only appears on hover (doesn't exist on touch); heart button is dead; price is set in a decorative serif smaller than the model name.
- **Why it hurts**: Buyers filter mentally on gearbox ("automată?") and power — forcing a click to find out wastes trips. Hover-only affordances don't exist on mobile.
- **Fix**: Redesigned flat card: large photo, "Marcă Model" as one clear title, price as the most prominent text element, and a visible spec row (year · km · fuel · gearbox · power). Whole card is one obvious link; no hover-dependent info.

### B7. Vehicle page information hierarchy
- **What**: Title is an enormous serif headline with the year in italic; spec labels in 11px uppercase; empty spec values shown as "—" for most cars; the sticky card mixes a fake rate with real price; gallery lightbox has no keyboard support (no Escape/arrows) and no focus management.
- **Why it hurts**: The page's job is: what is it, how much, can I finance it, how do I contact you. All four answers are visually whispered while decoration shouts. "—" rows look broken. Keyboard users get trapped in the lightbox.
- **Fix**: Clear title + price block, honest spec grid (hide unknown rows), orientative financing labeled as such with link to the calculator, contact actions (call / WhatsApp / form) as unmistakable buttons, and a lightbox with Escape/arrow keys, focus handling, and visible controls.

---

## C. Medium — accessibility & correctness

- **C1. `<html lang="en">`** on a fully Romanian site → wrong screen-reader pronunciation, wrong hyphenation, wrong translation prompts. Fix: `lang="ro"`, plus Romanian 404/error pages (currently English).
- **C2. Focus states**: inputs use `focus:outline-none` with only a subtle border-color change; custom buttons have no focus-visible styling. Fix: global, high-visibility `:focus-visible` ring.
- **C3. Mobile menu**: toggle button lacks `aria-expanded`/`aria-controls`; menu items are comfortable but the menu doesn't close on route change via keyboard consistently. Fix: proper ARIA and larger tap rows.
- **C4. Images**: no explicit `width`/`height` (CLS risk), hero image not preloaded (LCP), decorative images fine with empty alt but product photos need real alt text (partially done). Fix: dimensions everywhere, `fetchpriority="high"` on the LCP image, `loading="lazy"` below the fold (partially present).
- **C5. Small tap targets**: 40px icon buttons at the edge (heart, social), text-only links for key actions. Fix: minimum ~44–48px targets for all interactive elements.
- **C6. Skip link missing** for keyboard users. Fix: add "Sari la conținut".

---

## D. Code quality & performance

- **D1. Build was broken on a standard machine**: `@lovable.dev/vite-tanstack-config`'s CJS entry `require()`s the ESM-only `lovable-tagger`. Fixed by importing the package's ESM build directly in `vite.config.ts`.
- **D2. Duplicated placeholder data**: the same four stock photos are reused across nine "different" cars, and only the Mercedes has real spec/photos. The vehicle page special-cases `slug === "mercedes-cla-180-2016"`. Fix: normalize the data model — every vehicle carries its own photos/spec/features (optional fields), no slug special-casing; keep placeholder cars clearly structured for easy replacement.
- **D3. Contact data scattered**: the phone number is hardcoded in 4 files (and inconsistent with reality — `+40 743 000 000` placeholder). Fix: single `src/lib/site.ts` config consumed everywhere.
- **D4. Dead weight**: ~45 shadcn components, recharts, embla, react-hook-form, date-fns, etc. are installed but unused by routes (tree-shaken from the bundle, but noise for maintenance). Motion is used for everything including things CSS can do. Fix (low priority): trim once the design settles; replace scroll-reveal machinery with CSS.
- **D5. Homepage is a 505-line file** mixing 9 section components. Fix: split into focused section components under `src/components/home/`.

---

## Implementation plan (in commit order)

1. **Foundation** — build fix, `lang="ro"`, design tokens (accent color, type scale, focus ring), strip glass utilities, retime animations, Reveal → subtle fade.
2. **Navigation + footer** — solid readable nav, phone number visible, accessible mobile menu, honest footer links.
3. **Vehicle card** — flat redesign with full spec row, price prominence, no dead controls.
4. **Stoc** — working filters + search + sort + URL state + empty state.
5. **Homepage** — rebuilt: hero with instant path to stock, featured, why-us, financing, testimonials, FAQ, contact CTA. Remove parallax/Instagram/duplicate sections.
6. **Vehicle page** — hierarchy fix, honest data model, working contact actions, accessible lightbox.
7. **Finanțare** — real calculator with honest math.
8. **Contact** — working, validated, accessible form.
9. **Despre + polish** — typography pass, images (dimensions, preload), skip link, final sweep.

Each step is committed separately so the Lovable-connected branch stays in a working state throughout.
