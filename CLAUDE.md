# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i          # install dependencies
npm run dev    # start dev server (Vite)
npm run build  # production build
```

No test runner is configured in this project.

## Architecture

This is a single-page promotional website for the Borondo album, exported from Figma Make. It is a React + Vite + Tailwind CSS v4 app.

**Pages** (`src/app/pages/`):
- `Home.tsx` — the main page, assembles all section components in order
- `StyleGuide.tsx` — design system reference page at `/style-guide`

**Section components** (`src/app/components/`) render distinct content blocks stacked vertically on the homepage:
`Navigation` → `Hero` → `TrackByTrack` → `WhatsAppStickers` → `VideoSection` → `DiccionarioBeele` → `MerchSection` → `RegistrationForm` → `Footer`

**UI primitives** (`src/app/components/ui/`) are shadcn/ui components built on Radix UI. Use these for any new interactive elements rather than building from scratch.

**`ImageWithFallback`** (`src/app/components/figma/`) — use this instead of `<img>` for any image that may fail to load (shows a placeholder SVG on error).

## Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin — no `tailwind.config.js` file; configuration lives in CSS.
- Design tokens (colors, radius, font weights) are CSS custom properties defined in `src/styles/theme.css` and exposed as Tailwind color utilities via `@theme inline`.
- Fonts: **Space Grotesk** (body default) and **Raleway** — both loaded from Google Fonts in `src/styles/fonts.css`.
- Path alias `@` resolves to `src/`.

## Asset handling

- Static images live in `src/imports/`.
- `figma:asset/<filename>` imports resolve to `src/assets/` via a custom Vite plugin in `vite.config.ts`.
- SVG and CSV files are treated as raw assets (`assetsInclude`). Do not add `.css`, `.tsx`, or `.ts` to that list.
