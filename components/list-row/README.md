# List row

A scrollable list of collapsible rows — the pattern behind host-swap's swap
list, query-params' tweak list, and net-mock's rule list, all three of which
had built the same caret/summary/switch/remove/expanding-body row
independently before this moved here. Pairs with `components/popup` for
`.dj-switch` and tokens/fonts.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/popup/base.css">
<link rel="stylesheet" href="path/to/components/list-row/list-row.css">
```

## Markup

```html
<div class="dj-list">
  <div class="dj-row" data-open="false" data-state="active">
    <div class="dj-row-head">
      <button type="button" class="dj-row-disclose" aria-expanded="false">
        <svg class="dj-row-caret" width="10" height="10" aria-hidden="true">…</svg>
        <span class="dj-row-summary">
          <span class="dj-row-line dj-row-line-from">example.com</span>
          <span class="dj-row-line dj-row-line-to">staging.example.com</span>
        </span>
      </button>
      <button type="button" class="dj-switch" role="switch" aria-checked="true" aria-label="Enable">
        <span class="dj-knob"></span>
      </button>
      <button type="button" class="dj-row-remove" aria-label="Remove">✕</button>
    </div>
    <div class="dj-row-body">
      <div class="dj-row-field">
        <label class="dj-label" for="host">Host</label>
        <input id="host" type="text" value="example.com">
      </div>
      <div class="dj-row-preview">
        <code>example.com → staging.example.com</code>
      </div>
      <p class="dj-row-error">Optional inline error copy.</p>
    </div>
  </div>
  <p class="dj-list-empty">No rows yet.</p>
</div>
```

Toggle `data-open` on `.dj-row` from JS to expand/collapse (`.dj-row-body`
and the caret rotation both key off it). `data-state="active"` colors the
first summary line and the arrowed second line; `data-state="error"` turns
the second line danger-red. `.dj-row-line-to` is the second summary line —
its `::before` draws the arrow, so give the *first* line `.dj-row-line-from`
and the *second* `.dj-row-line-to` when a row shows a from→to change; for a
row with only one meaningful line, drop `.dj-row-line-to` and its arrow.
