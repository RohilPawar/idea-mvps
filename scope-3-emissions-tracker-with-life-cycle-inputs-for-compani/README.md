# Scope 3 Value-Chain Tracker — MVP prototype

A single static page that turns three wizard answers into a live Scope 3 emissions map.
No backend, no build step, no network calls beyond one Chart.js CDN script (and it degrades
to a built-in canvas bar chart if that script can't load).

## The core interaction

1. **3-step wizard** — company name → industry (8 presets incl. custom) → one product line.
2. **Auto-generated value chain** — four boxes (Supply Chain, Operations, Distribution &
   Marketing, Consumer Use & End-of-Life), each showing the industry-specific label as a hint.
   Click any stage name to rename it inline. Each box has an **ownership toggle**; flipping it
   recolours the bar underneath between **Scope 1 & 2** (owned) and **Scope 3** (value chain).
3. **Metric entry** — one hardcoded impact, *Purchased Goods — Materials Emissions*. Enter
   activity data and an emission factor (pre-filled at 2.4 and clearly tagged
   *"sample factor, not for reporting"*). The app computes kg CO₂e live as you type.
4. **Chart** — a bar chart of Scope 3 totals by GHG Protocol category. Adding a metric bumps
   Category 1 immediately, with zero page reloads.

State persists in `localStorage`, so a refresh keeps your company.

## How to run

Open `index.html` directly in any modern browser. No server, no install.

```
open index.html
```

## First 30 seconds

Click **Load Sample** in the header. You'll land on *Brightleaf Naturals* (food, Herbal Tea
Blends) with a populated value chain and chart. Then:

- Click **Farming & Ingredients** and rename it to something of your own — it saves on blur.
- Untick **We own / control this** on Operations and watch the bar flip from Scope 1 & 2 to Scope 3.
- Type `40000` into Activity data and hit **Add metric** — the Category 1 bar grows instantly
  and the total updates.

Hit **Start Over** to clear everything and run the wizard yourself.

## Caveats

The emission factor is illustrative. Nothing here is suitable for actual GHG reporting.
