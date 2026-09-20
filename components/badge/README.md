# Badge

A small uppercase tag — a category, a stage, a status. Blended from
djaunt-dot-agents' severity/category badges, cartoonist-drawing-curriculum's
tag chips and stage badges, and djaunt-bean-guide's flags and method badges.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/badge/badge.css">
```

## Markup

```html
<span class="dj-badge">draft</span>
<span class="dj-badge dj-badge-accent">current</span>
<span class="dj-badge dj-badge-success">complete</span>
<span class="dj-badge dj-badge-warning">low coverage</span>
<span class="dj-badge dj-badge-danger">critical</span>
<span class="dj-badge dj-badge-pill dj-badge-accent">in progress</span>
```

Color comes from `--dj-badge-color`, which the four semantic modifiers set to
a token. A project with its own fixed category palette (bug/feature/research,
that kind of thing) doesn't need a modifier for each one — set
`--dj-badge-color` directly, inline or in a small local class, and the base
shape, spacing and type still come from `.dj-badge`. Add `.dj-badge-pill` for
a fully rounded status pill instead of the default rounded-corner tag.
