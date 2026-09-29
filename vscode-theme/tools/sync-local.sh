#!/usr/bin/env bash
# Symlinks this theme folder into each installed editor's extensions folder.
# Idempotent. Reload the editor window afterward (Cmd+Shift+P > Reload Window).
set -euo pipefail

THEME_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EXTENSION_NAME="djaunt-themes"
EDITOR_EXTENSION_DIRS=("$HOME/.vscode/extensions" "$HOME/.cursor/extensions")

for extensions_dir in "${EDITOR_EXTENSION_DIRS[@]}"; do
  [ -d "$extensions_dir" ] || continue
  link_path="$extensions_dir/$EXTENSION_NAME"

  if [ -e "$link_path" ] && [ ! -L "$link_path" ]; then
    echo "skip: $link_path exists and is not a symlink"
    continue
  fi

  ln -sfn "$THEME_DIR" "$link_path"
  echo "linked: $link_path -> $THEME_DIR"
done
