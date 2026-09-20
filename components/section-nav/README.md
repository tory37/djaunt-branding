# Section nav

A sticky bar of anchor links for a single long page — docs, a changelog, a
showcase page, a settings screen with several groups. Stays pinned to the
top while the page scrolls and highlights whichever section is currently
in view.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/section-nav/section-nav.css">
<script src="path/to/components/section-nav/section-nav.js" defer></script>
```

The JS is optional — drop it and `.dj-section-nav` still works as a plain
jump-link bar, it just won't light up the active link as you scroll.

## Markup

```html
<nav class="dj-section-nav" aria-label="Section navigation">
  <a class="dj-section-nav-link" href="#the-mark" data-dj-nav-target="the-mark">The mark</a>
  <a class="dj-section-nav-link" href="#core-color" data-dj-nav-target="core-color">Core color</a>
  <a class="dj-section-nav-link" href="#typography" data-dj-nav-target="typography">Typography</a>
</nav>

<section id="the-mark">…</section>
<section id="core-color">…</section>
<section id="typography">…</section>
```

Every section the nav points at needs a matching `id`. `data-dj-nav-target`
is optional — the script falls back to the link's `href` fragment when it's
missing — but set it explicitly if a link's `href` ever needs to differ
from the id it should highlight (e.g. an external link living in the same
bar).

Put `.dj-section-nav` above your content in normal document flow; `position:
sticky` handles pinning it to the viewport top on scroll. If your page's own
`<header>` is also meant to stay visible, give the nav a `top` offset equal
to the header's height instead of `0`.
