# Skeleton

Shimmering "bone" placeholders shown while real content (an API response, a
computed result) is still loading — the classic scaffolded-content feel,
sized and shaped like what's about to replace it, instead of a spinner
covering the layout.

Unlike the rest of `components/`, this one wasn't blended from an existing
duplicate in two sites — it's built ahead of need, so a real screen (mealeo's
restyle, first) has something to reach for instead of hand-rolling its own.
The same rule applies going forward: once two sites have each built their
own skeleton variant, fold what's different back in here.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/skeleton/skeleton.css">
```

## Pieces

```html
<!-- A heading + a couple lines of body text -->
<div class="dj-skeleton dj-skeleton-title"></div>
<div class="dj-skeleton dj-skeleton-text"></div>
<div class="dj-skeleton dj-skeleton-text"></div>

<!-- An avatar next to a name -->
<div class="dj-skeleton-row">
  <div class="dj-skeleton dj-skeleton-avatar"></div>
  <div class="dj-skeleton dj-skeleton-text" style="width:8em"></div>
</div>

<!-- An image/thumbnail slot -->
<div class="dj-skeleton dj-skeleton-thumb"></div>

<!-- A tag or a button, mid-load -->
<span class="dj-skeleton dj-skeleton-badge"></span>
<span class="dj-skeleton dj-skeleton-button"></span>

<!-- A whole card, composed from the pieces above -->
<div class="dj-skeleton-card">
  <div class="dj-skeleton dj-skeleton-thumb"></div>
  <div class="dj-skeleton dj-skeleton-title"></div>
  <div class="dj-skeleton dj-skeleton-text"></div>
  <div class="dj-skeleton dj-skeleton-text"></div>
</div>
```

Every piece is a `.dj-skeleton` base (the shimmer animation and gradient)
plus a shape modifier (`-title`, `-text`, `-avatar`, `-thumb`, `-badge`,
`-button`). Stack as many as the real content has fields — a `.dj-skeleton-row`
of `.dj-skeleton-text` lines can stand in for a table row, several
`.dj-skeleton-card`s in a grid for a card grid, and so on.

Sizes are set by class; a one-off width (a shorter line, a wider thumb) is a
local `style="width:..."` override, same as `data-table`'s `.wrap` and other
components' residual overrides. `prefers-reduced-motion: reduce` swaps the
shimmer for a static fill automatically — nothing to opt into.

Swap a skeleton out once its data arrives — remove the node, or toggle it
with the `hidden` attribute alongside the real content's own `hidden` toggle
(the same on/off contract as `components/empty-state`).
