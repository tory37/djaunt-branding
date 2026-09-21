# Bottom sheet

A mobile-style slide-up panel: filter & sort, an add/edit form, a kebab
action list. Distinct from `components/popup` (a small *fixed* panel UI, not
a slide-from-bottom sheet) and `components/dropdown-menu` (a desktop-shaped
anchored dropdown). Blended from mealeo's Pantry redesign, which used one
generic sheet for all three cases above — height and a drag handle were the
only per-use variance.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/bottom-sheet/bottom-sheet.css">
```

## Markup

```html
<div class="dj-sheet-overlay">
  <div class="dj-sheet-scrim"></div>
  <div class="dj-sheet" data-height="80vh" role="dialog" aria-modal="true" aria-label="Filter &amp; sort">
    <div class="dj-sheet-handle"></div>
    <div class="dj-sheet-body">
      <!-- form fields, a scrollable list, whatever the sheet holds -->
    </div>
  </div>
</div>
```

`data-height` on `.dj-sheet` is `"auto"` (content height, capped at 80vh —
the default), `"80vh"` (fixed), or `"full"` (100dvh). Drop `.dj-sheet-handle`
if the sheet isn't meant to read as draggable.

## Recipe: action sheet

A kebab-triggered sheet whose body is a flat list of tap actions (Edit,
Delete) is common enough to call out on its own — it's just `.dj-sheet` at
`data-height="auto"` with a `.dj-sheet-actions` body:

```html
<div class="dj-sheet-overlay">
  <div class="dj-sheet-scrim"></div>
  <div class="dj-sheet" data-height="auto" role="dialog" aria-modal="true">
    <div class="dj-sheet-handle"></div>
    <div class="dj-sheet-actions">
      <button type="button" class="dj-sheet-action">Edit</button>
      <button type="button" class="dj-sheet-action dj-sheet-action-danger">Delete</button>
    </div>
  </div>
</div>
```

Each action should close the sheet itself before running its own handler.

## Behavior

Opening/closing, Escape-to-close, and click-scrim-to-close are the consuming
page's own JS (mount/unmount the overlay, or toggle it with `hidden`) — same
contract as `components/popup`'s switches and `components/dropdown-menu`:
this component supplies the look and structure, not the interaction wiring.
