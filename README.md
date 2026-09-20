# Djaunt Branding

Single source of truth for the Djaunt identity — music, software, and art.

```
BRANDING.md              the guidelines. agents read this first.
brand-guidelines.dc.html visual reference — open in a browser
brand/
  logo/                  icon, wordmark, lockup × currentColor/gold/bone/ink
  favicon/               favicon.svg, transparent, maskable (app icons)
  fonts.css              self-hosted @font-face — no CDN network budget needed
  fonts/                 the woff2 files fonts.css points to
  tokens/
    tokens.css           CSS custom properties — import this
    tokens.json          design-tokens spec, for build pipelines
components/              shared UI (CSS + markup contract) built on tokens.css — see its README
vscode-theme/             VS Code color theme extension, one per element — see its README
```

## Use in a project

```html
<link rel="stylesheet" href="path/to/tokens.css">
<link rel="icon" href="path/to/favicon.svg">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<html data-dj-theme="hoard">
```

No network budget for the Google Fonts CDN (extension popups, offline
tools)? Self-host instead:

```html
<link rel="stylesheet" href="path/to/brand/fonts.css">
```

Themes: `hoard` (default gold), `fire`, `frost`, `storm`, `stone`, `venom`, `void`, `radiant`, `deep`.

Shared components (buttons, switches, panels, …) live in `components/` and
pull in the same way, pinned to a tag:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tory37/djaunt-branding@v1.0.0/components/popup/base.css">
```

## Pointing an agent at this repo

> Branding lives at `github.com/tory37/djaunt-branding`. Read `BRANDING.md`
> and import `brand/tokens/tokens.css`. Use theme `<name>`.
