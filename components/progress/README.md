# Progress bar

A thin fill-driven meter — "3 of 5 steps," a completion percentage. Blended
from djaunt-bean-guide's pot progress bar and cartoonist-drawing-curriculum's
overall-progress bar, both of which had built the same track/fill/label shape
independently.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/progress/progress.css">
```

## Markup

```html
<div class="dj-bar-label">3 of 5 steps complete</div>
<div class="dj-bar-track">
  <div class="dj-bar-fill" style="width: 60%"></div>
</div>
```

Set `width` from JS as the value changes — the fill transitions on its own.
Swap `.dj-bar-fill` for `.dj-bar-fill-success`/`-warning`/`-danger` when the
color itself carries meaning (a passed check, a budget running low); the
plain accent fill is the default for ordinary progress.
