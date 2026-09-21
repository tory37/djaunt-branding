# Tab bar

A mobile bottom navigation bar — the small, fixed set of top-level sections
an app always shows, typically replacing a hamburger drawer on narrow
viewports. Distinct from `components/section-nav` (a sticky jump-link bar
for one long page's own sections, not top-level app navigation).

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/tab-bar/tab-bar.css">
```

## Markup

```html
<nav class="dj-tab-bar" aria-label="Sections">
  <a class="dj-tab-bar-item dj-tab-bar-item-active" href="/pantry">
    <span class="dj-tab-bar-icon"><svg aria-hidden="true">…</svg></span>
    <span class="dj-tab-bar-label">Pantry</span>
  </a>
  <a class="dj-tab-bar-item dj-tab-bar-item-accent-2" href="/cookbook">
    <span class="dj-tab-bar-icon"><svg aria-hidden="true">…</svg></span>
    <span class="dj-tab-bar-label">Cookbook</span>
  </a>
</nav>
```

Mark the current section's `<a>` with `.dj-tab-bar-item-active`. A bar with
more sections than a single accent can visually tell apart can opt individual
items into `--dj-accent-2/3/4` via `.dj-tab-bar-item-accent-2/3/4` — the
categorical-accent tokens, not a second brand mood (see `BRANDING.md` §2).

This component doesn't hide itself above a breakpoint — that width is
app-specific, so add it in the consuming page, e.g.:

```css
@media (min-width: 721px) {
  .dj-tab-bar { display: none; }
}
```
