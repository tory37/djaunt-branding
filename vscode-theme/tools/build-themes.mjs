// Generates vscode-theme/themes/*.json from brand/tokens/tokens.json.
// Rebuild with: node vscode-theme/tools/build-themes.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const tokens = JSON.parse(readFileSync(path.join(root, "brand/tokens/tokens.json"), "utf8"));

const c = tokens.color;
const bone = { 100: c.bone["100"].$value, 200: c.bone["200"].$value, 300: c.bone["300"].$value, 400: c.bone["400"].$value, 500: c.bone["500"].$value };
const ink = { 400: c.ink["400"].$value, 500: c.ink["500"].$value, 600: c.ink["600"].$value, 700: c.ink["700"].$value, 800: c.ink["800"].$value, 900: c.ink["900"].$value };
const gold = { 300: c.gold["300"].$value, 400: c.gold["400"].$value, 500: c.gold["500"].$value };
const semantic = {
  success: c.semantic.success.$value,
  warning: c.semantic.warning.$value,
  danger: c.semantic.danger.$value,
  info: c.semantic.info.$value,
};
const ansi = tokens.terminal.ansi;

// Fixed cross-theme syntax roles (per BRANDING.md: semantic colors and bone
// text are fixed across all elemental themes — only accent + background move).
const syntax = {
  comment: bone[500],
  string: semantic.success,
  number: semantic.warning,
  type: semantic.info,
  invalid: semantic.danger,
  variable: bone[200],
  operator: bone[300],
  punctuation: bone[400],
};

