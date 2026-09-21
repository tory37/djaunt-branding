# Hero

A page-top masthead: an uppercase mono kicker, a display heading, a muted
lede paragraph, and a wrapping row of actions — with an optional faint
watermark mark sitting behind it all.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/hero/hero.css">
<link rel="stylesheet" href="path/to/components/buttons/buttons.css">
```

## Markup

```html
<header class="dj-hero">
  <img class="dj-hero-mark" src="mark.svg" alt="" aria-hidden="true">
  <p class="dj-hero-kicker">Djaunt / Bean Guide</p>
  <h1 class="dj-hero-title">Brew the good stuff.</h1>
  <p class="dj-hero-lede">A field guide to home espresso — beans, ratios, and the method that actually works.</p>
  <div class="dj-hero-actions">
    <a class="dj-btn dj-btn-primary" href="#start">Get started</a>
    <a class="dj-btn dj-btn-ghost" href="#method">Read the method</a>
  </div>
</header>
```

`.dj-hero-mark` is optional and purely decorative — mark it
`aria-hidden="true"` (and give it an empty `alt`, as above) since it carries
no information. Everything else in `.dj-hero` sits in normal flow above it
via `position: relative`, so the watermark never intercepts clicks or
crowds the text.
