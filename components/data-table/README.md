# Data table

A plain table dressed in Djaunt's tone: mono uppercase header row, hairline
row dividers, hover highlight, and a horizontal-scroll wrapper for narrow
viewports.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/data-table/data-table.css">
```

## Markup

```html
<div class="dj-table-scroll">
  <table class="dj-table">
    <thead>
      <tr><th>Bean</th><th>Roast</th><th class="wrap">Note</th></tr>
    </thead>
    <tbody>
      <tr><td>Yirgacheffe</td><td>Light</td><td class="wrap">Floral, bright acidity.</td></tr>
      <tr><td>Sumatra Mandheling</td><td>Dark</td><td class="wrap">Earthy, low acid.</td></tr>
    </tbody>
  </table>
</div>
```

Every `<td>`/`<th>` is `white-space: nowrap` by default — the table is meant
to stay compact and scroll horizontally rather than wrap awkwardly. Add
`class="wrap"` to a column (like a free-text note) that should wrap
normally instead.
