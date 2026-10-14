# Casa delle Olive · Montone, Umbria

A dependency-free rental and guest-guide website for an imagined Italian country house. “Casa delle Olive” is a working name; the property photographs are AI-generated concept imagery. Capacity, bedrooms, pool, rates and house policies are illustrative and must be replaced with the owner's confirmed information.

## Visitor experience

- Responsive rental homepage with generated exterior and interior photographs.
- Discover Umbria page with filterable suggestions and Google Maps links.
- Guest guide covering arrival, household equipment, local essentials, emergencies and departure. Unconfirmed instructions and contacts are explicitly marked.
- Interactive April–October 2027 calendar with fabricated unavailable dates, a three-night minimum and a sample €240/night plus €95 cleaning price calculation.
- Demo checkout carrying selected dates and guest count into an itemised summary. It does not collect card details, send guest information, take payments or reserve dates.

## Development

Requires Node.js 18+ for the build and Python 3 for the existing preview commands. No dependency installation is needed.

```sh
npm run dev
npm run build
npm run preview
```

Development serves the source at http://localhost:5173. Production preview serves `dist/` at http://localhost:4173. Hash routes support navigation on static hosting without server routes. `scripts/build.mjs` copies source JavaScript, CSS and local images into `dist/`, and rewrites the HTML asset references. The tracked `dist/` is regenerated with every source change.

The existing Vercel configuration builds and serves `dist/`. Merging the pull request follows the repository's existing deployment flow. Google Fonts is optional: system font fallbacks work if the font service is unavailable.

## Before taking real bookings

Provide the real house name, address, capacity, amenities, photographs, access instructions and private guest contacts. Confirm prices, taxes, deposits, cancellation terms and live availability. Integrate a payment provider using hosted checkout and server-side confirmation before enabling real payment or booking actions. This browser-only demo has no backend, persistence or booking inventory.

## Validation

The production build and JavaScript syntax checks pass. Browser checks cover desktop, tablet and mobile layout; calendar minimum stays and blocked intervals; price calculation; date and guest transfer to checkout; demo completion; discovery filters; guest-guide sections; and gallery opening and dismissal.
