# Augustus's Special Watches

A purple-and-gold antique and vintage watch discovery website, built as a dependency-free static application for the existing Vercel deployment.

The researched catalogue contains **45 watches from 20 independent vendors across 10 countries and five regions**, including **nine watches at least 100 years old**. Each record links to its original vendor listing. Two confirmed sold pieces are labelled as archives and excluded from the main collection unless selected. The site does not take payments or claim to authenticate vendor inventory.

## Explore and buy

- Search by watchmaker, model, reference, manufacture year, dial colour, vendor or location. Search terms combine, and year searches match approximate decade ranges.
- Combine brand, age, dial colour, genre/style, vendor, country and original currency filters.
- Browse quick edits, sort by age or brand, and paginate the catalogue.
- Sort by price after choosing a currency, so native prices from different currencies are never incorrectly compared. Unpublished prices remain “Price on enquiry”; WatchPool24 requires vendor login.
- Open a watch's details for source metadata, age and seller information. Details the source did not establish are marked “Not stated”.
- Save watches to a browser-local shortlist, retained between visits. If local storage is unavailable, the shortlist works for the current visit.
- Share the current filtered URL. Filter state restores when opened.
- Browse a vendor directory by region and follow seller links for purchase or enquiries.

“Antique” is defined here as at least 100 years old. Later pieces are described as vintage. Age calculations use the current year, and source decade ranges are retained instead of inventing precise years. Age bands may overlap when a source gives only a decade; an antique classification requires the entire source range to be at least 100 years old.

## Research and photographs

The source selection was researched on **14 October 2026** using vendor catalogue pages and product descriptions. `src/catalogue.json` records each source URL, seller, approximate manufacture date, known metadata, original currency, price and research date. It is a research snapshot, **not a live stock feed**. Confirm current stock, condition, originality, service history, total price, import duties, delivery and returns directly with the vendor before buying.

Vendor photographs load from their original hosts; if a host fails or an image is unavailable, the card clearly directs the visitor to the vendor photograph instead of substituting a different watch. Source photographs remain the property of their vendors. The homepage uses generated editorial artwork of a generic pocket watch on purple velvet, labelled as an illustration and stored locally as an optimized WebP. It does not represent an offered product.

## Development

```sh
npm run dev     # http://localhost:5173 — source files, no compilation needed
npm test        # Node's built-in test runner: catalogue and search contracts
npm run build  # copies the static application into dist/
npm run preview # http://localhost:4173 — production files
```

No npm dependencies or TypeScript compiler are required. The build uses Node's filesystem APIs, copies all application modules/data/assets, and rewrites source paths in the HTML. The existing `vercel.json` continues to build with `npm run build` and serve `dist`.

## Files

- `index.html`: accessible layout, page metadata, navigation, catalogue controls and collector's notes.
- `src/main.mjs`: rendering, combined filters, URL state, pagination, saved watches, dialogs, vendor directory and image fallback.
- `src/catalogue.mjs`: pure search, age, currency and sorting functions.
- `src/catalogue.json`: the researched watch and vendor records with source links.
- `src/styles.css`: responsive purple, ivory and gold design with reduced-motion support.
- `src/assets/`: the local crest and generated homepage illustration.
- `tests/catalogue.test.mjs`: source integrity, worldwide vendor coverage, combined search, age boundaries, archives, shortlist and currency-safe sorting checks.

## Delivery

Work is reviewed through a feature-branch GitHub pull request. Merging into `main` triggers the existing Vercel deployment. The original Hello World baseline remains recoverable using the existing `coding-demo-baseline-v1.0.0` tag; do not move or reuse it.
