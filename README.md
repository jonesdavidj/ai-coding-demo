# Ultra Atlas

A dependency-free ultramarathon explorer with blue and gold styling, race filters, a timeline, grouped comparisons, saved races and profile-based training outlines.

## Run and deploy

- `npm run dev`: serve the source at http://localhost:5173.
- `npm run build`: copy browser JavaScript and CSS into `dist` and rewrite HTML asset paths.
- `npm run preview`: serve the build at http://localhost:4173.

Vercel builds and serves `dist` using the existing `vercel.json`. The source entry is `src/main.js`; styles are in `src/styles.css`.

## Data and limitations

Seven curated races across six continents. Organiser links accompany each race. Data was researched on 13 October 2026 and does not refresh automatically. UTMB is a past 2026 edition; UTA uses the festival start pending confirmation of its race day. Temperature and difficulty are editorial planning estimates. Photos are illustrative remote images, not verified race photographs. Google Fonts and photography require external network access.

Runner profiles and saved races stay in browser localStorage. Training outlines are educational, adapt to the entered profile, and flag insufficient preparation time; they do not replace individual coaching.

The previous greeting page is recoverable from Git history and the `coding-demo-baseline-v1.0.0` tag.
