// Public assets (anything under /public, referenced by absolute path like
// "/media/logo.png") are plain strings to Vite — it only rewrites paths it
// generates itself (imports, index.html tags), never raw literals in .tsx
// source. So when `base` isn't "/" (e.g. GitHub Pages serving this repo at
// username.github.io/martinez-knight/), every hardcoded "/media/..." still
// points at the domain root and 404s.
//
// Wrap any public-asset path in asset() at the point it's used as a src —
// it prefixes the real build-time base (import.meta.env.BASE_URL), so the
// same code works unmodified whether this deploys to a GitHub Pages
// subpath or a custom domain at root.
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return base.replace(/\/$/, "") + path;
}
