-- Djaunt theme colors for REAPER.
-- Colors the selected tracks (or, if no tracks are selected, the selected
-- items) by cycling through a Djaunt theme's palette.
--
-- Install: Actions > Show action list > New action > Load ReaScript..., pick
-- this file, then run it. Generated from brand/tokens/tokens.json values.
--
-- Palette order per theme: accent, accent-2, accent-3, accent-4, accent-hi,
-- accent-deep. Edit the tables below to change or reorder colors.

local THEMES = {
  hoard   = { {212,160,23}, {59,176,124}, {129,106,205}, {198,83,115}, {240,194,75}, {110,74,14} },
  fire    = { {255,107,44}, {84,215,167}, {90,116,216}, {215,84,176}, {255,149,96}, {122,36,8} },
  blood   = { {232,71,92}, {95,207,176}, {224,184,95}, {122,143,224}, {245,128,144}, {110,20,36} },
  earth   = { {185,131,88}, {127,181,138}, {138,143,201}, {201,115,127}, {216,168,127}, {90,58,34} },
  venom   = { {168,224,31}, {85,126,193}, {173,90,195}, {173,187,68}, {201,240,94}, {71,102,10} },
  frost   = { {107,164,255}, {240,180,107}, {181,140,232}, {107,214,181}, {166,200,255}, {23,63,128} },
  storm   = { {155,140,255}, {224,233,162}, {188,233,162}, {162,188,233}, {195,184,255}, {59,44,134} },
  bloom   = { {255,111,176}, {111,224,184}, {179,162,255}, {240,210,122}, {255,166,207}, {122,28,76} },
  stone   = { {142,145,150}, {143,176,201}, {176,143,201}, {201,176,143}, {184,187,192}, {54,57,61} },
  void    = { {207,207,207}, {155,184,201}, {179,155,201}, {201,185,155}, {237,237,237}, {46,46,46} },
  radiant = { {244,244,242}, {168,230,207}, {195,180,238}, {240,180,200}, {255,255,255}, {107,107,104} },
}
local ORDER = { "hoard", "fire", "blood", "earth", "venom", "frost", "storm", "bloom", "stone", "void", "radiant" }

local DEFAULT = "hoard"

local ok, input = reaper.GetUserInputs(
  "Djaunt colors", 1,
  "Theme (" .. table.concat(ORDER, ", ") .. "),extrawidth=260", DEFAULT)
if not ok then return end

local name = input:lower():gsub("^%s+", ""):gsub("%s+$", "")
local palette = THEMES[name]
if not palette then
  reaper.ShowMessageBox("Unknown theme: " .. name, "Djaunt colors", 0)
  return
end

local function native(c)
  return reaper.ColorToNative(c[1], c[2], c[3]) | 0x1000000
end

reaper.Undo_BeginBlock()
reaper.PreventUIRefresh(1)

local nTracks = reaper.CountSelectedTracks(0)
if nTracks > 0 then
  for i = 0, nTracks - 1 do
    local tr = reaper.GetSelectedTrack(0, i)
    reaper.SetTrackColor(tr, native(palette[(i % #palette) + 1]))
  end
else
  for i = 0, reaper.CountSelectedMediaItems(0) - 1 do
    local item = reaper.GetSelectedMediaItem(0, i)
    reaper.SetMediaItemInfo_Value(item, "I_CUSTOMCOLOR", native(palette[(i % #palette) + 1]))
  end
end

reaper.PreventUIRefresh(-1)
reaper.UpdateArrange()
reaper.TrackList_AdjustWindows(false)
reaper.Undo_EndBlock("Djaunt colors: " .. name, -1)
