# RoomSplit

A prototype dashboard for apartment managers who bill utilities to **individual bedrooms** in shared
(co-living) units. Enter a bill, pick a split method, see exactly what each bedroom owes and *why*,
approve it — and the charges land in each resident's own view.

## What's in it

**Manager Dashboard**
- Select property → unit (seeded: Maple Court Apartments, Unit 2A and Unit 2B, 4 bedrooms each)
- Manually enter a bill: utility type, amount, billing period start/end
- Choose an allocation method:
  - **Equal split** — bill ÷ number of bedrooms
  - **Occupancy-based proration** — each bedroom pays in proportion to the nights it was actually occupied during the period
- A live table shows every bedroom, its resident, days occupied, the **arithmetic inline** (`$240.00 × 15 / 108 bed-days`), and the resulting charge. Rounding remainders are pushed onto the largest line so the column always ties out to the bill exactly.
- **Approve & post charges** finalizes the bill and writes it to the resident ledgers

**Resident View**
- A mock resident selector stands in for login
- Shows that resident's balance due plus every approved charge — current and historical — with the same split explanation the manager saw

## How to run it

Open `index.html` in any browser. That's it — no server, no build step, no dependencies.
All data is mocked in JavaScript and lives in memory (a page refresh resets to the seed state).

## First 30 seconds

The manager dashboard loads pre-filled with the demo case: **Unit 2A · Electricity · $240 · Oct 1–31**.

1. Click **Occupancy-based proration**. Jordan Reyes (Bedroom D) moved out Oct 15, so the table
   instantly re-splits: Bedrooms A/B/C carry 31 days each and pay **$68.89**, Bedroom D carries 15
   days and pays **$33.33**. Total: exactly $240.00.
2. Click **Approve & post charges**.
3. Switch to **Resident View** and pick *Jordan Reyes* — the $33.33 charge is there with the
   proration math shown, alongside their prior September water charge.

The point of the demo is the third column: the resident can see the formula, so a mid-month move-out
stops being an argument.

## Notes / simplifications

- Occupancy counts both endpoint days as occupied (Oct 1–15 = 15 days).
- A vacant bedroom pays $0 under occupancy proration; under equal split it still gets a share, which
  is treated as the owner's cost.
- No auth, no persistence, no back-end — this is a clickable prototype of the core interaction only.
