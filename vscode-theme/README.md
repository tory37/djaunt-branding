# Djaunt for VS Code

Nine dark color themes generated from the Djaunt brand tokens: `Djaunt Hoard`
(the default gold identity) plus its eight elemental variants — `Fire`,
`Frost`, `Storm`, `Stone`, `Venom`, `Void`, `Radiant`, `Deep`.

Editor chrome (background, surface, borders, cursor, selection) follows each
theme's own accent and background family. Comments, strings, numbers, types,
and invalid tokens use the brand's fixed semantic colors so a file reads the
same across every theme — only the accent moves, per `BRANDING.md`.

## Install locally

VS Code doesn't load extensions straight from a folder without symlinking or
packaging. Pick one:

**Symlink into your extensions folder** (fastest for trying it out):

```sh
ln -s "$(pwd)/vscode-theme" ~/.vscode/extensions/djaunt-themes
```

(`~/.vscode-server/extensions` if you're on a remote/WSL install.) Reload
VS Code, then `Ctrl/Cmd+K Ctrl/Cmd+T` → pick a Djaunt theme.

**Package and install a VSIX:**

```sh
cd vscode-theme
npx @vscode/vsce package
code --install-extension djaunt-themes-*.vsix
```

## Regenerating

The theme JSON files are generated from `brand/tokens/tokens.json` — don't
hand-edit `themes/*.json`. Change the source tokens, then rebuild:

```sh
node vscode-theme/tools/build-themes.mjs
```

This also rewrites `package.json`'s `contributes.themes` list.
