# Filter bar

A toolbar row above a list or table: a bordered search field (with an
optional leading icon) and an optional result-count line.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/filter-bar/filter-bar.css">
```

## Markup

```html
<div class="dj-filter-bar">
  <label class="dj-filter-field">
    <svg class="dj-filter-icon" viewBox="0 0 16 16" aria-hidden="true"><!-- search glyph --></svg>
    <input class="dj-filter-input" type="text" placeholder="Filter beans…" id="filter">
  </label>
  <span class="dj-filter-count" id="filter-count">12 beans</span>
</div>
```

Drop `.dj-filter-icon` entirely if you don't need one — `.dj-filter-field`
lays out fine with just the input. Wiring the input to an actual filter (an
`input` listener that shows/hides rows, updates the count, and toggles a
paired `components/empty-state` message when nothing matches) is a few
lines specific to whatever you're filtering, so it stays in the consuming
page rather than shipping here.
