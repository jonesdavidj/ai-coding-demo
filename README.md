# The Thoughtful Life

A dependency-free personal journal about philosophy and healthier everyday living.

## Features

- Four original example reflections on Stoic choices, daily walking, Socratic curiosity, and sleep routines.
- Complete English, Cantonese (Traditional characters), and standard Chinese (Simplified characters) interfaces and example articles.
- Category filters and full-article reading dialogs.
- Add and delete personal reflections, selecting the language and category for each post.
- Browser-local persistence, JSON export and validated backup import.
- Responsive layouts and keyboard-accessible native dialogs and forms.

Personal reflections are stored only in the current browser, on the current site origin. They are **not published to other visitors or synchronized across devices**. Export backups regularly; clearing browser data removes local posts. Writing in one language does not automatically translate a personal post. A public publishing workflow would require shared storage and an authenticated author interface.

## Development

Requires Node.js, npm and Python 3. No npm dependencies or install step are required.

- `npm run build` recreates committed `dist` assets. The build uses TypeScript if available; otherwise the browser-compatible entry file is copied directly.
- `npm run dev` serves the checkout on port 5173. Rebuild after changing `src/main.ts` because development HTML loads `dist/main.js`.
- `npm run preview` serves `dist` on port 4173.

Vercel uses `npm run build` and publishes `dist` per `vercel.json`.

## Validation

Build and Chromium checks exercised article reading, all three languages, category filtering, creation and reload persistence, safe rendering of HTML-like user text, export/import, deletion, mobile width, and a separate visitor context with only example posts. Health content is educational, not personalised medical advice.
