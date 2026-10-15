# My Name’5 Doddie Foundation — Hong Kong

A responsive community website with sourced historical activities, Foundation imagery, and a tartan-inspired navy, blue and gold design.

## Development

- `npm run dev` serves the source site at http://localhost:5173.
- `npm run build` creates the dependency-free static site in `dist/`.
- `npm run preview` serves the build at http://localhost:4173.

Vercel uses the existing configuration to build and serve `dist/`.

## Content and editing

Historical activities link to South China Morning Post coverage and official Foundation reports. The archive can be filtered by source type.

The three 2027 events are fictional planning concepts, visibly marked unconfirmed. The page includes an editor with browser-local storage and a JSON export. Edits do not update the deployed source or other visitors’ browsers. For permanent changes, edit the `defaults` array in `src/main.js` and rebuild.

Images are externally hosted by the Foundation and Unsplash; fonts are served by Google Fonts. Credits appear in the footer. The site is a proposed community website prepared for review.

## Validation

Run `npm run build`, `node --check src/main.js`, and `git diff --check`. Browser visual verification was unavailable during initial implementation.
