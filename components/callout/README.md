# Callout

A bordered note box, optionally colored by semantic meaning. Blended from
`djaunt-bean-guide` (a full box with an `<h3>` headline, for one big safety
warning) and `cartoonist-drawing-curriculum` (a compact box with a small
bold tag, for inline do/skip notes) — this component supports both shapes.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/callout/callout.css">

<!-- Headline form -->
<div class="dj-callout dj-callout-danger">
  <h3>Boil kidney beans hard for 10 minutes before you simmer them</h3>
  <p>Raw and undercooked kidney beans contain a natural toxin...</p>
  <ul><li>...</li></ul>
</div>

<!-- Compact tag form -->
<div class="dj-callout dj-callout-success">
  <span class="dj-callout-tag">Why it matters</span>
  Inline text right after the tag.
</div>

<!-- Neutral, no semantic color -->
<div class="dj-callout">
  <span class="dj-callout-tag">Note</span>
  Plain text.
</div>
```

Modifiers: `.dj-callout-success`, `.dj-callout-warning`, `.dj-callout-danger`,
`.dj-callout-info` — colors the left border, the `<h3>`, and `.dj-callout-tag`
to match. Omit for a neutral box.
