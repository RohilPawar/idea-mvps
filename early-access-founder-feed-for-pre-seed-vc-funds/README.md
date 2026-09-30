# The Founder Feed

An editorial, ink-on-paper prototype of a **pre-seed founder signal feed** for VCs. It presents a ranked, filterable ledger of this week's most promising founder/company signals, lets you open a one-page memo with a ready-to-send first-contact email, and gives you a drag-and-drop pipeline board — all with zero backend and no page reloads.

## What was built

- **Ranked signal table** — 26 hardcoded founder signals across 6 sectors (Healthtech, Fintech, Climate, AI/Dev Tools, Consumer, Security), each with company, founder, location, sector, a "what happened" line, and a 0–100 score.
- **Filters** — sector, state, minimum-score slider, and a "new this week" toggle. Results re-rank instantly.
- **Expandable score breakdown** — click any row to reveal 3–4 weighted scoring reasons.
- **One-page memo + email** — a "Generate Memo" button reveals a founder summary and a pre-written first-contact email with a **copy-to-clipboard** button.
- **Kanban pipeline board** — drag founder cards across four stages (Reviewing → Contacted → Replied → Meeting). State is **persisted in localStorage**.
- **Stats bar** — live counts of signals tracked, new this week, contacted, and reply rate.

## How to run

Just open `index.html` in any modern browser. No server, no build step, no dependencies.

```
open index.html
```

## First 30 seconds (feel the value)

1. Use the **Sector** filter to narrow to one sector (e.g. *Healthtech*).
2. Click the **top-ranked row** to expand its score breakdown.
3. Hit **Generate Memo**, then **Copy Email**.
4. Scroll to the **Pipeline Board** and drag that founder's card into **Contacted** — watch the stats update.

You just went from a sector filter to a copied outreach email to a moved pipeline card in under two minutes, without a single page reload.
