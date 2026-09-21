# Divided list

A stack of rows separated by hairline dividers, with consistent vertical
rhythm and no dangling border at the top or bottom of the stack — for a
Q&A list, a findings list, a table of contents, or anything similar.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/divided-list/divided-list.css">
```

## Markup

Plain rows (a heading and a body):

```html
<ul class="dj-divided-list">
  <li class="dj-divided-item">
    <h3>How fine should I grind?</h3>
    <p>Fine enough that a 30g pour takes 25–30 seconds.</p>
  </li>
  <li class="dj-divided-item">
    <h3>How long do beans stay fresh?</h3>
    <p>Two to three weeks past the roast date, sealed.</p>
  </li>
</ul>
```

Rows with a leading marker (a number, an icon — anything short), add
`dj-divided-list-marked` to the list:

```html
<ol class="dj-divided-list dj-divided-list-marked">
  <li class="dj-divided-item">
    <span class="dj-divided-item-marker">01</span>
    <div class="dj-divided-item-body">
      <h3>Grind size runs coarse</h3>
      <p>Under-extracted, sour shots. Dial the grinder two steps finer.</p>
    </div>
  </li>
</ol>
```
