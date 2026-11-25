# GatherGrid

**GatherGrid** is a static community events discovery platform demo built with semantic **HTML5**, **CSS3**, and **Vanilla JavaScript** — zero frameworks, build tools, backend servers, or paid APIs.

> **Demo Notice:** All events, venues, hosts, social handles, and contact details on GatherGrid are fictional demonstration data. Form submissions validate locally in the browser and do not publish events or send emails.

## Features

- **Editorial Midnight Identity**: Deep midnight-blue canvas (`#080D1A`) paired with coral (`#FF6B5B`), lavender (`#B89CFF`), and bright yellow (`#FFE156`) accents, Fraunces + Plus Jakarta Sans + Space Mono typography, and bespoke SVG event illustrations in `assets/`.
- **Header & Mobile Navigation**: Sticky header with GatherGrid logo, navigation links (`Explore`, `Categories`, `Calendar`, `Saved Events` badge), synced event search input, and a keyboard-accessible mobile drawer.
- **Hero Section & Collage**: Features the `"Find Your People. Discover Your Next Thing."` headline, synced search bar, quick discovery shortcuts, and an interactive 4-card editorial event collage.
- **16 Fictional Events Across 7 Categories**: Covers `Technology`, `Art & Design`, `Music`, `Business`, `Fitness`, `Food`, and `Community` across November and December 2026.
- **Multi-Faceted Filter & Sort System**:
  - Category pills (`All` + 7 categories)
  - Date range selector (`All Dates`, `This Weekend`, `This Week`, `Next Week`, `All December`)
  - Price filter (`Free & Paid`, `Free Only`, `Paid Only`)
  - Live keyword search across event titles, venues, hosts, and descriptions
  - Sorting (`Date: Soonest first`, `Date: Latest first`, `Price: Low to high`, `Name: A to Z`)
  - Removable active filter chips and an empty-state view with a one-click reset
- **Interactive Monthly Calendar**: Displays event markers on scheduled dates across months; clicking any date filters the main event grid and updates the adjacent day-agenda spotlight panel.
- **Event Detail Modal & Saved Events (`localStorage`)**:
  - Accessible modal dialogs (`role="dialog"`, `aria-modal="true"`, focus trapping, `Escape` key closing, focus restoration)
  - Save / remove events from cards, modals, or the Saved Events drawer, persisted under `localStorage` key `gathergrid_saved_events`
- **Featured Collections**: Filter directly into `This Weekend`, `Creative Minds`, `Free Community Events`, and `Learn Something New`.
- **Host an Event & Newsletter Demos**: Client-side validated forms with field-level error reporting and explicit demo confirmation states.
- **Reduced Motion Support**: Respects `@media (prefers-reduced-motion: reduce)`.

## Project Structure

```text
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── gathergrid-mark.svg
    ├── event-breathwork.svg
    ├── event-ceramics.svg
    ├── event-dumplings.svg
    ├── event-fermentation.svg
    ├── event-founders.svg
    ├── event-hacknight.svg
    ├── event-hardware.svg
    ├── event-lanterns.svg
    ├── event-repair.svg
    ├── event-risograph.svg
    ├── event-rooftop-run.svg
    ├── event-shaders.svg
    ├── event-sketching.svg
    ├── event-storytelling.svg
    ├── event-synth.svg
    └── event-vinyl.svg
```

## Running Locally

Open `index.html` directly in any modern browser, or serve the folder using any static HTTP server (for example `python -m http.server 8080`).
