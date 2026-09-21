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

### Layout & navigation

| Component | What it's for |
|---|---|
| [`hero/`](hero/) | A page-top masthead — kicker, display heading, lede, actions row, optional watermark mark. |
| [`section-nav/`](section-nav/) | A sticky jump-link bar with scroll-spy — for any page long enough to need one. |

### Content & data

| Component | What it's for |
|---|---|
| [`data-table/`](data-table/) | A scrollable table with a mono-uppercase header row and hairline dividers. |
| [`list-row/`](list-row/) | A scrollable list of collapsible rows — disclosure caret, switch, remove, expanding body. |
| [`divided-list/`](divided-list/) | A stack of hairline-divided rows, plain or with a leading marker slot. |
| [`badge/`](badge/) | A small uppercase tag — a category, a stage, a status, colored by a custom property. |

### Controls & input

| Component | What it's for |
|---|---|
| [`buttons/`](buttons/) | Primary/ghost/neutral buttons for a page — hero, footer, in-app actions. |
| [`filter-bar/`](filter-bar/) | A toolbar row: bordered search field, optional icon, optional result count. |
| [`popup/`](popup/) | Header, buttons, switch, segmented control, pill, inputs, footer — a small panel UI. |

### Feedback & state

| Component | What it's for |
|---|---|
| [`callout/`](callout/) | Bordered note box, optionally colored by semantic meaning. |
| [`progress/`](progress/) | A thin fill-driven meter — "3 of 5 steps," a completion percentage. |
| [`steps/`](steps/) | Connected, auto-numbered vertical steps — "Get started," a method. |
| [`empty-state/`](empty-state/) | The muted italic line shown in place of an empty list, table, or grid. |
| [`skeleton/`](skeleton/) | Shimmering bone placeholders for content that hasn't loaded yet — text, avatar, thumbnail, card. |

Each new component lands here after it's proven itself in at least one real
site — extracted and blended, not designed in the abstract. (`skeleton/` is
the one exception so far — built ahead of need for an upcoming restyle; see
its own README.)
