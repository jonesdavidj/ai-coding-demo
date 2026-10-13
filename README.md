# May Lam — The Jewellery Cabinet

A self-contained Worker ESM website with a gold, oak and cream visual identity.

## Run and build

Requires Node.js 20 or later. `npm run dev` serves the complete page and live API locally on port 5173. Vercel builds the static page into `dist/` and serves `api/catalogue.js` as a serverless function; Cloudflare Sites uses the same core Worker.

`npm test` checks catalogue normalization, availability, inferred date and colour handling, upstream failures, response limits and API input validation. `npm run build` renders the homepage and pendant illustration into `dist/`.

The deployed Worker serves the page, an original pendant illustration, and `/api/catalogue?source=<known-source-id>`. It fetches only explicitly listed seller origins; visitors cannot supply arbitrary URLs. Responses are size-limited and requests time out. Successful feeds are cached for 10 minutes; failures for one minute. No third-party credentials are required.

## Search scope

The website attempts public Shopify catalogue feeds for eight sellers. Each feed covers its first 250 products. Available jewellery is normalized, then colour, type, date, style, keyword and region filters run on the fetched items in the browser. These are bounded catalogue searches, not an exhaustive search of every dealer or every page. Feed errors remain visible and never introduce simulated listings. The directory includes additional specialist dealers and galleries without compatible feeds.

Genre and colour matching uses seller text in English and some French. It cannot authenticate jewellery or determine a date from an image. Inferred period dates are marked `c.`; unknown dates stay undated. Antique-style reproductions and obvious modern listings are excluded when identified in seller titles or tags. Some undated, conversion and vintage items remain. Seller currencies are explicitly shown, without currency conversion or cross-currency price sorting.

Saved favourites use browser-local storage; no accounts or cross-device synchronization. Dealer inventory, feed structure and access policies can change, so check source status and verify listings with each seller.

## Research

Source links appear beside every item and in the directory. Directory research was checked on 13 October 2026 against dealer websites and indexed catalogue pages. Inclusion is not an endorsement. Asia is currently represented by directory links rather than live catalogue feeds.
