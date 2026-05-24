# Architecture

## Repository Shape

This repository currently contains two parallel website layers:

1. Legacy root website
   - preserved in `legacy/`
   - `legacy/index.html`
   - `legacy/style.css`
   - legacy assets and notes

2. Active Astro website
   - `astro/`
   - Astro 5 static site
   - React islands for interactive sections
   - current focus of development

## Near-Term Direction

- Preserve the legacy root website as historical or migration material.
- Make the Astro app the explicit active implementation.
- Separate docs, deployment notes, and ownership so contributors do not confuse the two.
