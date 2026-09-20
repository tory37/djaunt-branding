# Buttons

Sentence-case, inline button for a hero or footer call-to-action — the pair
djaunt-branding's own showcase page draws by hand as "Primary action" /
"Secondary", now as reusable classes. Ported from `djaunt-dot-agents`, which
built the identical pair independently.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/buttons/buttons.css">

<a class="dj-button dj-button-primary" href="...">Primary action</a>
<a class="dj-button dj-button-ghost" href="...">Secondary</a>
<button type="button" class="dj-button dj-button-primary" disabled>Disabled</button>
```

Works on `<a>` or `<button>`. Not the same component as
[`popup/`](../popup/)'s `.dj-btn` — that one is a compact, full-width, mono
uppercase button built for a small panel; this one is for a page.
