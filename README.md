# Hong Kong Academy · Sai Kung website concept

A responsive website introducing the value of a school community and the opportunities of Sai Kung’s coastal setting. It includes community content, a keyboard-accessible neighbourhood tab panel, mobile navigation and links to HKA’s official website for admissions enquiries.

The landscape artwork is interpretive SVG illustration. This is a website concept, not an official school publication; it does not claim specific school programmes, admissions policies or outcomes.

## Develop and build

- `npm run dev` serves the project at http://localhost:5173.
- `npm run build` generates the production site in `dist/`.
- `npm run preview` serves the production output at http://localhost:4173.

Edit `index.html`, `src/styles.css` and `src/main.ts`, then rebuild. The entry file intentionally uses browser-compatible JavaScript syntax so the existing build can work without an installed TypeScript compiler. The deployment configuration publishes `dist/` on Vercel.

Google Fonts is an optional external resource; local serif and sans-serif fallbacks are defined. Other artwork and application assets are self-contained.

## Recovery

The original Hello World baseline remains available at the immutable `coding-demo-baseline-v1.0.0` Git tag. Restore it on a new branch if needed; do not move the tag.
