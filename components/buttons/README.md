# Buttons

Sentence-case buttons for a page — hero/footer CTAs and plain in-app
actions. Ported from two independent sources that turned out to agree:
`djaunt-dot-agents`' `.btn-primary`/`.btn-ghost` (which already matches
"Primary action"/"Secondary" on this repo's own showcase page) and
`djaunt-bean-guide`'s `.btn`/`.btn-small`/`.btn-text-danger` (its actual
in-app pot-cooking controls).

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/buttons/buttons.css">

<a class="dj-button dj-button-primary" href="...">Primary action</a>
<a class="dj-button dj-button-ghost" href="...">Secondary</a>
<button type="button" class="dj-button">Neutral action</button>
<button type="button" class="dj-button dj-button-primary dj-button-small">Small</button>
<button type="button" class="dj-button-text-danger">Remove</button>
```

- `.dj-button` alone: neutral, bordered, surfaced — a plain in-app action.
- `.dj-button-primary`: filled accent, for the one CTA on a view.
- `.dj-button-ghost`: transparent until hover — a secondary action next to a primary.
- `.dj-button-small`: shrinks any of the above for a dense row of controls.
- `.dj-button-text-danger`: a separate, text-only destructive action — not a `.dj-button` modifier.

Works on `<a>` or `<button>`. Not the same component as
[`popup/`](../popup/)'s `.dj-btn` — that one is a compact, full-width, mono
uppercase button built for a small panel; this one is for a page.
