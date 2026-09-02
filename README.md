# Martinez Knight — Motion Site

React + TypeScript + Vite + Tailwind + Framer Motion.

## Structure
- **Home (`/`)** — one continuous scrolling page, nav links smooth-scroll to sections.
- **Service and project cards** each link to a dedicated detail page (`/services/:slug`,
  `/work/:slug`) for in-depth content.
- **`/faq`** — accordion FAQ with real content about pricing, timelines, who you work with.
- **`/sitemap`** — visual sitemap, auto-generated from the same data as the rest of the site.
- **404** — catch-all route for any unmatched URL.
- Background video is scroll-scrubbed and fades to a solid dark backdrop past the About section.

## Run it locally
```bash
npm install
npm run dev       # http://localhost:5173
```

## Build for production
```bash
npm run build
npm run preview
```

## ⚠️ Hosting needs SPA fallback
`/services/:slug`, `/work/:slug`, `/faq`, `/sitemap` only work when navigated to from within the
app unless the server falls back to `index.html`. Already included: `netlify.toml`,
`vercel.json`, `public/_redirects`.

## SEO
- Full meta tags in `index.html` (description, Open Graph, Twitter card, canonical)
- Real favicon generated from your logo (replacing the default Vite icon)
- `public/sitemap.xml` + `public/robots.txt`, generated from the same data as the app
- Per-page `<title>` tags via `src/hooks/useTitle.ts`
- **Before going live**: swap `https://martinezknight.com` in `index.html`, `sitemap.xml`,
  and `robots.txt` for your real domain if different.

## What's real vs placeholder
- **Video**: `public/media/hero-motion.mp4`, scroll-scrubbed across Home
- **Logos**: `public/media/logo.png` (Martinez Knight), `public/media/elpazio-logo.png`
  (real client logo, live on the Elpazio work card)
- **Services** (`src/data/services.ts`): your real 6 lines with expanded detail-page copy
- **Work** (`src/data/projects.ts`): your 8 real clients. Elpazio's case study and stats are
  pulled from your actual H1 2026 deliverables report. The other 7 still use monogram
  placeholders — **send logos/photos and they'll replace the monograms** the same way
  Elpazio's did.
- **Contact buttons**: fixed — they previously used `#contact` which only worked on the home
  page; now properly route back to the Contact section from anywhere, and the final
  "Book Free Consultation" CTA opens a pre-filled email.

## Structure
- `src/App.tsx` — router: Home + service/work detail pages + FAQ + Sitemap + 404
- `src/data/` — single source of truth for services & projects
- `src/pages/` — Home, ServiceDetail, ProjectDetail, FAQ, Sitemap, NotFound
- `src/components/` — Nav, VideoBackground, section content, buttons
