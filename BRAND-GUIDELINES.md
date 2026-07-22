# pixellent_ brand guidelines & animation rules

v1.1 — July 2026 · applies to web, mobile, print, motion & anything else with our name on it.

Interactive versions: [brand-guidelines.html](brand-guidelines.html) (visual document) · [index.html](index.html) (live landing page, reference implementation of every rule below).

---

## 01 / The idea — one pixel at a time

Everything Pixellent makes is built from small, precise units — pixels. The brand expresses this literally: square cells, hard edges, a strict grid. Nothing rounded, nothing blurred, nothing decorative that doesn't sit on the grid. When in doubt: **sharp, dark, one loud color.**

- Square corners everywhere. No `border-radius`, ever.
- Dark canvas first — the brand lives on Ink; light backgrounds are the exception.
- Acid is scarce. If more than ~10% of a layout is Acid, remove some.
- Monospace for anything technical, meta or small; Grotesk for everything with a voice.

---

## 02 / Logo — the mark & lockup

The mark is a 3×3 pixel grid with six lit cells forming a diagonal flow — an idea coming into focus. The wordmark is lowercase **pixellent** with a trailing Acid underscore: the cursor, always ready for the next thing.

| Asset | File | Use |
|---|---|---|
| Mark | `assets/brand/logo-mark.svg` | App icons, favicons, avatars, watermarks |
| Lockup | `assets/brand/logo-horizontal.svg` | Headers, footers, documents, signage |
| Favicon | `assets/brand/favicon.svg` | Browser tabs |

**Rules**

- Clear space around the mark = one grid cell on every side. Nothing enters it.
- Minimum size: mark 20px, lockup 110px wide. Below that, use the mark alone.
- On photos or busy backgrounds use the mono-white mark; on light backgrounds mono-black.
- ✕ Never rotate, recolor cell-by-cell, add shadows/glows, round the corners, or set the wordmark in another font.
- ✕ Never capitalize: it's `pixellent_`, not Pixellent or PIXELLENT, in the lockup.

---

## 03 / Color — five colors, that's all

| Name | Hex | CSS token | Share | Use |
|---|---|---|---|---|
| Ink | `#0a0a0e` | `--ink` | ~80% of any layout | The canvas. Default background for web, decks, social. Also the text color on Acid. |
| Acid | `#d6fb41` | `--acid` | ≤10%, one job per view | The signal. CTAs, active states, the underscore, lit pixels, section numbers. Scarcity is what makes it work. |
| Paper | `#eef0ea` | `--paper` | Headlines & key text | Primary text on Ink. Also the light background for print pieces where dark isn't possible. |
| Fog | `#9a9ba4` | `--fog` | Body & secondary text | Paragraphs, captions, muted labels. Never for headlines or CTAs. |
| Cell grey | `#2b2b33` | `--cell` | Structure only | Unlit pixels, borders on interactive elements. Never text. |

**Structural tokens** (shades of the five, not new hues):

| Hex | CSS token | Use |
|---|---|---|
| `#1c1c23` | `--line` | Hairline dividers, card borders, 1px grid gaps |
| `#101016` | `--hover` | Card/input fill on hover or focus |
| `#0d0d12` | — | Product-row hover fill |
| `#6b6c76` | `--meta` | Smallest meta text (mono captions, footer) |
| `#ff5c5c` | — | Semantic error red. UI only, sparingly. |

**Rules**

- Acid is for exactly one thing per view: the action or the accent — never both, never body text, never large fills behind text longer than a headline.
- Text on Acid is always Ink. Text on Ink is Paper (headlines) or Fog (body).
- ✕ No gradients, no transparency tints of Acid, no additional hues.

---

## 04 / Typography — two voices

| Font | Role | Rules |
|---|---|---|
| **Space Grotesk** | THE VOICE — headlines, product names, body copy | Weights 400–700. Headlines: 700, letter-spacing −0.03em to −0.04em, line-height 0.92–1.0. Body: 400, line-height 1.55–1.7. Never below 14px. |
| **IBM Plex Mono** | THE MACHINE — labels, tags, buttons, meta, code | Weights 400–600. All small functional text: nav links, section numbers, tags, captions, form fields, CTAs. Lowercase by default; uppercase only for tiny section labels with .06–.08em tracking. |

