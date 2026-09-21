# Checkbox

Two variants: a native checkbox for a dense list or form row, and a larger
custom "tile" checkbox for touch-heavy contexts (a cook-mode step list) where
a 16px native box is too small to hit reliably.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/checkbox/checkbox.css">
```

## Markup

```html
<!-- Native: dense list/form rows -->
<input type="checkbox" class="dj-checkbox" aria-label="Have milk">

<!-- Tile: a larger touch target, icon shown only once checked -->
<button type="button" role="checkbox" aria-checked="false" class="dj-checkbox-tile" aria-label="Step complete">
  <svg class="dj-checkbox-tile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 12l5 5L20 6"/>
  </svg>
</button>
```

`.dj-checkbox-tile` reads `aria-checked`, not a real checkbox input — toggle
it (and the icon's presence) from JS, same contract as `components/popup`'s
`.dj-switch`. Don't wrap either variant's row in a shared `onClick`/`<label>`
that also targets other row content — it turns the whole row into a toggle
target, which breaks touch-scroll on a mobile list.
