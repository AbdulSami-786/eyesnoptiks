# Eyes n Optiks — Website

React + Vite storefront for Eyes n Optiks (contact lens practitioner & computerized eye testing). Shoppers add lenses to a cart, adjust quantities, and check out — the checkout form sends one consolidated order to your WhatsApp number. There is no payment gateway or order database; WhatsApp is the order channel.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Before going live — edit these

**[src/data/siteConfig.js](src/data/siteConfig.js)** — WhatsApp number, phone, email, address, business hours, and social links are all placeholders marked `// TODO`. Replace them with your real details. The WhatsApp number must include the country code with no `+`, spaces, or leading zeros (e.g. `923001234567`).

**[src/data/products.js](src/data/products.js)** — all 47 lens shades across 5 collections (Diamond, Elite, Glow, Natural, One Day), each with a name, description and price. Price is a single constant (`PRICE = 1200`) used everywhere — change it in one place if pricing changes. Product photos live in `public/products/`.

**[public/logo.png](public/logo.png)** and **[public/banner.png](public/banner.png)** — swap these to update branding.

## Project structure

- `src/pages/` — one file per route (Home, Products, ProductDetail, Checkout, About, Contact, FAQ, NotFound)
- `src/components/` — shared UI (Header, Footer, ProductCard, CartDrawer, WhatsAppButton)
- `src/context/CartContext.jsx` — cart state (items, quantities, totals), persisted to `localStorage` so it survives a refresh
- `src/data/` — product catalog and site configuration (no backend/database)
- `public/products/` — extracted product photography, named `product_##.jpeg`

## How ordering works

1. Shoppers click **Add to Cart** on a product card or detail page (with a quantity selector).
2. The cart icon in the header shows a live item count; clicking it opens the cart drawer (quantity +/-, remove, running total).
3. **Proceed to Checkout** goes to `/checkout`, where the shopper enters name, phone, and delivery address.
4. **Confirm Order via WhatsApp** opens `wa.me` with every item, quantity, and the total pre-filled as a message to your WhatsApp number, then clears the cart.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (Vercel usually auto-detects this).
4. `vercel.json` is already configured with an SPA rewrite so client-side routes (e.g. `/products/diamond-oak`) work on refresh/direct link.
5. Deploy — no environment variables are required.

## Notes

- `source-assets/produt-cat1.pdf` is the original supplier catalog the product photos were extracted from. It is kept for reference only and is **not** part of the deployed site (it lives outside `public/`).
- All ordering happens through WhatsApp deep links (`wa.me`) built in `src/data/siteConfig.js` — there is no payment gateway or order database.