- Section numbering pattern: `01, 02, 03…` in Acid mono before every section title.
- Comment syntax `// like this` and prompts `$ command` are part of the voice — use them for kickers and micro-copy.
- ✕ No third typeface, no italics, no ALL-CAPS headlines.

---

## 05 / The pixel motif — cells, squares, hard edges

- **Progress dots** — 8px squares, Acid = active, Cell grey = rest.
- **Bullets** — the ▪ square, always Acid, never round •.
- **The underscore** — blinking on hero headlines only, static elsewhere.
- Dividers are 1px lines in `#1c1c23`; cards are 1px-bordered boxes, no shadows, no fills unless hovered (`#101016`).
- Decorative pixel fields (hero, contact) sit behind content at low intensity — decoration never competes with text.
- ✕ No rounded corners, drop shadows, glassmorphism, gradients, or organic shapes. If it isn't on the grid, it isn't Pixellent.

---

## 06 / Motion principles — snap, don't ease

Pixels don't glide — they switch. Motion in the Pixellent brand is discrete and digital.

- Prefer stepped timing: `steps(n)` keyframes, cell-by-cell reveals, blink cycles (~1.1s).
- Hover states switch instantly or ≤120ms — color and border only, no scaling or lifting.
- Interactive pixel fields decay fast (×0.95/frame) so the canvas returns to calm within a second.
- Marquees scroll linearly, slow (25–30s per loop), and pause for reduced-motion users.
- ✕ No bounces, springs, parallax, blur transitions, or fade-in-on-scroll everything.

---

## 07 / Voice — confident, short, lowercase

- Say the thing directly: "We bring your idea to life." Not "Empowering digital transformation."
- CTAs are verbs in mono lowercase: `start a project ↗`, `see the work`.
- Arrows: ↗ for actions that go somewhere, ↓ for downloads. No emoji.
- ✕ No buzzwords (synergy, cutting-edge, next-gen), no exclamation marks, no emoji.

---
---

# Animation rules — current implementation

Everything below is implemented in [index.html](index.html) and is the reference spec for any new page. All CSS animations use `steps()` timing (never `ease`); all canvas animations are authored in **60fps frame units** and time-normalized so they run at identical speed on 60/120/144Hz displays.

## A. CSS keyframe library

| Keyframe | Behavior | Timing | Used on |
|---|---|---|---|
| `px-marquee` | translateX 0 → −50% | 28s linear infinite | Client marquee strip (content duplicated ×2 for a seamless loop) |
| `px-blink` | opacity 1 ↔ 0 | 1.1s steps(1) infinite | Hero headline underscore only |
| `px-dot` | on 0–30%, dim (.14) rest | 1.8s steps(1), staggered .6s | Service-card progress dots (3 dots chasing) |
| `px-scan` | brief pulse at 8–16% | 2.4s steps(1), staggered .2s | Process-step scan strip (8 × 6px dots) |
| `px-wink` | on 0–88%, off 89–96% | 4.2s steps(1), delays 0 / .6 / 1.3 / 2.1 / 2.9 / 3.6s | Nav logo — the six lit cells wink one at a time |
| `px-flicker` | neon flicker dips at 7%, 47%, 82% | per-tag duration & delay (below) | Stack tags |

**Stack flicker values** — generated from `dur = 5 + (i × 1.7) % 4` seconds, `delay = (i × 0.83) % 5` seconds for tag index i (0-based). Current rendered values:

| tag | dur | delay | tag | dur | delay |
|---|---|---|---|---|---|
| react | 5.0s | 0.00s | python | 5.5s | 4.15s |
| react-native | 6.7s | 0.83s | postgres | 7.2s | 4.98s |
| three.js | 8.4s | 1.66s | tensorflow | 8.9s | 0.81s |
| node | 6.1s | 2.49s | aws | 6.6s | 1.64s |
| typescript | 7.8s | 3.32s | docker | 8.3s | 2.47s |

**Hover transitions** — `transition: … .12s steps(2)` on cards, product rows, stack tags. Color and border only. Never transform, scale, or shadow.

## B. Hero pixel field (canvas `#px-field`)

Grid of 26px cells (3px gap) drawn in Acid; unlit cells show a 2px Paper dot at 5% alpha.

