# Status line

A small live-region message for a background action in progress — an
autosave, a sync. Too lightweight for a full `components/callout`; this is
just text plus color.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/status-line/status-line.css">
```

## Markup

```html
<span class="dj-status-line" role="status" aria-live="polite">Saving…</span>
<span class="dj-status-line" role="status" aria-live="polite">Saved</span>
<span class="dj-status-line dj-status-line-danger" role="status" aria-live="polite">Couldn't save — will retry</span>
```

For an idle state, don't render an empty string into the live region — remove
the element (or use `hidden`) so nothing gets announced.
