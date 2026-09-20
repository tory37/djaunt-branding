# Components

Framework-agnostic UI built on `tokens.css` — CSS (and markup contract, and
a little vanilla JS where a component needs it), not React. Pulled into a
consuming repo via jsDelivr, e.g.:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tory37/djaunt-branding@main/components/popup/base.css">
```

A browser extension or other network-constrained context vendors (copies)
the files at build time instead of linking a CDN at runtime — see each
component's README.

`@main` tracks the latest commit; there's no tag-pinned version yet (tag
pushes are blocked for the account pushing this from an agent session — see
git log). Push a `v1.0.0` tag by hand and switch these links to it once
you want consumers to be able to freeze on a version.

| Component | What it's for |
|---|---|
| [`popup/`](popup/) | Header, buttons, switch, segmented control, pill, inputs, footer — a small panel UI. |
| [`buttons/`](buttons/) | Primary/ghost/neutral buttons for a page — hero, footer, in-app actions. |
| [`steps/`](steps/) | Connected, auto-numbered vertical steps — "Get started," a method. |
| [`callout/`](callout/) | Bordered note box, optionally colored by semantic meaning. |
| [`list-row/`](list-row/) | A scrollable list of collapsible rows — disclosure caret, switch, remove, expanding body. |
| [`progress/`](progress/) | A thin fill-driven meter — "3 of 5 steps," a completion percentage. |
| [`badge/`](badge/) | A small uppercase tag — a category, a stage, a status, colored by a custom property. |

Each new component lands here after it's proven itself in at least one real
site — extracted and blended, not designed in the abstract.
