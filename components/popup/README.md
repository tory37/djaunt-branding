# Popup primitives

Header, buttons, switch, segmented control, pill, inputs, footer — the set a
small panel UI (an extension popup, a settings sheet) is built from. Ported
from `djaunt-browser-tools`, where it shipped seven extensions before moving
here.

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/popup/base.css">
<html data-dj-theme="hoard">
```

No network budget for a font CDN (extension popups, offline tools)? Self-host
instead of linking Google Fonts:

```html
<link rel="stylesheet" href="path/to/brand/fonts.css">
```

## Markup

```html
<header class="dj-head" data-state="idle">
  <span class="dj-mark" aria-hidden="true"></span>
  <span class="dj-titles">
    <span class="dj-wordmark" role="img" aria-label="Djaunt"></span>
    <h1 class="dj-title">Panel title</h1>
  </span>
  <span class="dj-pill" data-state="idle">off</span>
</header>

<button type="button" class="dj-switch" role="switch" aria-checked="false" aria-label="…">
  <span class="dj-knob"></span>
</button>

<div class="dj-seg-group" role="radiogroup" aria-label="…">
  <button type="button" class="dj-seg" role="radio" aria-checked="true">A</button>
  <button type="button" class="dj-seg" role="radio" aria-checked="false">B</button>
</div>

<button type="button" class="dj-btn">Action</button>

<p class="dj-hint">Helper copy, <code>inline code</code> included.</p>
<footer class="dj-foot" role="status">Status line</footer>
```

`data-state="active"` on `.dj-head` lights the mark — the one sanctioned glow.
`data-state="error"` on `.dj-head`/`.dj-pill`/`.dj-foot.error` switches to
`--dj-danger`. `.dj-switch`/`.dj-seg` read `aria-checked`, not a checkbox —
toggle it from JS.
