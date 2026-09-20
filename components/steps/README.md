# Steps

A connected, auto-numbered vertical list — "Get started," a method, a
recipe. Blended from `djaunt-bean-guide` (the counter-driven line, adopted
as the base) and `djaunt-dot-agents` (its `pre` code-block styling, for a
"run this command" step).

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/steps/steps.css">

<div class="dj-steps">
  <div class="dj-step">
    <h3>Clone the repo</h3>
    <pre>git clone ...</pre>
  </div>
  <div class="dj-step">
    <h3>Season generously</h3>
    <p>Salt early — beans season better while they cook than after.</p>
    <ul>
      <li>1 tbsp kosher salt per pound of dried beans</li>
      <li>Add aromatics at the same time</li>
    </ul>
  </div>
</div>
```

The number is CSS-generated (`counter(dj-step)`) from `.dj-step`'s position
in `.dj-steps` — never hardcode an index in the markup.
