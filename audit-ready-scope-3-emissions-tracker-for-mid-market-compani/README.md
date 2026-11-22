# CarbonLedger — Audit-Ready Scope 3 Emissions Tracker (MVP Prototype)

A minimal, self-contained prototype of an audit-ready Scope 3 emissions tracker for
mid-market companies. It demonstrates the full chain of custody that makes an emissions
inventory defensible to a third-party assurer: screening → inventory with cited factors →
immutable audit log → reviewer approval/lock → downloadable assurance package.

> Built as a single `index.html` with all data mocked inline — no server, no build step, no secrets.
> (The production vision uses Next.js + Supabase; this prototype makes the core interaction tangible.)

## What was built

Three roles you can switch between (top-right dropdown):

- **Data Owner** (Dana) — screens categories, enters & edits Category 1 line items.
- **Reviewer** (Ravi) — approves line items to **lock** them from further edits.
- **Auditor** (Audra) — fully **read-only**; can inspect everything and download the package.

Five tabs:

1. **Category Screening** — all 15 GHG Protocol Scope 3 categories, each marked
   *Relevant* / *Excluded* with a **required justification** (saved + logged).
2. **Cat 1 — Purchased Goods** — add line items (vendor, spend, USEEIO factor dropdown).
   Emissions **auto-calculate** and show the **formula inline** plus the **factor citation**
   (source, year, geography). Approved lines become read-only.
3. **Audit Log** — an **append-only, immutable** trail of every create / edit / approval
   (user, timestamp, field, old → new value). No delete path exists anywhere in the UI.
4. **Evidence** — manifest of uploaded supporting files.
5. **Assurance Package** — generates a **print-ready PDF** containing the screening table,
   Cat 1 inventory with sources, the full audit log, and the evidence manifest.

## How to open / run

Just open `index.html` in any browser. No local server required.

```
# macOS
open index.html
# Linux
xdg-open index.html
```

## First 30 seconds (prove the value)

1. On the **Cat 1 — Purchased Goods** tab, add a line (e.g. vendor *"Globex Plastics"*, spend
   `30000`, factor *Plastics Material & Resin Mfg*). Watch emissions + the formula appear instantly.
2. **Edit** the spend on an existing line — notice the emissions recalc.
3. Switch role to **Reviewer** → click **Approve & lock** on that line.
4. Open the **Audit Log** tab — every action is recorded with old → new values and no way to delete.
5. Go to **Assurance Package** → **Download** → in the new tab click **Save as PDF**.
   The PDF shows each entry's **origin, formula, citation, and full edit history**.

This end-to-end loop (enter → edit → approve → export) is exactly the success criterion:
a traceable, tamper-evident record an auditor can sign off on.
