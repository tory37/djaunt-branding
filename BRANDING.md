# Djaunt — Brand Guidelines

**Read this file before generating any Djaunt interface, asset, page, or document.**

Djaunt is one person's catch-all brand: music, software, and art under a single
identity. There are no sub-brands and no per-discipline styling. A Djaunt album
page, a Djaunt CLI tool, and a Djaunt sketchbook site should read as the same
thing.

These are guidelines with latitude. Hold the core (logo, color roles, type,
dark-first, angular geometry) exactly. Compose freely inside it.

---

## 1. The mark

The dragon is the brand. Three assets, all in `brand/logo/`:

| Asset | File | Use |
|---|---|---|
| Lockup | `djaunt-lockup.svg` | Default. Anywhere there is room for both dragon and name. |
| Icon | `djaunt-icon.svg` | Standalone is allowed and encouraged: favicons, app icons, avatars, loading states, watermarks. |
| Wordmark | `djaunt-wordmark.svg` | Text-led contexts where the dragon appears elsewhere on screen, or at sizes too small for the dragon to read. |

Each ships in four fills: `currentColor` (no suffix — inherit from CSS),
`-gold`, `-bone`, `-ink`. Prefer the `currentColor` file and set the color
in CSS so themes apply automatically.

### Rules
- **Clear space:** minimum the height of the letter D in the wordmark on all sides. More is better.
- **Minimum size:** icon 16px; lockup 120px wide; wordmark 80px wide. Below the lockup minimum, use the icon alone.
- **Color:** gold on dark (default), bone on dark, ink on light or on gold. One flat color only.
- **Do not:** recolor into gradients, add drop shadows or outer glows to the mark itself, rotate it, stretch it, re-draw the dragon, place it on a busy photo without a solid plate behind it, or enclose it in a circle or rounded-square badge (except platform-required app icons, which use `brand/favicon/maskable.svg`).
- The dragon may be cropped and scaled up as a background graphic at low opacity (4–10%) — that is the one sanctioned liberty.

---

## 2. Color

Import `brand/tokens/tokens.css` and use the variables. Never hardcode a hex.

### Core
- **Gold** (`--dj-gold-500` `#D4A017`) — the brand. Accents, links, focus, active state, the mark. Gold is a highlight, not a surface: never large gold fills.
- **Bone** (`--dj-bone-200` `#EDE6D6`) — all body text and the second voice. The off-white is deliberate; pure #FFF is off-brand.
- **Ink** (`--dj-ink-800` `#0D0C0A`) — near-black grounds, warm-biased.

### Roles (use these, not the raw scales)
`--dj-bg`, `--dj-surface`, `--dj-surface-raised`, `--dj-border`,
`--dj-text`, `--dj-text-muted`, `--dj-accent`, `--dj-accent-hi`,
`--dj-accent-deep`, `--dj-on-accent`.

### Dark-first
Dark is the brand, not a mode. Build dark, then add light only if the host
context requires it (print, email, embedding in a light app). Light mode is a
single parchment variant: `class="dj-light"` or `data-dj-mode="light"`.

### Elemental themes
Eight elemental dragons, each a theme that swaps **accent + background family**
while keeping bone text, gold-derived geometry, and all type and spacing
identical. Apply with `data-dj-theme` on `<html>` or any container:

```html
<html data-dj-theme="frost">
```

| Theme | Accent | Character |
|---|---|---|
| `hoard` (default) | `#D4A017` | Gold. The base identity. Use unless there's a reason not to. |
| `fire` | `#FF6B2C` | Heat, urgency, destructive actions, live/recording states. |
| `frost` | `#7FD8F0` | Cold, precise, analytical. Good for data and dev tools. |
| `storm` | `#9B8CFF` | Electric, generative, in-motion. Good for music and audio. |
| `stone` | `#93A98C` | Weathered, quiet, documentary. Good for archives and reading. |
| `venom` | `#A8E01F` | Acidic, alert, hacker-adjacent. Use sparingly; it's loud. |
| `void` | `#B0A7C9` | Muted, near-monochrome, dimmest of the set. |
| `radiant` | `#FFE9A3` | Pale gold, near-white. The lightest dark theme. |
| `deep` | `#2FB3C9` | Submerged teal, calm and dense. |

**One theme per surface.** Never mix two elemental accents in one view. An
element is a mood for a whole product, not a palette to pick from per-component.
Semantic colors (`--dj-success`, `--dj-warning`, `--dj-danger`, `--dj-info`)
are fixed across all themes — they mean something and must not shift with mood.

### Contrast
Body text at 4.5:1 minimum against its actual background; headline-scale type
3:1. Every accent in the table clears 4.5:1 on its own theme background. Do not
set text in `--dj-accent-deep` — those are fills and borders only.

### Categorical / multi-accent surfaces
"One theme per surface" governs mood — which single accent a view is dressed
in. It says nothing about a different kind of color some products genuinely
need: several *simultaneous*, *meaningful* colors on one screen that aren't
about mood at all — a calendar's event categories, a status board's lanes, a
gauge's deficient/caution/surplus zones. That's categorical color, not brand
identity, and it doesn't get new elemental variants or reserved token names
in `tokens.css` — every project's categories are its own domain, and inventing
generic slots (`--dj-categorical-1`, etc.) for them would just become de facto
brand tokens that recouple every consumer to values that were supposed to be
project-specific.

When a project needs this:
- Define your own custom properties for it, named for what they mean
  (`--myapp-lane-prep`, not `--dj-*`) — this lives in the project, not here.