**Time base** — the loop measures real elapsed time per rAF frame and converts it to 60fps frame units: `dtF = min((now − last) / 16.667ms, 4) × SPEED`. The cap of 4 prevents a burst after tab-switching. **`SPEED = 2`** (current setting) — one global constant scales the entire hero: formation pacing, decay, and twinkle. All frame numbers below are authored units; wall-clock = units ÷ (60 × SPEED).

| Behavior | Value |
|---|---|
| Cell decay | ×0.955 per frame unit (`0.955^dtF`) |
| Pointer glow | radius 130px, intensity 1 − d/130 |
| Ambient twinkle | probability 0.06 × dtF per frame, cell set to 0.55 |
| Lit cell alpha | value × 0.9, floor 0.02 |

**Logo formation cycle** (recurring):

| Phase | Frame units | Wall-clock @ SPEED 2 | What happens |
|---|---|---|---|
| Sparkle rise | 0 → 45 (`T_FORM`) | ~0.38s | Random cells light at a rising rate (0.2% → 1.2% of cells/frame) |
| Blocks snap on | 45 → 99 (`T_STEP` = 9/block) | ~0.45s | The six Acid blocks of the 3×3 mark land one by one, each with a brief 35%-alpha landing flicker; then the three Cell-grey blocks fill at 75% alpha |
| Hold | 99 → 250 (`T_HOLD_END`) | ~1.3s | Mark stays solid |
| Dissolve | 250 → 285 (`T_GONE`) | ~0.29s | Mark fades and hands its cells to the decay field |
| Quiet | 285 → 640 (`T_CYCLE`) | ~3s | Only ambient twinkle + pointer |

At cycle end the mark re-forms at the next of six preset spots (fractions of the canvas): (0.62, 0.34), (0.20, 0.28), (0.82, 0.55), (0.42, 0.22), (0.70, 0.30), (0.28, 0.50). Blocks are 2×2 cells with a 1-cell gap.

## C. Contact ambient field (canvas `#px-contact`)

Same engine, tuned quieter, **speed 1× (no SPEED multiplier)**:

| Behavior | Value |
|---|---|
| Cell size / gap | 30px / 4px |
| Decay | ×0.95 per frame unit |
| Pointer glow | radius 150px |
| Ambient twinkle | probability 0.05 × dtF, cell set to 0.5 |
| Max alpha | 0.35 (never competes with the form) |
| No logo formation | ambient + pointer only |

## D. Decode-scramble section titles

Applied to `<h2 data-decode>` ("What we do", "Product suite", "How we work").

- Triggers once per title via IntersectionObserver at 50% visibility.
- 12 steps × 50ms (600ms total); characters resolve left → right, unresolved ones cycle through the scramble set `▪▓_/#01<>` (spaces stay spaces).

## E. Scroll rail

Fixed column of twelve 7px cells, right edge (16px), vertically centered. Lit count = `max(1, round(scrollProgress × 12))` — Acid at full opacity when lit, Cell grey at 60% otherwise. Pointer-events none; hidden below 720px viewport width.

## F. Reduced motion

- Global CSS kill switch: `@media (prefers-reduced-motion: reduce) { * { animation-duration: .001s !important; animation-iteration-count: 1 !important } }` — stops marquee, blink, dots, scan, wink, flicker.
- Canvas JS additionally skips the logo-formation intro and ambient twinkle for reduced-motion users; pointer response stays (user-initiated).
- Decode titles render instantly without scrambling.

## G. Rules for new animations

1. Stepped, not eased — `steps(n)` in CSS; discrete cell states on canvas. Nothing glides.
2. Author canvas timing in 60fps frame units and multiply by `dtF` — never count raw rAF callbacks (refresh-rate dependent).
3. One `SPEED`-style constant per canvas if pacing needs tuning; scale everything through it so the feel stays proportional.
4. Decoration stays behind content at low intensity (hero max alpha 0.9 is the ceiling; secondary fields ≤ 0.35).
5. Stagger identical elements with fixed delays (like the wink/scan/dot patterns) instead of randomizing in JS.
6. Every animation must respect `prefers-reduced-motion` — CSS via the global rule, canvas via the `reduced` flag.
