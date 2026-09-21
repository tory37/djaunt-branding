# Typeahead

A chip multi/single-select combobox with keyboard navigation and an optional
"create new" option: tags, categories, an ingredient picker. Ported from
mealeo's `Typeahead` (its Cookbook/Pantry tag & category fields).

Unlike the rest of `components/`, this one isn't CSS-only — the
filtering/keyboard/chip logic *is* the value being shared, so it ships a
small vanilla `DjTypeahead` controller alongside the stylesheet.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/typeahead/typeahead.css">
<script src="path/to/components/typeahead/typeahead.js"></script>
```

## Markup

```html
<div class="dj-typeahead" id="tag-picker">
  <div class="dj-typeahead-chips" hidden></div>
  <div class="dj-typeahead-field">
    <input type="text" class="dj-typeahead-input" placeholder="Add a tag…" autocomplete="off">
    <ul class="dj-typeahead-listbox" role="listbox" hidden></ul>
  </div>
</div>
```

## Wiring

```js
const typeahead = new DjTypeahead(document.getElementById('tag-picker'), {
  options: [{ id: '1', name: 'weeknight' }, { id: '2', name: 'slow-cooker' }],
  mode: 'multi',                 // or 'single'
  selected: [],                  // object[] for multi, object|null for single
  variant: 'tag',                // or 'category' -- a solid, elevated chip instead of a tinted pill
  placeholder: 'Add a tag…',
  frequentCount: 8,               // how many options to surface before typing
  onChange(selected) { /* persist it */ },
  async onCreate(name) {          // omit to disable "Create <query>"
    const created = await api.createTag(name);
    return created;               // { id, name }
  },
});

// Later, if options/selection/disabled state change from outside:
typeahead.setOptions(nextOptions);
typeahead.setSelected(nextSelected);
typeahead.setDisabled(true);
```

Pass options pre-sorted most-used-first if you have that ranking — `options`
is sliced to `frequentCount` for the pre-typing dropdown, so the common case
never requires typing at all. An option's optional `kind` (e.g. when merging
two option sources into one list, like an ingredient-or-recipe picker) is
rendered as a small badge and otherwise ignored by the component's own
selection logic. Keyboard: arrow keys move the highlight, Enter commits the
highlighted option and — only when it actually committed — advances focus to
the next focusable field in the enclosing `<form>`; Tab commits without
`preventDefault`, so the browser's own focus advance runs in the same
keystroke.
