# Components

Framework-agnostic UI built on `tokens.css` — CSS (and markup contract, and
a little vanilla JS where a component needs it), not React. Pulled into a
consuming repo pinned to a git tag, e.g.:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tory37/djaunt-branding@v1.0.0/components/popup/base.css">
```

A browser extension or other network-constrained context vendors (copies)
the files at build time instead of linking a CDN at runtime — see each
component's README.

| Component | What it's for |
|---|---|
| [`popup/`](popup/) | Header, buttons, switch, segmented control, pill, inputs, footer — a small panel UI. |

Each new component lands here after it's proven itself in at least one real
site — extracted and blended, not designed in the abstract.