const THEME_ORDER = ["hoard", "fire", "frost", "storm", "stone", "venom", "void", "radiant", "deep"];
const CHARACTER = {
  hoard: "Gold. The base identity.",
  fire: "Heat, urgency, destructive actions, live/recording states.",
  frost: "Cold, precise, analytical. Good for data and dev tools.",
  storm: "Electric, generative, in-motion. Good for music and audio.",
  stone: "Weathered, quiet, documentary. Good for archives and reading.",
  venom: "Acidic, alert, hacker-adjacent. Use sparingly.",
  void: "Muted, near-monochrome, dimmest of the set.",
  radiant: "Pale gold, near-white. The lightest dark theme.",
  deep: "Submerged teal, calm and dense.",
};

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function withAlpha(hex, alpha) {
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0");
  return `${hex}${a}`;
}
function mix(hexA, hexB, t) {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function buildTheme(name) {
  const t = tokens.theme[name];
  const accent = t.accent.$value;
  const accentHi = t.accentHi.$value;
  const accentDeep = t.accentDeep.$value;
  const bg = t.bg.$value;
  const surface = t.surface.$value;
  const surfaceRaised = t.surfaceRaised.$value;
  const border = t.border.$value;
  const text = bone[200];
  const textMuted = bone[400];
  const onAccent = ink[900];
  // Chrome (activity bar, status bar, title bar, sidebar, panel) is tinted
  // toward accentDeep so the app wrapper reads as the element's color, not
  // a flat neutral gray — the editor content area stays near-black.
  const chromeBg = mix(surface, accentDeep, 0.32);
  const tabBg = mix(surface, accentDeep, 0.48);

  const colors = {
    focusBorder: withAlpha(accent, 0.6),
    foreground: text,
    disabledForeground: bone[500],
    "widget.shadow": "#00000066",
    "selection.background": withAlpha(accent, 0.4),
    descriptionForeground: textMuted,
    errorForeground: semantic.danger,

    "editor.background": bg,
    "editor.foreground": text,
    "editorLineNumber.foreground": bone[500],
    "editorLineNumber.activeForeground": accent,
    "editorCursor.foreground": accent,
    "editor.selectionBackground": withAlpha(accent, 0.35),
    "editor.selectionHighlightBackground": withAlpha(accent, 0.18),
    "editor.inactiveSelectionBackground": withAlpha(accent, 0.2),
    "editor.wordHighlightBackground": withAlpha(accentHi, 0.16),
    "editor.wordHighlightStrongBackground": withAlpha(accentHi, 0.24),
    "editor.findMatchBackground": withAlpha(accentHi, 0.4),
    "editor.findMatchHighlightBackground": withAlpha(accentHi, 0.22),
    "editor.lineHighlightBackground": withAlpha(accentDeep, 0.22),
    "editor.rangeHighlightBackground": withAlpha(surfaceRaised, 0.4),
    "editorIndentGuide.background1": border,
    "editorIndentGuide.activeBackground1": accentDeep,
    "editorWhitespace.foreground": withAlpha(bone[400], 0.25),
    "editorBracketMatch.background": withAlpha(accent, 0.16),
    "editorBracketMatch.border": accent,
    "editorGutter.background": bg,
    "editorGutter.addedBackground": semantic.success,
    "editorGutter.modifiedBackground": accent,
    "editorGutter.deletedBackground": semantic.danger,
    "editorWidget.background": surfaceRaised,
    "editorWidget.border": border,
    "editorHoverWidget.background": surfaceRaised,
    "editorHoverWidget.border": border,
    "editorSuggestWidget.background": surfaceRaised,
    "editorSuggestWidget.border": border,
    "editorSuggestWidget.selectedBackground": withAlpha(accent, 0.2),
    "editorSuggestWidget.highlightForeground": accent,
    "editorError.foreground": semantic.danger,
    "editorWarning.foreground": semantic.warning,
    "editorInfo.foreground": semantic.info,
    "editorOverviewRuler.border": border,

    "editorGroup.border": accentDeep,
    "editorGroupHeader.tabsBackground": tabBg,
    "editorGroupHeader.tabsBorder": accentDeep,
    "tab.activeBackground": bg,
    "tab.activeForeground": bone[100],
    "tab.inactiveBackground": tabBg,
    "tab.inactiveForeground": textMuted,
    "tab.border": accentDeep,
    "tab.activeBorderTop": accent,
    "tab.unfocusedActiveBorderTop": accentHi,

    "activityBar.background": accentDeep,
    "activityBar.foreground": bone[100],
    "activityBar.inactiveForeground": withAlpha(bone[100], 0.45),
    "activityBar.border": accentDeep,
    "activityBar.activeBorder": accent,
    "activityBar.activeBackground": withAlpha(accent, 0.16),
    "activityBarBadge.background": accent,
    "activityBarBadge.foreground": onAccent,

    "sideBar.background": chromeBg,
    "sideBar.foreground": text,
    "sideBar.border": accentDeep,
    "sideBarTitle.foreground": bone[100],
    "sideBarSectionHeader.background": mix(surfaceRaised, accentDeep, 0.4),
    "sideBarSectionHeader.foreground": text,
    "sideBarSectionHeader.border": accentDeep,

    "list.activeSelectionBackground": withAlpha(accent, 0.32),
    "list.activeSelectionForeground": bone[100],
    "list.inactiveSelectionBackground": withAlpha(accent, 0.16),
    "list.hoverBackground": withAlpha(accent, 0.1),
    "list.focusBackground": withAlpha(accent, 0.26),
    "list.highlightForeground": accentHi,
    "list.dropBackground": withAlpha(accent, 0.28),
    "tree.indentGuidesStroke": border,

    "statusBar.background": accentDeep,
    "statusBar.foreground": bone[100],
    "statusBar.border": accentDeep,
    "statusBar.debuggingBackground": semantic.danger,
    "statusBar.debuggingForeground": ink[900],
    "statusBar.noFolderBackground": accentDeep,
    "statusBarItem.remoteBackground": accent,
    "statusBarItem.remoteForeground": onAccent,
    "statusBarItem.hoverBackground": withAlpha(bone[100], 0.12),
    "statusBarItem.prominentBackground": withAlpha(ink[900], 0.35),

    "titleBar.activeBackground": accentDeep,
    "titleBar.activeForeground": bone[100],
    "titleBar.inactiveBackground": mix(surface, accentDeep, 0.6),
    "titleBar.inactiveForeground": textMuted,
    "titleBar.border": accentDeep,

    "panel.background": chromeBg,
    "panel.border": accentDeep,
    "panelTitle.activeForeground": bone[100],
    "panelTitle.activeBorder": accent,
    "panelTitle.inactiveForeground": textMuted,

    "breadcrumb.foreground": textMuted,
    "breadcrumb.focusForeground": text,
    "breadcrumb.activeSelectionForeground": accent,
    "breadcrumbPicker.background": surfaceRaised,

    "badge.background": accent,
    "badge.foreground": onAccent,

    "button.background": accent,
    "button.foreground": onAccent,
    "button.hoverBackground": accentHi,
    "button.secondaryBackground": surfaceRaised,
    "button.secondaryForeground": text,
    "button.secondaryHoverBackground": border,

    "input.background": surfaceRaised,
    "input.foreground": text,
    "input.border": border,
    "input.placeholderForeground": bone[500],
    "inputOption.activeBorder": accent,
    "inputValidation.errorBackground": semantic.danger,
    "inputValidation.errorBorder": semantic.danger,

    "dropdown.background": surfaceRaised,
    "dropdown.foreground": text,
    "dropdown.border": accentDeep,

    "scrollbarSlider.background": withAlpha(accent, 0.14),
    "scrollbarSlider.hoverBackground": withAlpha(accent, 0.28),
    "scrollbarSlider.activeBackground": withAlpha(accent, 0.45),
    "progressBar.background": accent,

    "notificationCenter.border": accentDeep,
    "notificationCenterHeader.background": chromeBg,
    "notificationToast.border": accentDeep,
    "notifications.background": surfaceRaised,
    "notifications.foreground": text,
    "notifications.border": accentDeep,

    "pickerGroup.foreground": accent,
    "pickerGroup.border": border,
    "quickInput.background": surfaceRaised,
    "quickInput.foreground": text,

    "gitDecoration.addedResourceForeground": semantic.success,
    "gitDecoration.modifiedResourceForeground": accent,
    "gitDecoration.deletedResourceForeground": semantic.danger,
    "gitDecoration.untrackedResourceForeground": semantic.info,
    "gitDecoration.ignoredResourceForeground": bone[500],
    "gitDecoration.conflictingResourceForeground": semantic.danger,

    "diffEditor.insertedTextBackground": withAlpha(semantic.success, 0.14),
    "diffEditor.removedTextBackground": withAlpha(semantic.danger, 0.14),
    "diffEditor.insertedLineBackground": withAlpha(semantic.success, 0.08),
    "diffEditor.removedLineBackground": withAlpha(semantic.danger, 0.08),

    "terminal.background": bg,
    "terminal.foreground": bone[200],
    "terminalCursor.foreground": accent,
    "terminal.ansiBlack": ansi.black.$value,
    "terminal.ansiRed": ansi.red.$value,
    "terminal.ansiGreen": ansi.green.$value,
    "terminal.ansiYellow": ansi.yellow.$value,
    "terminal.ansiBlue": ansi.blue.$value,
    "terminal.ansiMagenta": ansi.magenta.$value,
    "terminal.ansiCyan": ansi.cyan.$value,
    "terminal.ansiWhite": ansi.white.$value,
    "terminal.ansiBrightBlack": ansi.brightBlack.$value,
    "terminal.ansiBrightRed": ansi.brightRed.$value,
    "terminal.ansiBrightGreen": ansi.brightGreen.$value,
    "terminal.ansiBrightYellow": ansi.brightYellow.$value,
    "terminal.ansiBrightBlue": ansi.brightBlue.$value,
    "terminal.ansiBrightMagenta": ansi.brightMagenta.$value,
    "terminal.ansiBrightCyan": ansi.brightCyan.$value,
    "terminal.ansiBrightWhite": ansi.brightWhite.$value,
  };

  const tokenColors = [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: syntax.comment, fontStyle: "italic" } },
    { scope: ["string", "string.quoted", "string.template"], settings: { foreground: syntax.string } },
    { scope: ["constant.numeric"], settings: { foreground: syntax.number } },
    { scope: ["constant.language", "constant.character.escape"], settings: { foreground: accentHi } },
    { scope: ["keyword", "keyword.control", "storage", "storage.type", "storage.modifier"], settings: { foreground: accent } },
    { scope: ["keyword.operator"], settings: { foreground: syntax.operator } },
    { scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: accentHi } },
    { scope: ["entity.name.type", "entity.name.class", "support.type", "support.class", "entity.other.inherited-class"], settings: { foreground: syntax.type } },
    { scope: ["entity.name.tag"], settings: { foreground: accent } },
    { scope: ["entity.other.attribute-name"], settings: { foreground: accentHi } },
    { scope: ["variable", "variable.other"], settings: { foreground: syntax.variable } },
    { scope: ["variable.parameter"], settings: { foreground: syntax.variable, fontStyle: "italic" } },
    { scope: ["punctuation", "meta.brace", "punctuation.separator", "punctuation.terminator"], settings: { foreground: syntax.punctuation } },
    { scope: ["invalid", "invalid.illegal"], settings: { foreground: syntax.invalid } },
    { scope: ["markup.heading"], settings: { foreground: accent, fontStyle: "bold" } },
    { scope: ["markup.bold"], settings: { foreground: bone[200], fontStyle: "bold" } },
    { scope: ["markup.italic"], settings: { foreground: bone[200], fontStyle: "italic" } },
    { scope: ["markup.underline.link", "string.other.link"], settings: { foreground: syntax.type, fontStyle: "underline" } },
    { scope: ["meta.diff.header", "meta.diff.range"], settings: { foreground: bone[400] } },
  ];

  return {
    $schema: "vscode://schemas/color-theme",
    name: `Djaunt ${cap(name)}`,
    type: "dark",
    colors,
    tokenColors,
  };
}

function cap(s) {
  return s[0].toUpperCase() + s.slice(1);
}

mkdirSync(path.join(here, "..", "themes"), { recursive: true });

const manifestThemes = [];
for (const name of THEME_ORDER) {
  const theme = buildTheme(name);
  const fileName = `djaunt-${name}-color-theme.json`;
  writeFileSync(
    path.join(here, "..", "themes", fileName),
    JSON.stringify(theme, null, 2) + "\n"
  );
  manifestThemes.push({
    label: theme.name,
    uiTheme: "vs-dark",
    path: `./themes/${fileName}`,
  });
  console.log(`wrote themes/${fileName}`);
}

// Patch package.json's contributes.themes to match, preserving everything else.
const pkgPath = path.join(here, "..", "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.contributes = pkg.contributes || {};
pkg.contributes.themes = manifestThemes;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log("updated package.json contributes.themes");
