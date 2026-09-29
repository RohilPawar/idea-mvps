# Streakbreaker — prototype

A habit tracker that texts you the moment you break a streak.

## What this is

A single-page prototype of the core loop: track habits, check them off, and get an
SMS when you miss one. The app sits next to a mock phone so you can actually *see*
the text arrive — that's the part of the idea worth testing.

The real product would run this check as a nightly Supabase cron job calling an edge
function that sends via Twilio. Here that job is a button: **"Skip to tomorrow"**.
Pressing it runs the same logic (any habit left unchecked → streak resets to 0, text
goes out) so you don't have to wait a day to feel it.

Everything is mocked in JavaScript. No accounts, no server, no API calls.

## How to run it

Open `index.html` in any browser. That's it — no install, no build step, no local server.

## First 30 seconds

1. Three habits are already there. **Morning run** has a 5-day streak and is unchecked.
2. Check off **Morning run** and watch the streak tick to 6. Uncheck it again.
3. Hit **Skip to tomorrow** with it still unchecked.
4. The text lands on the phone — *"You missed Morning run — your 5-day streak just
   broke. Restart today!"* — and the habit turns red with its streak at 0.

Add your own habit with the form at the bottom and repeat step 3 to see it break too.

## Not built (deliberately)

Auth, phone-number collection, the Supabase table, the edge function, and Twilio are
all out of scope for a prototype meant to be opened as a file. The streak/miss/notify
logic in `index.html` is the piece that would move into the edge function as-is.
