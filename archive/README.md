# Archived photography site

`sandra-cabedo/pages/` preserves every original page, including the source of `/hola/` used for the new homepage. `public/` and `site.ts` retain the previous branding configuration for reference only.

These files are outside `src/pages`, excluded from TypeScript, and never imported by the active application. Relative imports describe their original locations; missing photographs are intentionally not restored. Reusable components, layouts, styles and utility tests remain in `src/` and `tests/`.

Legacy page tests that require the original routes or photographs are preserved under `sandra-cabedo/tests/`; current landing-page assertions replace them in the active suite.
