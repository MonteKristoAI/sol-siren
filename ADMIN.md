# Sol Siren Admin Portal (`/admin`)

A private command centre for Erin, living inside the main site. It does the
things Shopify does poorly for a one-of-one shop, and pulls the scattered
pieces (Shopify, Retell concierge, blog) into one place. No database: it talks
straight to the Shopify Admin API and the Retell API.

## What's in it

- **Dashboard** — live/held/sold/draft piece counts, orders + revenue this
  month, chats this week, recent orders, and which pieces have been live longest.
- **Inventory** — every piece with photo, category, price, status. One-click
  **Mark sold** (archives in Shopify + tags `sold`), **Hold/Release** (tags
  `reserved`), **Restore**, inline **Edit** (name, category, price, tags, story),
  and **New piece** intake (creates a Shopify *draft* for review).
- **Orders** — read view of recent orders; international (customs) orders flagged.
- **Concierge Chats** — recent chat transcripts from the website concierge, plus
  a **Leads & intent** tab that surfaces captured emails and buying signals.
- **Bot Knowledge** — edit the concierge's instructions in plain language and
  publish to the live chat. No code.
- **History Cards** — generate a print-ready packaging card (name, era, story)
  for any piece.
- **Blog** — read view of published posts.

## Access

`/admin` and `/api/admin/*` are gated by `src/middleware.ts` (HMAC-signed cookie).
Sign in at `/admin/login` with `ADMIN_PASSWORD`. The portal is `noindex`.

## Environment variables (set in Vercel — Production, Preview, Development)

| Var | Purpose |
|---|---|
| `ADMIN_PASSWORD` | the password Erin types to log in |
| `ADMIN_SESSION_SECRET` | signs the session cookie (long random string) |
| `SHOPIFY_STORE_DOMAIN` | `sol-siren-vintage.myshopify.com` |
| `SHOPIFY_CLIENT_ID` / `SHOPIFY_CLIENT_SECRET` | custom-app Admin API creds |
| `SHOPIFY_API_VERSION` | e.g. `2024-10` |
| `RETELL_API_KEY` | already set (concierge) |
| `RETELL_AGENT_ID` | already set (concierge) |
| `RETELL_LLM_ID` | concierge LLM id, for the prompt editor |

The Shopify Admin token is minted on demand via the `client_credentials` grant
and cached in memory until it nears expiry — nothing to rotate manually.

## Notes

- "Sold" = Shopify status `ARCHIVED` + tag `sold`. "On hold" = tag `reserved`.
  The storefront can later read these tags to badge pieces if desired.
- Chat transcripts are read live from Retell (`/list-chat`, `/get-chat`).
- Admin pages render no storefront chrome (nav, cart, concierge widget); that is
  handled by `src/components/StorefrontChrome.tsx`.
