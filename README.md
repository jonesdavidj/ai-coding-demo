# Hong Kong Academy · Sai Kung website concept

A responsive website introducing the value of a school community and the opportunities of Sai Kung’s coastal setting. It includes credited Sai Kung and campus photography, sourced community features, a keyboard-accessible neighbourhood tab panel, mobile navigation and links to HKA’s official website for admissions enquiries.

This is a website concept, not an official school publication. The header uses the school’s English and Chinese names, and the campus photographs show the real school and its signage; the earlier invented circular HKA badge has been removed.

## Develop and build

- `npm run dev` serves the project at http://localhost:5173.
- `npm run build` generates the production site in `dist/`.
- `npm run preview` serves the production output at http://localhost:4173.

Edit `index.html`, `src/styles.css` and `src/main.ts`, then rebuild. The entry file intentionally uses browser-compatible JavaScript syntax so the existing build can work without an installed TypeScript compiler. The deployment configuration publishes `dist/` on Vercel.

Google Fonts is an optional external resource; local serif and sans-serif fallbacks are defined. Photographs load directly from their verified Wikimedia and HKA source URLs. The executor’s network policy blocks direct downloads from these hosts, so local copies have not been added. External-image loading and visual rendering still need a browser check. Failed inline photographs retain their captions and source links.

## Photography and community sources

Checked on 16 October 2026. Visible captions and an expandable source list on the page provide attribution and licence links. Images have explicit dimensions, below-the-fold images are lazy-loaded, and the hero is prioritised.

| Image | Credit and source | Rights |
| --- | --- | --- |
| Sai Wan beach panorama | [fading / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sai_Wan_Beach_Panorama_-_panoramio_(7).jpg) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| Sai Kung panorama | [Ksenia Bramley / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Pano_(149709505).jpeg) | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| School frontage | [Fchandsd / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hong_Kong_Academy.png) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| Campus building | [Hong Kong Academy](https://hkacademy.edu.hk/a-building-for-learning/) | School copyright; not an open licence |
| Parent participation | [Hong Kong Academy](https://hkacademy.edu.hk/community/) | School copyright; not an open licence |

Photos use CSS display crops, identified in captions. Creative Commons display crops retain the respective original photo licences; these do not license the rest of the site. School imagery is linked from its official source without a claim of reproduction permission or endorsement.

The Community Fair and parent volunteering are supported by [HKA’s PTCO page](https://hkacademy.edu.hk/ptco/). Choir, dragon boating and parent learning activities are supported by [HKA’s Community page](https://hkacademy.edu.hk/community/). Beach clean-ups and connections with elderly residents are supported by [HKA’s Sai Kung page](https://hkacademy.edu.hk/sai-kung/). These are examples rather than dated event listings; visitors are directed to the school for current availability.

## Recovery

The original Hello World baseline remains available at the immutable `coding-demo-baseline-v1.0.0` Git tag. Restore it on a new branch if needed; do not move the tag.