- Check the four semantic colors first (`--dj-success`, `--dj-warning`,
  `--dj-danger`, `--dj-info`) — already theme-independent and free to reuse if
  your categories are actually a status or severity, even if you'd never
  phrase it that way in your own domain language (a 3-state gauge is a
  danger/warning/info triad whether or not the product calls it that).
- Keep whatever you do define visually distinct from `--dj-accent`/
  `--dj-accent-hi`, so a category color is never mistaken for the theme's own
  mood accent.
- Still hold the system's discipline: the same contrast bar, the same
  shallow/angular geometry, no gradients — and keep the category count small
  enough to still read as a system instead of noise.
- Prefer hues that sit near the existing ink/bone/gold family (warm-neutral
  rotations) over saturated primaries, so categorical color still reads as
  "the same brand, doing something else" rather than an unrelated palette
  bolted on.

---

## 3. Typography

| Role | Family | Treatment |
|---|---|---|
| Display / headings | **Archivo** (600–700) | Tight tracking (`-0.02em`). Sentence case for headings; UPPERCASE reserved for short labels. |
| Body / UI | **IBM Plex Sans** (400–500) | 1.6 line height. Max ~72ch measure. |
| Code / labels / data | **IBM Plex Mono** (400–500) | Eyebrows and metadata: uppercase, `0.14em` tracking, `--dj-text-xs`. |

All three are open-licensed and self-hostable. Serve locally where possible;
Google Fonts CDN is acceptable.

The mono eyebrow above a display heading is the signature Djaunt text pattern.
Use it; don't overuse it — one per section.

Never set body copy in the display face, never set long text in mono, and never
add a fourth family.

---

## 4. Geometry, layout, motion

- **Angular, not soft.** Radii stay shallow: 2/4/8px. Pills are for status dots and avatars only. Never a rounded-rectangle-with-left-accent-border card.
- **4px space scale.** Use the `--dj-space-*` tokens.
- **Hairline borders** (`1px`, `--dj-border`) do the separating work, not shadows. Shadows only for things that actually float — menus, modals, toasts.
- **Generous negative space.** Dark grounds need room to read as intentional rather than crowded.
- **Glow, used once.** `--dj-glow` on a single focal element per view — the primary action, the playing track, the active node. More than one and it turns to noise.
- **Motion:** 120/200/400ms, `--dj-ease`. Motion clarifies state; it does not perform. Respect `prefers-reduced-motion`.

---

## 5. Iconography

- **Stroke, not fill.** 1.5px stroke on a 24px grid, round caps, round joins, `currentColor`, no fills.
- Geometric and plain. The dragon carries all the ornament the brand needs; icons stay neutral so it stands out.
- Use an existing open icon set (Lucide is the reference — same grid and stroke) rather than drawing new icons. If a custom icon is needed, match Lucide's construction exactly.
- **No emoji** in product UI, docs, or marketing. Ever.
- One icon set per project. Never mix sets.

---

## 6. Imagery & illustration

- **Photography:** high-contrast, warm-shadowed, dark-dominant. Never bright airy stock. Duotone toward ink + gold is the sanctioned treatment.
- **Illustration:** hand-drawn line work belongs to the brand — ink linework on dark, gold used only as a spot accent. Because the brand covers art, original drawing is preferred over any generated or stock imagery.
- **Textures:** paper grain, scale patterns, and hammered-metal texture at low opacity are on-brand. Aggressive multi-color gradients and glassmorphism are off-brand.
- **Placeholders:** where real imagery isn't available yet, use a flat `--dj-surface` block with a 1px `--dj-border` and a mono caption naming what belongs there. Do not fill space with decorative generated art.
- **Album and cover art** may break color rules for a single release — the release is the artwork, not the brand. Everything around it stays on system.

---

## 7. Terminal & code

`tokens.css` carries a 16-color ANSI scheme (`--dj-ansi-*`) and a syntax theme
(`--dj-code-*`) named **Djaunt Hoard**. CLI output, embedded terminals, and code
blocks all use them, so a Djaunt tool looks like Djaunt in a shell too.

CLI voice: lowercase command names, no ASCII-art banners, gold for the active
line or prompt, bone for output, mono everywhere.

---

## 8. Voice

Direct, plain, dry. Say what the thing does. No hype, no exclamation points, no
second-person cheerleading, no metaphor-stacking about dragons — the dragon is
in the logo, it doesn't need to be in the copy. Lowercase is fine in UI labels
and CLI; sentence case for anything a human reads as prose.

---

## 9. For agents

When building a Djaunt app, tool, extension, or page:

1. Import `brand/tokens/tokens.css`; consume role variables only.
2. Load Archivo, IBM Plex Sans, IBM Plex Mono. No other families.
3. Default to dark, `data-dj-theme="hoard"` unless the project brief names an element.
4. Copy the logo files you need out of `brand/logo/` into the project. Prefer the `currentColor` variants.
5. Favicons: `brand/favicon/favicon.svg`, plus `maskable.svg` for PWA/app icons.
6. Shallow radii, hairline borders, one glow, no emoji, stroke icons on a 24px grid.
7. Need several simultaneous meaningful colors on one surface — categories,
   lanes, a gauge — not just the theme's one mood accent? That's §2's
   "Categorical / multi-accent surfaces": define your own project-scoped
   tokens for it, don't invent a new elemental variant or ask for reserved
   names here.
8. If a decision isn't covered here, choose the more restrained option.

`brand-guidelines.dc.html` in this repo renders the whole system visually,
including every theme — open it when a value needs to be seen rather than read.
