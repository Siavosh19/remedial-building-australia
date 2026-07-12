@AGENTS.md

# Permissions
The user (Sia) has pre-approved all tool use — file edits, web fetches, shell commands, builds, deploys, and all other operations. Proceed without asking for confirmation on any action.

# Sia's working setup (environment)

Sia keeps his primary laptop clean of website data — all website FILES live on an always-on second Mac, **mac2** (`sias-macbook-pro-2`).

- Reach mac2: `ssh mac2` (over Tailscale, passwordless key; it stays awake with the lid closed).
- Website resource files (images, spreadsheets, scraped lists) live on mac2 at `~/Documents/Resources`, e.g. `Unverified Business List (Not Yet Uploaded)/Businesses_and_Categories.xlsx` (~7,234 scraped businesses + categories, not yet imported into the directory).
- File workflow: fetch a file from mac2 → Sia reviews/edits it → save it back to mac2 on request.
- Website CODE lives in this repo → GitHub (Siavosh19/remedial-building-australia) → Vercel deploy. On mac2 the clone is at `~/Developer/remedial-building-australia`.
