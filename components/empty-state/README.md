# Empty state

A single muted, italic line shown in place of a list, table, or grid when
it currently has no items to show — a filtered search with no matches, a
list before the user has added anything.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/empty-state/empty-state.css">
```

## Markup

```html
<ul class="dj-divided-list" id="results">
  <!-- rows go here -->
</ul>
<p class="dj-empty-state" id="results-empty" hidden>No beans match that search.</p>
```

Toggle it with the standard `hidden` attribute from your own filter/list
JS (`el.hidden = results.length === 0`) rather than a bespoke show/hide
class — `.dj-empty-state[hidden]` is already wired to disappear cleanly.
