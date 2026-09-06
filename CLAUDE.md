# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page, mobile-first Korean wedding invitation (모바일 청첩장): a full-screen intro video ("문 열기" tap-to-open) that hands off to a scrollable page of sections (hero photo, our-story timeline, greeting, gallery, account info, footer). Deployed statically to GitHub Pages.

Stack: React 18 + TypeScript + Vite 5 + Tailwind CSS 3 + Framer Motion 11. No backend, no router, no state library — one page, one `App.tsx`.

## Commands

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tsc -b && vite build — type-check then bundle to dist/
npm run preview   # serve the dist/ build locally
npm run lint      # eslint .
npm run deploy    # gh-pages -d dist (manual alternative to the Actions workflow below)
```

There is no test suite/runner in this repo. There is no single-test invocation to document.

Deployment is automatic: pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and publishes `dist/` to GitHub Pages at `https://<user>.github.io/wedding-invitation/`. There's no separate staging step — treat a push to `main` as a production deploy.

## Architecture

### Content lives in one file, not in components

**`src/data/weddingInfo.ts`** is the single source of truth for every real-world fact: names, parents' names, wedding date/time, venue name/address/lat-lng/transit info, greeting text, gallery image list, the our-story timeline (`story.milestones`), closing message. Components import from here and render — they don't hardcode content. When asked to change wording, a date, or add/remove a gallery photo, edit this file, not the component.

Note: `weddingDate` and `venue` are currently unused by any component (the Countdown/Calendar/Location sections that read them were removed) but are kept as the canonical data in case those sections come back — don't delete them just because nothing imports them today.

### The public-asset path trap (`src/lib/asset.ts`)

Vite's `base` (`/wedding-invitation/`, set in `vite.config.ts`) is only auto-applied to `src`/`href` attributes Vite recognizes in HTML/JSX at build time. A **plain string** path to something in `public/` (e.g. built into a template literal for `background-image`, or stored as a string in `weddingInfo.ts` and interpolated later) does *not* get the base prefix rewritten automatically and will 404 under the GitHub Pages subpath even though it works fine in local dev (where base is often `/`-equivalent).

Every reference to a `public/` file from JS/CSS must go through `asset(path)` from `src/lib/asset.ts`, which prepends `import.meta.env.BASE_URL`. Grep for `asset(` usage in `Hero.tsx`, `Gallery.tsx`, `DoorIntro.tsx`, `App.tsx` before adding a new image/video/audio reference — follow the same pattern. Native `<img>`/`<video>` `src` attributes on JSX elements still need this too, since the string itself is dynamic (comes from `weddingInfo.ts` or a template literal), not a static attribute Vite can rewrite.

The one path that intentionally bypasses this: `index.html`'s `og:image` meta tag must be a **hardcoded absolute URL** (`https://dauni2610-pixel.github.io/wedding-invitation/og-image.jpg`), because link-preview crawlers (KakaoTalk, etc.) fetch the HTML directly without executing JS or resolving `BASE_URL` — a root-relative or bare path silently breaks previews with no visible error.

### Intro video → Hero handoff

`App.tsx` renders `DoorIntro` (a fixed, full-viewport, `z-50` overlay) above `<main>`. Body scroll is locked (`overflow: hidden`) until `DoorIntro` calls `onOpened()`, which happens on the intro `<video>`'s `ended` event, not on the tap itself. The tap (`onClick` on the overlay) only starts video playback and — since it's the one place a user gesture is guaranteed — background music (see below).

`public/hero.jpg` (the first real content the user sees) is deliberately generated as the **exact last frame** of `public/door-open.mp4`, so the video-to-page transition reads as continuous rather than a jump cut. Any time the intro video is replaced, regenerate `door-open-poster.jpg` (first frame) and `hero.jpg` (last frame) from the *final encoded* video, not the source clip — cropping/scaling can shift what the last frame looks like.

### Background music autoplay gesture

Browsers require audio playback with sound to be triggered synchronously inside a real user-gesture event handler. `App.tsx` owns the `<audio>` element and passes a `startBgm` callback into `DoorIntro` as `onTap`, called synchronously at the top of the tap handler (before `video.play()`) — not from the video's `ended` callback, which is not itself a user gesture. Volume fades in via `requestAnimationFrame` after playback starts. `BgmToggle.tsx` is a mute/play button; note its `position: sticky` + zero-height-wrapper trick (see next section) rather than `position: fixed`.

### The 480px card layout

`#root` in `index.css` is capped at `max-width: 480px`, centered, with `position: relative` — the whole site is designed to look like a single card even on wide desktop viewports, not a full-bleed responsive site. Anything that needs to stay pinned to a corner while scrolling (e.g. `BgmToggle`) **cannot use `position: fixed`**, since that positions relative to the viewport and would drift outside the card on wide screens. The established pattern is a zero-height `position: sticky` wrapper (spans the card's width, sticks vertically) containing an `absolute`-positioned element inside it — see `BgmToggle.tsx` for the reference implementation.

### Video/image asset processing

There's no build-time pipeline for the intro video or photos — they're preprocessed once with `ffmpeg` (portrait crop/scale, watermark removal by cropping a strip or gradient-patching, poster/last-frame extraction) and committed directly into `public/` as final files. If you're asked to swap the intro video or a photo, expect to shell out to `ffmpeg` yourself rather than finding a script in this repo — there isn't one.

## Notable conventions

- `AccountInfo.tsx` groups render `null` when a person's `bank`/`accountNumber` fields are unset in `weddingInfo.ts` — an "empty-looking" account section is expected/correct behavior until real account numbers are filled in, not a bug.
- `?to=이름` as a query param personalizes the intro's guest-name line (read directly off `window.location.search` in `App.tsx`, no router).
- `vite.config.ts`'s `base` must match the actual GitHub repo name if the repo is ever renamed or forked under a different name.
