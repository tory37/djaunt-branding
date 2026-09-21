# Dropdown menu

A small panel anchored to a trigger button — an avatar, a kebab, a "more"
link. Profile/settings/sign-out, a row's quick actions. Distinct from
`components/popup` (a whole small panel UI, not an anchored dropdown) and
`components/bottom-sheet` (a mobile slide-up sheet, not desktop-shaped).

## Use

```html
<link rel="stylesheet" href="path/to/brand/tokens/tokens.css">
<link rel="stylesheet" href="path/to/components/dropdown-menu/dropdown-menu.css">
```

## Markup

```html
<div class="dj-dropdown">
  <button type="button" class="dj-button" aria-haspopup="true" aria-expanded="false">Account ▾</button>
  <div class="dj-dropdown-menu" role="menu" hidden>
    <a class="dj-dropdown-item" role="menuitem" href="/profile">Profile</a>
    <hr class="dj-dropdown-divider">
    <button class="dj-dropdown-item dj-dropdown-item-danger" role="menuitem" type="button">Sign out</button>
  </div>
</div>
```

The trigger's own look is up to you — a `.dj-button`, a bare avatar circle,
whatever fits the context; only `.dj-dropdown-menu`/`.dj-dropdown-item` are
this component's concern. Toggling `hidden`/`aria-expanded` and closing on an
outside click or Escape is a few lines of consumer JS, same contract as
`components/popup`'s `.dj-switch` (reads state, doesn't manage it).
