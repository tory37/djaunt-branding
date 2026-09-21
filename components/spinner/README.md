# Spinner

An indeterminate loading ring — a button mid-submit, an inline "working"
state. `components/progress` covers a *determinate* meter ("3 of 5 steps");
this is for when there's no known length yet.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/spinner/spinner.css">
```

## Markup

```html
<svg class="dj-spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle class="dj-spinner-track" cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3"/>
  <path class="dj-spinner-arc" d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
</svg>
```

Sizes with `.dj-spinner-sm` (12px) / default (16px) / `.dj-spinner-lg` (24px).
Color comes from `currentColor` — nest it inside a `.dj-button` or any
colored text and it matches automatically. Inside a button mid-submit, pair
it with a `disabled` state on the button itself.
